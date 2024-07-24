import { vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    prefetch: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn(),
    pathname: '/',
    route: '/',
    asPath: '/',
    query: {},
    back: vi.fn(),
    beforePopState: vi.fn(),
    isFallback: false,
  }),
}));
