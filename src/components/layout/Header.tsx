'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}

export function Header({ title, showBack, rightAction }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="flex justify-between items-center w-full px-container-padding py-6 bg-surface">
      {showBack ? (
        <Button
          variant="ghost"
          size="sm"
          icon="arrow_back"
          onClick={() => router.back()}
          className="!p-3 !rounded-full bg-surface-container-lowest shadow-sm"
        />
      ) : (
        <div className="w-10" />
      )}

      {title && (
        <h1 className="font-headline-md text-headline-md text-primary tracking-tight text-center">
          {title}
        </h1>
      )}

      {rightAction || <div className="w-10" />}
    </header>
  );
}
