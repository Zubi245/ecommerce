'use client';

import React, { ReactNode } from 'react';

interface Props { children: ReactNode; }

export default function AdminLayout({ children }: Props) {
  return <>{children}</>;
}
