import { motion } from 'framer-motion';
import React from 'react';

const InfiniteLogoCarousel = ({ logos, speed = 20 }) => {
  // Duplique les logos pour créer une boucle fluide
  const duplicatedLogos = [...logos, ...logos, ...logos];
  
  return (
    <div className="relative w-full px-2 lg:px-0 lg:w-5/6 overflow-hidden py-2 justify-center">
      {/* Masque gradient pour l'effet de fondu */}
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-slate-50/95 to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-slate-50/95 to-transparent z-10" />
      
      <motion.div
        className="flex"
        animate={{
          x: ['0%', '-100%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <motion.div 
            key={`logo-${index}`}
            className="px-4 flex-shrink-0"
            whileHover={{ scale: 1.1 }}
          >
            <div className="w-full h-6  backdrop-blur-md rounded-xl p-2 flex items-center justify-center text-center">
              <img 
                src={logo.src} 
                alt={logo.name} 
                className="max-h-6 max-w-6 object-contain "
                loading="lazy"
              />
            </div>
            {/* <p className=" text-slate-400 mt-2 text-xs opacity-80">
              {logo.name}
            </p> */}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteLogoCarousel;