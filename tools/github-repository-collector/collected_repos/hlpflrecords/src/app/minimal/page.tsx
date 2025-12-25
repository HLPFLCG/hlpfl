import React from 'react'

export default function MinimalPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-10">
          <img 
            src="/logo.svg" 
            alt="HLPFL" 
            className="w-16 h-auto mx-auto"
          />
        </div>
        <div className="text-gray-800 font-light text-lg tracking-wider mb-3">
          CHAOS → CLARITY
        </div>
        <div className="text-gray-600 text-sm italic mb-8">
          pronounced "helpful"
        </div>
        <div className="text-gray-700 text-sm space-y-2 mb-8">
          <div>an artist forward record label</div>
          <div>est 2019.</div>
        </div>
        <div className="w-16 h-px bg-gray-300 mx-auto mb-8"></div>
        <div className="text-gray-700 text-sm">
          Grand Rapids, MI
        </div>
      </div>
    </div>
  )
}