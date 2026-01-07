import React from 'react'
import {cn} from '../lib/util'
interface CardsProps {
    title:string
    count:number
    icon:React.ReactNode
    variant?: "total" | "New" | "Converted" | "Closed"
    isActive?: boolean
    onClick?: () => void

}

const variantStyles = {
  total: "bg-blue-50",
  New: "bg-yellow-50",
  Converted: "bg-green-50",
  Closed: "bg-red-50",
}

const iconVariantStyles = {
  total: "bg-blue-100 text-blue-600",
  New: "bg-yellow-100 text-yellow-600",
  Converted: "bg-green-100 text-green-600",
  Closed: "bg-red-100 text-red-600",
}

const countVariantStyles = {
  total: "text-blue-900",
  New: "text-yellow-900",
  Converted: "text-green-900",
  Closed: "text-red-900",
}



const Cards = ({title,count,icon,variant="total",isActive,onClick}: CardsProps) => {
  return (
    <div className='md:my-6'>

    <div className={cn("cursor-pointer rounded-xl shadow-xl transition-all duration-200 bg-background",variantStyles[variant],isActive && " shadow-3xl")} onClick={onClick}>
      
      <div className='p-5 '>
         <div className="flex items-center justify-between">
          <div>
            <p className=" font-bold mb-8 text-lg\\ uppercase text-gray-600 ">{title}</p>
            <p className={cn("text-6xl font-bold tracking-tight mt-1", countVariantStyles[variant])}>{count}</p>
          </div>
           <div className={cn("p-3 mt-16 rounded-lg", iconVariantStyles[variant])}>{icon}</div>
        </div>
    </div>
      </div>
    </div>
  )
}

export default Cards
