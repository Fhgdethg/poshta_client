import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoginPage from '@/pages/LoginPage/LoginPage';

it('LoginPage rendered', () => {
  render(<LoginPage />);

  const loginCardForm = screen.getByText('Login');

  expect(loginCardForm).toBeTruthy();
});
