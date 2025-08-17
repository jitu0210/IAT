import React from "react";
import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-12 w-12">
                
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">
                Aartech Solonics
              </span>
            </div>
            <p className="text-sm text-gray-400">
              Shaping the Future with Innovation, Technology & Internships.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-blue-400 transition-colors">Twitter</a>
              <a href="#" className="hover:text-blue-400 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Facebook</a>
            </div>
          </div>

          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link to="/internships" className="hover:text-blue-400 transition-colors">Internships</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/careers" className="hover:text-blue-400 transition-colors">Careers</Link></li>
              <li><Link to="/news" className="hover:text-blue-400 transition-colors">News & Updates</Link></li>
              <li><Link to="/events" className="hover:text-blue-400 transition-colors">Events</Link></li>
              <li><Link to="/support" className="hover:text-blue-400 transition-colors">Support</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: <span className="text-blue-400">hr@aartech.com</span></li>
              <li>Phone: <span className="text-blue-400">+91 98765 43210</span></li>
              <li>Address: Bhopal, India</li>
            </ul>
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Subscribe to Newsletter</h4>
              <form className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white rounded-md px-3 py-2 text-sm transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© {new Date().getFullYear()} Aartech Solonics Limited. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-blue-400">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-blue-400">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-blue-400">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}