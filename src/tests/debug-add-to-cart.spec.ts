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

test('Agregar 5 productos aleatorios al carrito', async ({ page }) => {
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

    await shopper.attemptsTo(
      SelectRandomCategory,
      SelectRandomSubcategory,
      SelectRandomProduct,
      CloseOfferDrawer
    );

    const product = await AddRandomQuantityToCart.performAs(page);
    addedProducts.push(product);
  }

  await shopper.attemptsTo(
    GoToCart
  );

  await ValidateCart.performAs(page, addedProducts);
});
