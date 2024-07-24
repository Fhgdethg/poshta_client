import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductsPage from '@/pages/ProductsPage/ProductsPage';

it('ProductsPage rendered', () => {
  render(<ProductsPage />);

  const productsPage = screen.findByTestId('products-page');

  expect(productsPage).toBeTruthy();
});
