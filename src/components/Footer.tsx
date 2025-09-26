"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import logo from "../image/logo-dark.png";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-20 px-4 sm:px-6 md:px-10 lg:mx-[-9rem] md:mx-[-5rem]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Logo & Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 flex flex-col items-center md:items-start"
          >
            <div className="flex items-center gap-2">
              <Image
                src={logo}
                alt="Averti Systems Logo"
                width={100}
                height={100}
                className="w-32 sm:w-40 object-contain"
              />
            </div>
            <p className="text-sm text-gray-600">
              © 2025 Averti Systems, Inc. All rights reserved.
            </p>
          </motion.div>

          {/* Contact Info */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-2"
          >
            <p className="text-sm text-gray-600">57 Post Street, Suite 901</p>
            <p className="text-sm text-gray-600">San Francisco,</p>
            <p className="text-sm text-gray-600">CA 94104</p>
          </motion.div> */}

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col space-y-2 items-center md:items-end"
          >
            <a
              href="/privacy"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              Terms of Use
            </a>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 pt-6 border-t border-gray-200 text-center"
        >
          <p className="text-xs text-gray-500 px-2 sm:px-0">
            Make behavior change a team sport with collaborative care plan
            adherence.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
