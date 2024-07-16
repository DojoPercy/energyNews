import React from 'react'

const TitleSection = ({title}) => {
  return (
    <div className="my-8">
    <hr className="border-t-2 border-black" />
    <h3 className="text-lg font-bold text-gray-800 mt-4 text-center relative inline-block">
      {title}
     
    </h3>
  </div>
  )
}

export default TitleSection