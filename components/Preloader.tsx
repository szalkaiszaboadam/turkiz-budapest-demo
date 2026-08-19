"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TurkizLogo from './TurkizLogo'; // Importáljuk be a logót!

export default function Preloader({ isLoading }: { isLoading: boolean }) {
  useEffect(() => {
    // Biztosítjuk, hogy a tetején induljunk
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [isLoading]);

  return (
    <>
      {/* Háttér elhalványulása: touch-none megakadályozza a görgetést telefonon, amíg tölt */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader-bg"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9997] bg-[#0B131A] touch-none"
          />
        )}
      </AnimatePresence>

      {/* Logó átrepülése: Nincs opacity fade rajta, így 100% láthatósággal érkezik a navbarba! */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader-logo"
            className="fixed inset-0 z-[9998] flex items-center justify-center pointer-events-none"
          >
            <motion.div
              layoutId="main-logo"
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-[120px] h-[160px] md:w-[150px] md:h-[200px]"
            >
              <TurkizLogo isWhite={true} isScrolled={false} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}