"use client"
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiHome, FiUser, FiCode, FiLogIn, FiX, FiMenu } from "react-icons/fi";

export default function NavBar() {
    const [navbar, setNavbar] = useState(false);
    const sidebarRef = useRef(null);

    // Close sidebar when clicking outside or pressing Escape
    useEffect(() => {
        function handleClickOutside(event) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setNavbar(false);
            }
        }

        function handleEscapeKey(event) {
            if (event.key === "Escape") {
                setNavbar(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscapeKey);
        
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, []);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { x: 20, opacity: 0 },
        show: { 
            x: 0, 
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    const mobileMenuVariants = {
        open: { 
            x: 0,
            transition: { 
                type: "spring",
                damping: 25,
                stiffness: 200,
                staggerChildren: 0.1,
                delayChildren: 0.2
            } 
        },
        closed: { 
            x: "100%",
            transition: {
                type: "spring",
                damping: 30,
                stiffness: 200,
                staggerChildren: 0.05,
                staggerDirection: -1
            } 
        }
    };

    // Navigation items data
    const navItems = [
        { name: "Home", path: "/", icon: <FiHome className="text-xl" /> },
        { name: "Skills", path: "/skills", icon: <FiCode className="text-xl" /> },
        { name: "Profile", path: "/profile", icon: <FiUser className="text-xl" /> },
    ];

    const authItems = [
        { name: "Login", path: "/login", icon: <FiLogIn className="text-xl" /> }
    ];

    return (
        <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="w-full  backdrop-blur-xl top-0 xl:fixed xl:w-full xl:top-0 xl:left-0 xl:z-30 fixed z-50 border-b border-gray-200 dark:border-gray-700"
        >
            <div className="container mx-auto w-full bg-white/80 dark:bg-gray-900/80">
                <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                    {/* Logo and mobile menu button */}
                    <div className="flex items-center justify-between py-3 md:py-4 md:block">
                        <motion.h1 
                            whileHover={{ scale: 1.05 }}
                            className="text-lg  md:text-xl font-bold font-mono cursor-pointer
                                bg-gradient-to-r from-cyan-900 via-sky-700 to-cyan-600
                                bg-clip-text text-transparent
                                hover:from-gray-600 hover:to-gray-300 
                                transition-all duration-300">
                            &lt;TAKI.Dev/&gt;
                        </motion.h1>
                        
                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                className="p-2 text-gray-700 dark:text-gray-300 rounded-md outline-none"
                                onClick={() => setNavbar(!navbar)}
                                aria-label="Toggle menu"
                            >
                                {navbar ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                            </motion.button>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                                      <div className="hidden md:flex">
                        <AnimatePresence>
                            <motion.div
                                className="flex-1 justify-between pb-2 mt-0 md:block md:pb-0"
                            >
                                <motion.ul 
                                    className="lg:pt-0 gap-8 tracking-wide font-medium flex-col flex md:flex-row md:gap-0"
                                >
                                    {navItems.map((item, index) => (
                                        <motion.li 
                                            key={index}
                                            className="max-w-max"
                                        >
                                            <Link 
                                                href={item.path}
                                                className="block md:px-3 group"
                                            >
                                                <div className="relative text-gray-600 dark:text-gray-300
                                                        before:absolute before:-bottom-2 md:before:-bottom-3 before:origin-left before:w-full before:h-0.5 before:mx-auto before:mt-auto before:rounded-full before:bg-cyan-800 dark:before:bg-cyan-400 before:transition before:scale-x-0 group-hover:before:scale-x-100">
                                                    <span className="transition group-hover:text-cyan-700 dark:group-hover:text-cyan-400">{item.name}</span>
                                                </div>
                                            </Link>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Desktop Login - Original Style */}
                    <div className="hidden md:flex">
                        <AnimatePresence>
                            <motion.div
                                className="justify-end pb-2 mt-0 md:block md:pb-0"
                            >
                                <motion.ul 
                                    className="lg:pt-0 gap-8 tracking-wide font-medium flex-col flex md:flex-row md:gap-0"
                                >
                                    {authItems.map((item, index) => (
                                        <motion.li 
                                            key={index}
                                            className="max-w-max"
                                        >
                                            <Link 
                                                href={item.path} 
                                                className="block md:px-3 group"
                                            >
                                                <div className="relative text-gray-600 dark:text-gray-300
                                                        before:absolute before:-bottom-2 md:before:-bottom-3 before:origin-left before:w-full before:h-0.5 before:mx-auto before:mt-auto before:rounded-full before:bg-cyan-800 dark:before:bg-cyan-400 before:transition before:scale-x-0 group-hover:before:scale-x-100">
                                                    <span className="transition group-hover:text-cyan-700 dark:group-hover:text-cyan-400">{item.name}</span>
                                                </div>
                                            </Link>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
            {/* Mobile Sidebar */}
            <AnimatePresence>
                {navbar && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-40"
                            onClick={() => setNavbar(false)}
                        />
                        
                        {/* Sidebar Content */}
                        <motion.div
                            ref={sidebarRef}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={mobileMenuVariants}
                            className="md:hidden fixed top-0 right-0 h-screen w-40 max-w-full bg-white dark:bg-gray-900 z-50 "
                        >
                            {/* Sidebar Header */}
                            <div className="flex justify-center p-4 border-b border-gray-200 dark:border-gray-700 ">
                        
                                <button
                                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                    onClick={() => setNavbar(false)}
                                    aria-label="Close menu"
                                >
                                    <FiX className="w-6 h-6 text-gray-800 dark:text-gray-200" />
                                </button>
                            </div>

                            {/* Navigation Links */}
                            <motion.ul 
                                variants={containerVariants}
                                className="flex flex-col p-4 space-y-4 bg-white h-full pt-10 "
                            >
                                {[...navItems, ...authItems].map((item, index) => (
                                    <motion.li 
                                        key={index}
                                        variants={itemVariants}
                                        whileHover={{ x: 5 }}
                                    >
                                        <Link 
                                            href={item.path}
                                            className="flex items-center gap-4 p-3 rounded-lg text-lg font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                            onClick={() => setNavbar(false)}
                                        >
                                            <span className="text-cyan-600 dark:text-cyan-400">
                                                {item.icon}
                                            </span>
                                            {item.name}
                                        </Link>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}