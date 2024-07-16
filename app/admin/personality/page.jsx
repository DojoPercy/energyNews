import dynamic from 'next/dynamic';
import React from 'react';

const BestPersonalityForm = dynamic(() => import('@/app/_components/bestpersonality'), { ssr: false });

const Personality = () => {
  return (
    <div className='mt-40'><BestPersonalityForm/></div>
  );
}

export default Personality;
