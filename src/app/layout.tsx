import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';

import GlobalLayout from '@/components/GlobalLayout/GlobalLayout';

const openSans = Open_Sans({
  weight: ['300', '400', '500', '700', '800'],
  subsets: ['latin'],
  variable: '--var-open-sans',
});

export const metadata: Metadata = {
  title: 'Poshta',
  description: 'Application for robot manipulator',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GlobalLayout font={openSans}>{children}</GlobalLayout>;
}
