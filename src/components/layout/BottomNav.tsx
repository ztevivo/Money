'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: string;
  label: string;
  href: string;
  activeIcon?: string;
}

const navItems: NavItem[] = [
  { icon: 'home', label: 'Início', href: '/' },
  { icon: 'bubble_chart', label: 'Potes', href: '/goals', activeIcon: 'bubble_chart' },
  { icon: 'face', label: 'Amigos', href: '/community' },
];

export function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === href;
    return pathname?.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-surface-container shadow-[0_-10px_40px_rgba(122,83,101,0.08)]">
      <div className="flex justify-around items-center px-4 pb-6 pt-2 max-w-2xl mx-auto">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center py-2 px-4 transition-all active:scale-90 rounded-xl',
                active
                  ?
