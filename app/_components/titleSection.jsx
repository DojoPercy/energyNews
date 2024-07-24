import React from 'react'

const TitleSection = ({title}) => {
  return (
    <div className="my-8">
    <hr className="border-t-2 border-gray-300 rounded-lg" />
    <h3 className="text-2xl font-bold text-secondaryBlue mt-4 text-center relative inline-block font-mont">
      {title}
     
    </h3>
  </div>
  )
}

export default TitleSection