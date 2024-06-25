'use client';
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../../../_redux/news/store';
import EditPost from '../../../_components/editpost';

const Edit = () => {
  return (
    <Provider store={store}>
      <EditPost />

    </Provider>
  )
}

export default Edit