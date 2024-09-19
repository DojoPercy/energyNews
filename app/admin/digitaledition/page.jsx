
import React from 'react'

import DigitalEditionForm from '../../_components/digitalEdition';
import DigitalIssuesByYear from '@/app/_components/digitalIssueView';


const DigitalEditionPage = () => {


  return (
    <div className='flex flex-col mt-40'>
      <DigitalIssuesByYear/>
      <DigitalEditionForm/>
    </div>
  )
}

export default DigitalEditionPage