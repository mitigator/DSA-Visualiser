import React from 'react'
import Header from './Header'
import Footer from './Footer'
import DataStructurenav from '../DataStructureNav/DataStructureNav'

const Layout = ({children}) => {
  return (
    <div className='min-h-screen flex flex-col bg-gray-50'>
      <Header/>
      <DataStructurenav/>
      <main className='flex-grow container mx-auto px-4 py-8'>
        {children}
      </main>
      <Footer/>
    </div>
  )
}

export default Layout
