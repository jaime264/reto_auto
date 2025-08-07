import { test, expect } from '@playwright/test';
import { SelectRandomCategory } from '../screenplay/tasks/SelectRandomCategory';
import { SelectRandomSubcategory } from '../screenplay/tasks/SelectRandomSubcategory';
import { SelectRandomProduct } from '../screenplay/tasks/SelectRandomProduct';
import { AddRandomQuantityToCart } from '../screenplay/tasks/AddRandomQuantityToCart';
import { Product } from '../screenplay/models/Product';
import { SelectLocation } from '../screenplay/tasks/SelectLocation';
import { AcceptCookies } from '../screenplay/tasks/AcceptCookies';
import { clearSession } from '../screenplay/utils/clearSession';
import { CloseOfferDrawer } from '../screenplay/tasks/CloseOfferDrawer';
import { GoToCart } from '../screenplay/tasks/GoToCart';
import { ValidateCart } from '../screenplay/tasks/ValidateCart';

// Test principal

test('Agregar 5 productos aleatorios al carrito', async ({ page }) => {
  
  await page.goto('https://www.exito.com/');
  await page.waitForLoadState('domcontentloaded');

  await clearSession(page); 

  // 1. Aceptar cookies si aparecen
  await AcceptCookies.performAs(page);
  
  // 2. Forzar selección de ubicación (ciudad y tienda)
  await SelectLocation.performAs(page);

  const addedProducts: Product[] = [];

  while (addedProducts.length < 5) {
    console.log(`\n🛒 Producto ${addedProducts.length + 1}`);

    // 3. Seleccionar categoría aleatoria
    console.log('🧭 Seleccionando categoría...');
    await SelectRandomCategory(page);

    // 4. Seleccionar subcategoría aleatoria
    console.log('📂 Seleccionando subcategoría...');
    let productExists = await SelectRandomSubcategory.performAs(page);
    if (!productExists) {
      console.log('❌ No existen Productos. Reintentando...');
      continue; // Volver a intentar
    }

    // 5. Seleccionar producto aleatorio
    console.log('🛍️ Seleccionando producto...');
    productExists = await SelectRandomProduct.performAs(page);

    if (!productExists) {
      console.log('❌ Producto no disponible (404). Reintentando...');
      continue; // Volver a intentar
    }

    await CloseOfferDrawer.performAs(page);

    // 6. Agregar cantidad aleatoria al carrito
    console.log('➕ Agregando cantidad aleatoria al carrito...');
    const product = await AddRandomQuantityToCart.performAs(page);
    addedProducts.push(product);
  }


  console.log('\n✅ Productos agregados al carrito:');
  for (const p of addedProducts) {
    console.log(`- ${p.name} | Precio: $${p.price} | Cantidad: ${p.quantity}`);
  }

  await GoToCart.performAs(page);

  await page.waitForTimeout(3000);

  await ValidateCart.performAs(page, addedProducts);
});
