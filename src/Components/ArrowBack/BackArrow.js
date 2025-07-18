"use client"
import React from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from 'next/navigation';

const BackArrow = () => {
    const router=useRouter();
  return (  
                <div className="mt-2 cursor-pointer" onClick={()=>router.back()}> 
                  <IoMdArrowRoundBack />
                </div>
  )
}

export default BackArrow