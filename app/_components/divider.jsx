import React from 'react';

const Divider = ({ color = 'gray', thickness = '2px', margin = '10px 0' }) => {
  const style = {
    borderTop: `${thickness} solid ${color}`,
    margin: margin,
    
  };

  return <div style={style} className='lg:block hidden'></div>;
};

export default Divider;
