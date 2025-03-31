'use client'
import React from 'react';

const Documentation = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="text-2xl mt-4">
        <div className="flex justify-center">
          <h1 className="font-bold text-4xl">Round-Robin Coupon Distribution System</h1>
        </div>
          <p className="text-gray-800 mt-6 ml-4 ">Documentation</p>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">Key Features</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Sequential coupon distribution with no repetition</li>
            <li>Guest user access without login requirements</li>
            <li>IP and cookie-based abuse prevention</li>
            <li>Secure admin panel for coupon management</li>
            <li>Comprehensive tracking of claimed coupons</li>
            <li>Dynamic enabling/disabling of coupons</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">System Architecture</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="bg-white p-3 rounded shadow text-center flex-1">
                <p className="font-medium text-blue-700">Frontend Client</p>
                <p className="text-gray-600 text-sm">User coupon claiming</p>
              </div>
              <div className="text-gray-500 hidden md:block">→</div>
              <div className="bg-white p-3 rounded shadow text-center flex-1">
                <p className="font-medium text-blue-700">Backend Server</p>
                <p className="text-gray-600 text-sm">Distribution logic & API</p>
              </div>
              <div className="text-gray-500 hidden md:block">→</div>
              <div className="bg-white p-3 rounded shadow text-center flex-1">
                <p className="font-medium text-blue-700">Database</p>
                <p className="text-gray-600 text-sm">Coupon & user tracking</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">Setup Instructions</h2>
          
          <h3 className="text-lg font-semibold text-gray-800 mt-3 mb-2">Prerequisites</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-3">
            <li>Node.js (v14.0.0 or higher)</li>
            <li>Next.js (v15)</li>
            <li>MongoDB (v4.4 or higher)</li>
            <li>npm or yarn package manager</li>
          </ul>
          
          <h3 className="text-lg font-semibold text-gray-800 mt-3 mb-2">Installation Steps</h3>
          <ol className="list-decimal pl-6 text-gray-700 space-y-3">
            <li>
              <p className="font-medium">Clone the repository</p>
              <div className="bg-gray-800 text-gray-200 p-2 rounded mt-1 text-sm font-mono">
              https://github.com/SwastikIIIT/Round-Robin-Coupon-Distribution-System.git
              </div>
            </li>
            <li>
              <p className="font-medium">Install dependencies</p>
              <div className="bg-gray-800 text-gray-200 p-2 rounded mt-1 text-sm font-mono">
                cd Round-Robin-Coupon-Distribution-System<br />
                npm install
              </div>
            </li>
            <li>
              <p className="font-medium">Configure environment variables</p>
              <div className="bg-gray-800 text-gray-200 p-2 rounded mt-1 text-sm font-mono">
                MONGODB_URI=mongodb+srv://whirphool123:Vasuthegreat@cluster0.yitht.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0<br />
                AUTH_SECRET=secrethello<br />
              </div>
            </li>
            <li>
              <p className="font-medium">Start the application</p>
              <div className="bg-gray-800 text-gray-200 p-2 rounded mt-1 text-sm font-mono">
                npm run start
              </div>
            </li>
          </ol>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">Security Features</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Feature</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-800">IP-Based Tracking</td>
                  <td className="px-4 py-3 text-gray-700">
                    Prevents multiple claims from the same IP address within the configured cooldown period (default: 90 seconds).
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-800">Cookie-Based Tracking</td>
                  <td className="px-4 py-3 text-gray-700">
                    Uses browser cookies to identify repeat visitors, even if they change IP addresses.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Documentation;