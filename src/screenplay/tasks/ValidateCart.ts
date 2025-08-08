import { Page, expect } from '@playwright/test';
import { Product } from '../models/Product';
import { parsePrice } from '../utils/parsePrice';
import { CartItem } from '../models/CartItem';

export class ValidateCart {
  static async performAs(page: Page, addedProducts: Product[]) {
    console.log('\n Validando productos en el carrito...');

    // Obtener datos del carrito
    const names = await page.locator('[data-molecule-product-detail-name-span="true"]').allTextContents();
    const pricesRaw = await page.locator('[data-molecule-product-detail-price-best-price="true"] span').allTextContents();
    const quantitiesRaw = await page.locator('[data-molecule-quantity-und-value="true"]').allTextContents();

    const cartItems: CartItem[] = names.map((name, index) => ({
      name: name.trim(),
      price: parsePrice(pricesRaw[index]),
      quantity: Number(quantitiesRaw[index]),
    }));

    // Ordenar ambas listas por nombre
    const sortedCartItems = cartItems.sort((a, b) => a.name.localeCompare(b.name));
    const sortedAddedProducts = [...addedProducts].sort((a, b) => a.name.localeCompare(b.name));

    expect(sortedCartItems.length).toBe(sortedAddedProducts.length);

    // Validación individual
    for (let i = 0; i < sortedAddedProducts.length; i++) {
      const expected = sortedAddedProducts[i];
      const actual = sortedCartItems[i];

      console.log(`\n Validando producto #${i + 1}`);
      console.log(`Esperado: ${expected.name} | Precio: ${expected.price} | Cantidad: ${expected.quantity}`);
      console.log(`En carrito: ${actual.name} | Precio Total: ${actual.price} | Cantidad: ${actual.quantity}`);

      // Nombre
      expect(actual.name).toContain(expected.name);

      // Cantidad
      expect(actual.quantity).toBe(expected.quantity);

      // Precio × cantidad
      const expectedSubtotal = expected.price * expected.quantity;
      const actualSubtotal = actual.price;
      expect(actualSubtotal).toBeCloseTo(expectedSubtotal, 0); // tolerancia de 0 decimales
    }

    console.log('\n Todos los productos del carrito fueron validados correctamente.');
  }
}
