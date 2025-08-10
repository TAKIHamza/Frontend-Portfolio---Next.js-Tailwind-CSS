'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FiChevronLeft, 
  FiChevronRight, 
  FiMaximize, 
  FiGithub, 
  FiGlobe, 
  FiStar,
  FiCalendar,
  FiLayers,
  FiCheck,
  FiX,
  FiArrowLeft
} from 'react-icons/fi';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.1, 
      delayChildren: 0.2 
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { 
      type: 'spring', 
      stiffness: 100, 
      damping: 10, 
      duration: 0.5 
    }
  }
};

const mockProject = {
  title: "Modern Portfolio App",
  description: "A visually stunning portfolio built with React, Tailwind, and Framer Motion.",
  long_description: "This portfolio showcases multiple interactive project sections, offers smooth transitions between sections, and leverages advanced animations for stunning user experience. SEO optimized, dark/light mode support, and mobile responsive.",
  images: [
    {
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      caption: "Dark mode dashboard interface"
    },
    {
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      caption: "Project list with animated transitions"
    }
  ],
  thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  is_featured: true,
  features: "Animated navigation\nDark/Light mode\nSEO optimization\nResponsive design",
  challenges: "Ensuring fast load times while using high-quality images and multiple animations. Solution: optimized image loading, lazy loading, and kept motion dependencies minimal.",
  technologies: "React, Tailwind CSS, Framer Motion, React Icons",
  github_url: "https://github.com/your-username/portfolio",
  live_url: "https://yourportfolio.com",
  created_at: "2024-06-24T00:00:00.000Z",
  category: "Portfolio Website",
  team: "Solo Developer"
};

export default function ProjectDetails({ project = mockProject }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!project) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-white rounded-xl shadow-2xl max-w-md w-full mx-4"
        >
          <div className="mb-6 text-teal-500">
            <FiLayers className="w-16 h-16 mx-auto" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Project Not Found</h1>
          <p className="text-gray-600 mb-6">
            The project you're looking for doesn't exist or may have been removed.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
          >
            <FiArrowLeft className="w-5 h-5 mr-2" />
            Return Home
          </Link>
        </motion.div>
      </div>
    );
  }

  const nextImage = () => {
    setActiveImageIndex(prev => 
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setActiveImageIndex(prev => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  return (
    <motion.div 
      className="relative min-h-screen bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] pb-24 pt-10 sm:pt-9"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Back button */}
      <motion.div 
  variants={itemVariants}
  className="fixed top-4 left-4 z-50 sm:top-6 sm:left-6"
>
  <Link 
    href="/#projects" 
    className="flex items-center group bg-white/90 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
  >
    <FiChevronLeft className="w-5 h-5 mr-2 text-gray-700 group-hover:text-teal-600 transition-colors" />
    <span className="text-sm sm:text-base lg:text-lg text-gray-700 font-medium group-hover:text-teal-600 transition-colors">
      {/* Show "Back" on mobile and "All Projects" on larger screens */}
      <span className="block sm:hidden"></span>
      <span className="hidden sm:block lg:hidden">All Projects</span>
    </span>
  </Link>
</motion.div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
        {/* Project header */}
        <motion.div 
          variants={itemVariants}
          className="text-center mb-12"
        >
          {project.is_featured && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center bg-gradient-to-r from-teal-100 to-blue-100 px-4 py-2 rounded-full mb-4"
            >
              <FiStar className="w-4 h-4 mr-1 text-teal-600" />
              <span className="text-sm font-medium text-teal-800">
                Featured Project
              </span>
            </motion.div>
          )}
          <motion.h1 
            className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {project.title}
          </motion.h1>
        </motion.div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Project details */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-2 space-y-8"
          >
            {/* Featured image */}
            <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-auto object-cover cursor-pointer hover:opacity-90 transition-opacity"
                onClick={toggleFullscreen}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-6">
                <span className="text-white font-medium">
                  Click to view fullscreen
                </span>
              </div>
            </div>

            {/* Gallery */}
            {project.images?.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">Project Screenshots</h3>
                <div className="relative group">
                  <div className="relative h-64 sm:h-96 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                      src={project.images[activeImageIndex]?.image}
                      alt={project.images[activeImageIndex]?.caption || `Screenshot of ${project.title}`}
                      className="w-full h-full object-contain cursor-pointer"
                      onClick={toggleFullscreen}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                        onClick={toggleFullscreen}
                        title="Fullscreen"
                      >
                        <FiMaximize className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                        aria-label="Previous image"
                      >
                        <FiChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                        aria-label="Next image"
                      >
                        <FiChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
                <div className="flex gap-3 overflow-x-auto py-3 scrollbar-hide">
                  {project.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIndex === index
                          ? 'border-teal-500 scale-105'
                          : 'border-transparent hover:border-gray-300'
                      }`}
                      aria-label={`View image ${index + 1}`}
                    >
                      <img src={image.image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Project content */}
            <div className="prose prose-lg max-w-none bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Project Details</h3>
              <div className="space-y-6 text-gray-700">
                <p>{project.long_description || project.description}</p>
                
                {project.features && (
                  <div>
                    <h4 className="text-xl font-semibold mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {project.features.split('\n').map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <FiCheck className="w-5 h-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {project.challenges && (
                  <div>
                    <h4 className="text-xl font-semibold mb-3">Challenges & Solutions</h4>
                    <p>{project.challenges}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right column - Meta info */}
          <motion.div 
            variants={itemVariants}
            className="space-y-6"
          >
            {/* Technologies */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.split(',').map((tech, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 border border-gray-200 hover:border-teal-300 transition-all"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Project Links</h3>
              <div className="space-y-3">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-4 py-3 bg-gray-900 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium hover:bg-gray-800"
                  >
                    <FiGithub className="w-5 h-5 mr-2" />
                    View on GitHub
                  </a>
                )}
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium hover:from-teal-600 hover:to-teal-700"
                  >
                    <FiGlobe className="w-5 h-5 mr-2" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* Project info */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Project Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Created Date</p>
                  <p className="text-gray-700 font-medium flex items-center gap-1">
                    <FiCalendar className="w-4 h-4" />
                    {new Date(project.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Project Type</p>
                  <p className="text-gray-700 font-medium flex items-center gap-1">
                    <FiLayers className="w-4 h-4" />
                    {project.category || 'Web Application'}
                  </p>
                </div>
                {project.team && (
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Team</p>
                    <p className="text-gray-700 font-medium">{project.team}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            className="absolute top-6 right-6 text-white p-2 hover:bg-black/30 rounded-full transition-colors"
            onClick={toggleFullscreen}
            title="Close fullscreen"
          >
            <FiX className="w-8 h-8" />
          </button>
          {project.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 text-white p-4 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                aria-label="Previous image"
              >
                <FiChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-white p-4 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                aria-label="Next image"
              >
                <FiChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
          <div className="max-w-6xl w-full h-full flex items-center justify-center">
            <img
              src={project.images[activeImageIndex]?.image || project.thumbnail}
              alt={project.images[activeImageIndex]?.caption || `Screenshot of ${project.title}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          {project.images[activeImageIndex]?.caption && (
            <div className="absolute bottom-6 left-0 right-0 text-center text-white text-lg">
              {project.images[activeImageIndex].caption}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}