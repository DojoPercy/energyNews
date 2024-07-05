"use client";
import AdsSection from '@/app/_components/ads'
import { store } from '@/app/_redux/news/store'
import React from 'react'
import { Provider } from 'react-redux'

const Ad = () => {
  return (
    <Provider store={store}>
      <AdsSection/>
    </Provider>
  )
}

export default Ad