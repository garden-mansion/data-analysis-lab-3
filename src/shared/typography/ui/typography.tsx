import type { ReactNode } from 'react';

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

export function TypographyH2({
  children,
  className: className_ = '',
}: TypographyProps) {
  return (
    <h2
      className={`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${className_}}`}
    >
      {children}
    </h2>
  );
}

export function TypographyH3({
  children,
  className: className_ = '',
}: TypographyProps) {
  return (
    <h3
      className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className_}`}
    >
      {children}
    </h3>
  );
}

export function TypographyH4({
  children,
  className: className_ = '',
}: TypographyProps) {
  return (
    <h4
      className={`scroll-m-20 text-xl font-semibold tracking-tight ${className_}`}
    >
      {children}
    </h4>
  );
}

export function TypographyP({
  children,
  className: className_ = '',
}: TypographyProps) {
  return <p className={`leading-7 not-first:mt-6 ${className_}`}>{children}</p>;
}
