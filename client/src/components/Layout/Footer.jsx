import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-400">
          Data Structure Visualizer © {new Date().getFullYear()} | 
          Built with React, Tailwind CSS, and Framer Motion
        </p>
        <div className="mt-2 flex justify-center space-x-4">
          <a href="#" className="text-indigo-400 hover:text-indigo-300">GitHub</a>
          <a href="#" className="text-indigo-400 hover:text-indigo-300">Docs</a>
          <a href="#" className="text-indigo-400 hover:text-indigo-300">Contribute</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
