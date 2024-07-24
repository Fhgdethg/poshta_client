import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ChatPage from '@/pages/ChatPage/ChatPage';

it('ChatPage rendered', () => {
  render(<ChatPage />);

  const chat = screen.getByTestId('chat');

  expect(chat).toBeTruthy();
});
