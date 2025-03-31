import React from 'react'
import Link from 'next/link';
import { Github, Linkedin, Instagram, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className=" md:ml-58 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 py-5">
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        <div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            Contact Information
          </h3>
          <div className="space-y-3 text-neutral-700 dark:text-neutral-300">
            <div className="flex items-center space-x-3">
              <Mail size={20} className="text-neutral-600 dark:text-neutral-400" />
              <a 
                href="mailto:swastikiiit.05@gmail.com" 
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                swastikiiit.05@gmail.com
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Phone size={20} className="text-neutral-600 dark:text-neutral-400" />
              <span>+91 6394942336</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            Connect With Me
          </h3>
          <div className="flex space-x-4">
            <Link 
              href="https://github.com/SwastikIIIT" 
              target="_blank" 
              className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <Github size={24} />
            </Link>
            <Link 
              href="www.linkedin.com/in/swastik-sharma-programmer-developer" 
              target="_blank" 
              className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <Linkedin size={24} />
            </Link>
            <Link 
              href="https://www.instagram.com/ghost_swastik" 
              target="_blank" 
              className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <Instagram size={24} />
            </Link>
          </div>
        </div>

       
        <div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            Quick Links
          </h3>
          <div className="space-y-2 text-neutral-700 dark:text-neutral-300">
            <Link 
              href="/privacy-policy" 
              className="block hover:text-black dark:hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms-of-service" 
              className="block hover:text-black dark:hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      <div className="text-center mt-6 pt-3 border-t border-neutral-300 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400">
        © 2025. All Rights Reserved.
      </div>
    </footer>
  )
}

export default Footer