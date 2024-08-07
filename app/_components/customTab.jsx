import React from 'react';
import classNames from 'classnames';

const CustomTab = ({ active, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        'px-4 py-1  transition-colors duration-300',
        {
          ' border-b-4 border-b-secondaryBlue text-2xl': active,
          'bg-white text-sm text-gray-600 ': !active,
        }
      )}
    >
      {children}
    </button>
  );
};

export default CustomTab;
