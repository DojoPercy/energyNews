import React from 'react'

const TitleSection = ({ title }) => {
  return (
    <div className="my-12 relative">
      <div className="flex items-center justify-center">
        <hr className="border-t-2 border-gray-300 flex-grow mr-4 rounded-full opacity-50" />
        <h3 className="text-2xl lg:text-3xl  font-bold text-secondaryBlue relative inline-block font-mont uppercase tracking-wider">
          {title}
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 rounded-md hidden w-20 bg-yellow-500"></span>
        </h3>
        <hr className="border-t-2 border-gray-300 flex-grow ml-4 rounded-full opacity-50" />
      </div>
      <span className="absolute top-0 left-1/2 transform -translate-x-1/2 h-16 w-16 bg-blueTheme rounded-full blur-xl opacity-20"></span>
    </div>
  )
}

export default TitleSection
