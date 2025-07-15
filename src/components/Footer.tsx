'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12 ml-[-9rem] mr-[-9rem]">
      <div className="container mx-auto px-8 sm:px-10 lg:px-16">
        <div className="grid md:grid-cols-3 gap-8 ">
          {/* Logo & Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              {/* <div className="w-6 h-6 bg-zabit-primary rounded-md flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.739 9 11 5.16-1.261 9-5.45 9-11V7l-10-5z"/>
                </svg>
              </div>
              <span className="text-2xl font-bold text-zabit-dark">AVERTI SYSTEMS</span> */}
               <Image
                              src="https://client.avertisystems.com/assets/img/averti21.png"
                              alt="Averti Systems Logo"
                              width={100}
                              height={100}
                              className="w-[80%]"
                            />
            </div>
            <p className="text-sm text-gray-600">
              © 2025 Averti Systems, Inc. All rights reserved.
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-2 text-center md:text-left"
          >
            <p className="text-sm text-gray-600">57 Post Street, Suite 901</p>
            <p className="text-sm text-gray-600">San Francisco,</p>
            <p className="text-sm text-gray-600">CA 94104</p>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col space-y-2 md:items-end text-center md:text-right"
          >
            <a
              href="/privacy"
              className="text-sm text-gray-600 hover:text-zabit-primary transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-sm text-gray-600 hover:text-zabit-primary transition-colors duration-200"
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
          className="mt-8 pt-8 border-t border-gray-200 text-center"
        >
          <p className="text-xs text-gray-500">
            Make behavior change a team sport with collaborative care plan adherence.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
