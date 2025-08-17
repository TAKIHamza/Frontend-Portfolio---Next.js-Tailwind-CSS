'use client';
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sectionRef = useRef(null);

  // Scroll animation pour apparition fluide à chaque passage
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"] // entrée / sortie de la section
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const sectionY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects/`);
        setProjects(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch projects");
        setLoading(false);
        console.error("Error fetching projects:", err);
      }
    };
    fetchProjects();
  }, []);

  // Loading state
  if (loading) {
    return (
      <motion.section 
        className="min-h-screen px-2 flex items-center justify-center"
        ref={sectionRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl mb-8">
            Loading Projects
          </h2>
          <motion.div
            className="rounded-md h-12 w-12 border-4 border-t-4 border-sky-700 animate-spin mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </motion.section>
    );
  }

  // Error state
  if (error) {
    return (
      <motion.section 
        className="min-h-screen px-2 flex items-center justify-center"
        ref={sectionRef}
      >
        <motion.div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl mb-4">
            Projects
          </h2>
          <motion.p className="text-red-500 text-xl">{error}</motion.p>
        </motion.div>
      </motion.section>
    );
  }

  // Main section
  return (
    <motion.section 
      id="projects" 
      className="bg-transparent min-h-screen px-2 py-10"
      ref={sectionRef}
      style={{ y: sectionY, opacity: sectionOpacity }}
      transition={{ duration: 0.6 }}
    >
      <div className="container px-4 md:px-6 min-h-screen">
        <motion.h2 
          className="text-3xl text-center font-bold sm:text-4xl md:text-5xl mb-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 10 }}
        >
          Projects
        </motion.h2>

        <motion.div 
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 "
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <AnimatePresence>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group relative overflow-hidden rounded-lg shadow-lg bg-white hover:cursor-pointer"
                initial={{ opacity: 0, y: 80, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.15, type: "spring", stiffness: 120, damping: 12 }}
                whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
              >
                <motion.div
                  className="flex flex-row justify-center aspect-w-16 aspect-h-12"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    alt={project.title}
                    className="w-full h-44 p-1 object-cover"
                    height="225"
                    src={project.thumbnail}
                    width="500"
                  />
                </motion.div>
                <Link href={`/project/${project.id}`}>
  <motion.div 
    className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-cyan-900/90 to-transparent p-6"
    initial={{ opacity: 0 }}
    whileHover={{ opacity: 1 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    {/* Title - Bright with subtle shadow */}
<h3 className="text-xl font-semibold text-cyan-100 tracking-tight drop-shadow-md 
              hover:text-white transition-colors duration-300">
  {project.title}
</h3>
    
    {/* Description - Soft white with great readability */}
    <p className="text-sm text-white mt-1 leading-snug line-clamp-2 font-normal">
      {project.description}
    </p>
    
    {/* Tech Stack - Vibrant accent */}
    {project.technologies && (
      <div className="mt-2">
        <span className="text-xs font-semibold text-amber-300/80 tracking-wider">
          TECH STACK
        </span>
        <p className="text-xs text-cyan-50/80 font-light  tracking-wide">
          {project.technologies}
        </p>
      </div>
    )}
  </motion.div>
</Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
}
