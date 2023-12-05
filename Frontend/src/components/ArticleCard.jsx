import React from 'react'
import { MdVerified } from "react-icons/md";
import { images } from '../constants'

const ArticleCard = ({className}) => {
  return (
    <div className={`rounded-xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] ${className}`}>
        <img src={images.PostImage} alt="title" className='w-full object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60' />
        <div className='p-5'>
            <h2 className='font-roboto font-bold text-xl text-dark-soft md:text-2xl'>Future Of Work</h2>
            <p className='text-dark-light mt-3 text-sm md:text-lg'>Majority of peole will work in jobs that don't exist today.</p>
            <div className='flex justify-between flex-nowrap items-center mt-6'>
                <div className='flex items-center gap-x-2 md:gap-x-2.5'>
                    <img src={images.PostProfile} alt="post profile" className='w-9 h-9 md:w-10 md:h-10'/>
                    <div className='flex flex-col'>
                        <h4 className='font-bold italic text-dark-soft text-sm'>Tim Hortons</h4>
                        <div className='flex items-center gap-x-2'>
                            <span>
                                <MdVerified className='w-4.5 h-4.5 text-[#36B37E]'/>
                            </span>
                            <span className='italic text-dark-light text-xs md:text-sm'>Verified Writer</span>
                        </div>
                    </div>
                </div>
                <span className='font-bold text-dark-light italic text-size text-sm md:text-base'>02 May</span>
            </div>
        </div>
    </div>
  )
}

export default ArticleCard