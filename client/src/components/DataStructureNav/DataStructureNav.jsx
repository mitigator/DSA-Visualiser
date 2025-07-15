import React from 'react'
import {NavLink} from 'react-router-dom'

const DataStructureNav = () => {
  const dataStructures = [
    { name: 'Array', path: '/array', icon: '📊' },
    { name: 'Linked List', path: '/linked-list', icon: '⛓', disabled: true },
    { name: 'Stack', path: '/stack', icon: '📚', disabled: true },
    { name: 'Queue', path: '/queue', icon: '🚶‍♂️', disabled: true },
    { name: 'Tree', path: '/tree', icon: '🌳', disabled: true },
    { name: 'Graph', path: '/graph', icon: '🕸', disabled: true },
  ]
  return (
    <nav className='bg-white shadow-sm'>
      <div className='container mx-auto px-4'>
        <div className='flex space-x-1 overflow-x-auto py-2 hide-scrollbar'>
            {dataStructures.map((ds)=>(
              <div key={ds.name}>
                <NavLink to={ds.path} className={({isActive})=> `flex items-center px-4 py-2 rounded-md text-sm font-medium
                  ${ds.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                  ${isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                    <span className="mr-2 text-lg">{ds.icon}</span>
                    {ds.name}
                  </NavLink>
              </div>
            ))}
        </div>
      </div>
    </nav>
  )
}

export default DataStructureNav
