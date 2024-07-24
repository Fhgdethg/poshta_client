import { renderHook, act } from '@testing-library/react-hooks';
import { expect, it } from 'vitest';
import useDebounce from './useDebounce';

it('should debounce the value', async () => {
  const { result, rerender, waitForNextUpdate } = renderHook(
    ({ value, delay }) => useDebounce(value, delay),
    {
      initialProps: { value: 'initial value', delay: 500 },
    },
  );

  expect(result.current).toBe('initial value');

  act(() => {
    rerender({ value: 'updated value', delay: 500 });
  });

  await waitForNextUpdate();

  expect(result.current).toBe('updated value');
});
