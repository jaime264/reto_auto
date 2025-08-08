import { test, expect } from '@playwright/test';
import { Shopper } from '../screenplay/actors/Shopper';
import { AcceptCookies } from '../screenplay/tasks/AcceptCookies';
import { SelectLocation } from '../screenplay/tasks/SelectLocation';
import { SelectRandomCategory } from '../screenplay/tasks/SelectRandomCategory';
import { SelectRandomSubcategory } from '../screenplay/tasks/SelectRandomSubcategory';
import { SelectRandomProduct } from '../screenplay/tasks/SelectRandomProduct';
import { AddRandomQuantityToCart } from '../screenplay/tasks/AddRandomQuantityToCart';
import { CloseOfferDrawer } from '../screenplay/tasks/CloseOfferDrawer';
import { GoToCart } from '../screenplay/tasks/GoToCart';
import { ValidateCart } from '../screenplay/tasks/ValidateCart';
import { clearSession } from '../screenplay/utils/clearSession';
import { Product } from '../screenplay/models/Product';
import { HasVisibleProducts } from '../screenplay/questions/HasVisibleProducts';
import { secure } from '../screenplay/utils/secure';

test('Agregar 5 productos aleatorios al carrito', async ({ page }) => {
  test.setTimeout(8 * 60 * 1000); // 6 minutos

  const shopper = new Shopper(page);
  await page.goto('https://www.exito.com/');
  await page.waitForLoadState('domcontentloaded');
  await clearSession(page);

  await shopper.attemptsTo(
    AcceptCookies,
    SelectLocation
  );

  const addedProducts: Product[] = [];

  while (addedProducts.length < 5) {
    console.log(`\n🛒 Producto ${addedProducts.length + 1}`);

    const success = await secure.attempt(async () => {
    await shopper.attemptsTo(SelectRandomCategory);
    await shopper.attemptsTo(SelectRandomSubcategory);

    const hasProducts = await HasVisibleProducts.answeredBy(page);
    if (!hasProducts) {
      console.warn('⚠️ No hay productos visibles en esta subcategoría. Reintentando...');
      return false;
    }

    const [productExists] = await shopper.attemptsTo(SelectRandomProduct);
    if (!productExists) {
      console.log('❌ Producto no disponible (404). Reintentando...');
      return false;
    }

    await shopper.attemptsTo(CloseOfferDrawer);

    const [product] = await shopper.attemptsTo(AddRandomQuantityToCart);
    addedProducts.push(product);

    return true;
  }, `flujo de agregar producto ${addedProducts.length + 1}`, page);

  if (!success) continue;
}

  await shopper.attemptsTo(GoToCart);
  await page.waitForTimeout(50000);
  await secure.attempt(() => ValidateCart.performAs(page, addedProducts), 'Validar carrito', page);

});
