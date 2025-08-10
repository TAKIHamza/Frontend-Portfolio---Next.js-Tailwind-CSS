'use client';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import Typewriter from 'typewriter-effect';
import LogoCarousel from './LogoCarousel';

const logos = [
  { name: 'React js', src: 'https://www.svgrepo.com/show/327388/logo-react.svg' },
  { name: 'Next.js', src: 'https://www.svgrepo.com/show/368858/nextjs.svg' },
  { name: 'Tailwind Css', src: 'https://www.svgrepo.com/show/333609/tailwind-css.svg' },
  { name: 'Framer Motion', src: 'https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/vector-icons/brand-framer-motion-pk1mas1m7u9hi06fqzq77f.png/brand-framer-motion-nuunolaqtcs7zlblwkjs.png?_a=DATAg1AAZAA0' },
  { name: 'Flutter', src: 'https://img.icons8.com/ios7/600/flutter.png' },
  { name: 'Spring Boot', src: 'https://www.svgrepo.com/show/333604/spring-boot.svg' },
  { name: 'django', src: 'https://www.svgrepo.com/show/373554/django.svg' }
];

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  // Optimized scroll transforms
  const yBg = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "25%"]), {
    stiffness: 250,
    damping: 25
  });
  
  const opacityBg = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);
  
  // Consolidated animations
  const contentAnimation = {
    title: {
      scale: useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0.96]), {
        stiffness: 200,
        damping: 15
      }),
      y: useTransform(scrollYProgress, [0, 0.5], [0, 25]),
      opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0.95])
    },
    buttons: {
      y: useTransform(scrollYProgress, [0, 0.5], [0, 40]),
      opacity: useTransform(scrollYProgress, [0, 0.4], [1, 0])
    },
    carousel: {
      y: useTransform(scrollYProgress, [0, 0.5], [0, 15]),
      opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
    }
  };

  // Lightweight particles initialization
  const [particles] = useState(() => 
    Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      size: Math.random() * 0.4 + 0.6,
      delay: Math.random() * 1.5
    }))
  );

  const text = "Hi, I'm ";
  const professions = [
    'Full-stack Developer',
    'UI/UX Designer',
    'Open Source Contributor',
    'Tech Enthusiast'
  ];

  return (
    <motion.section 
      ref={ref}
      className="relative flex flex-col justify-center min-h-screen w-full bg-white overflow-hidden isolate"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Optimized Background */}
      <motion.div 
        style={{ y: yBg, opacity: opacityBg }}
        className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"
      >
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "circOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,235,255,0.3),transparent)]"
        />
      </motion.div>

      {/* Main Content */}
      <div className="relative mx-auto px-4 py-24 max-w-7xl w-full">
        <div className="text-center max-w-3xl mx-auto overflow-hidden">
          {/* Animated Title */}
          <motion.h1 
            style={contentAnimation.title}
            className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-slate-900 mb-4 mt-10"
          >
            {text.split("").map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.04,
                  duration: 0.6,
                  ease: [0.16, 0.77, 0.47, 0.97]
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, scale: 0.8, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                delay: text.length * 0.04 + 0.15,
                type: "spring",
                stiffness: 120,
                damping: 10
              }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 via-sky-700 to-cyan-600 inline-block"
            >
              Hamza
            </motion.span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div 
            style={contentAnimation.title}
            className="text-xl text-slate-800 max-w-2xl mx-auto h-8 sm:h-10 "
          >
            <Typewriter
              options={{
                strings: professions,
                autoStart: true,
                loop: true,
                delay: 30,
                deleteSpeed: 20,
                cursor: '|',
                cursorClassName: 'text-cyan-700 opacity-80',
                wrapperClassName: 'typewriter-text font-medium tracking-wide',
              }}
            />
          </motion.div>

          {/* Logo Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={contentAnimation.carousel}
            className="w-full justify-center "
          >
            <LogoCarousel 
              logos={logos} 
              direction="left" 
              speed={25} 
              className="opacity-90 hover:opacity-100 transition-opacity duration-200"
            />
          </motion.div>

          {/* Buttons with original animation + scroll effect */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.6
                }
              }
            }}
            style={contentAnimation.buttons}
            className="flex flex-row justify-center gap-3 sm:gap-4 w-full px-4 overflow-x-auto py-4"
          >
            {[
              { text: "View Projects", href: "#projects", mobileText: "Projects" },
              { text: "View My CV", href: "/Hamza-CV.pdf", newTab: true, mobileText: "My CV" },
            ].map(({ text, href, newTab, mobileText }, i) => (
              <motion.a
                key={href}
                variants={{
                  hidden: { 
                    y: 20,
                    opacity: 0,
                    scale: 0.98
                  },
                  visible: {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 500,
                      damping: 20,
                      duration: 0.3
                    }
                  }
                }}
                whileHover={{
                  y: -3,
                  transition: {
                    type: "spring",
                    stiffness: 600,
                    damping: 15,
                    duration: 0.6
                  }
                }}
                whileTap={{
                  scale: 0.96,
                  transition: { duration: 0.1 }
                }}
                href={href}
                target={newTab ? "_blank" : "_self"}
                rel={newTab ? "noopener noreferrer" : undefined}
                className={`
                  whitespace-nowrap
                  rounded-lg px-4 py-2 sm:px-6 sm:py-3 font-medium
                  ${i === 0 
                    ? 'bg-cyan-700 text-white hover:bg-cyan-800' 
                    : 'border border-slate-200 bg-white text-slate-900 hover:bg-slate-50'
                  }
                  transition-colors duration-200 will-change-transform
                  text-sm sm:text-base
                  min-w-[100px] sm:min-w-auto text-center
                `}
              >
                <span className="sm:hidden">{mobileText}</span>
                <span className="hidden sm:inline">{text}</span>
                {newTab && (
                  <span className="ml-1 sm:ml-1.5 inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                    ↗
                  </span>
                )}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0])
        }}
        className="absolute bottom-8 w-full text-center"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-sm text-slate-500 flex flex-col items-center"
        >
          <span>Scroll down</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-4 h-4 border-2 rounded-full border-slate-400 mt-1"
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}