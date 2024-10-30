import React from 'react'

const TitleSection = ({ title }) => {
  return (
    <div className="my-12 relative mx-0">
      <div className="flex items-center justify-center">
        {/* Retro container with background color and retro-inspired shadow */}
        
        <div className="relative p-3 bg-secondaryBlue rounded-sm shadow-lg shadow-yellow-200">
          <h3 className="text-xl lg:text-2xl font-bold text-white relative inline-block font-mont uppercase tracking-widest">
            {title}
            {/* Retro-inspired underline with subtle animation */}
            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-[0.15rem] w-24 rounded-md  transition-transform duration-300 scale-x-0 hover:scale-x-100"></span>
          </h3>

          {/* Decorative retro arrow in the corner */}
          <div className="absolute -bottom-[0rem] -right-3 w-0 h-0 border-r-[1.2rem] border-r-transparent border-b-[1.2rem] border-b-secondaryBlue"></div>
        </div>

        {/* Retro-style divider line with rounded edges and opacity */}
        <hr className="border-t-2 border-gray-300 flex-grow ml-4 rounded-full opacity-50" />
      </div>

      {/* Retro-style background circle with soft colors for depth */}
      <span className="absolute top-0 left-1/2 transform -translate-x-1/2 h-20 w-20 hidden bg-yellow-300 rounded-full blur-lg opacity-30"></span>
    </div>
  )
}

export default TitleSection;
