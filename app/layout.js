'use client'
import React from 'react'
import { Suspense } from 'react';
import "./global.css"
import "../public/lineawsome/css/line-awesome.min.css";
import MainLayout from './components/layout/MainLayout';
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        
    <Suspense fallback={<p>Loading...</p>}>
        <SessionProvider>
          <MainLayout>
            {children}
          </MainLayout>
        </SessionProvider>
        </Suspense>
      </body>
    </html>
  )
}