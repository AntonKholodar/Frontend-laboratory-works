import React from 'react'

function About() {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
      {/* App Logo/Emblem */}
      <div className="mb-6">
        <div className="w-24 h-24 mx-auto bg-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
          SC
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mt-4">Simple Chat</h1>
      </div>

      {/* App Description */}
      <div className="space-y-4 text-gray-700">
        <p className="text-lg">
          Welcome to Simple Chat - a modern web application for real-time communication.
        </p>
        
        <p>
          Simple Chat allows users to register, login, and participate in group conversations 
          with a clean and intuitive interface. Built with modern web technologies including 
          React, Tailwind CSS, and local storage for data persistence.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Features</h2>
        <ul className="text-left space-y-2 max-w-md mx-auto">
          <li className="flex items-center">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
            User registration and authentication
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
            Real-time messaging interface
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
            User profile management
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
            Responsive design for all devices
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
            Local data storage
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">Technology Stack</h2>
        <div className="flex flex-wrap justify-center gap-3">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">React</span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Node.js</span>
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Vite</span>
          <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm">Tailwind CSS</span>
          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">React Router</span>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Laboratory Work #1 - Web Interface Programming<br/>
            Built as part of the Frontend development course
          </p>
        </div>
      </div>
    </div>
  )
}

export default About 