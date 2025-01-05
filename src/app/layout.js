"use client";

import './globals.css';
import Navigation from '@/components/Navigation';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Provider } from 'react-redux';
import store from '@/redux/store';

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Navigation />
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            {children}
          </motion.div>
        </Provider>
      </body>
    </html>
  );
}
