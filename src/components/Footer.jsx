import React from 'react';
import Link from 'next/link';
const Footer = () => {
  return (
    <div className='bg-blue-50 flex flex-col p-10 mt-10'>
      <h2 className='font-Oswald text-black text-6xl'>eBook</h2>
      <ul className='flex mt-5 text-black text-lg gap-4 font-Poppins font-base'>
        <Link href="/browsebook"><li>Browse book</li></Link>
        <Link href="/addbooks"><li>Add book</li></Link>
        <Link href="/"><li>Home</li></Link>
      </ul>
    </div>
  )
}

export default Footer