"use client";
import React from 'react'
import NewsList from '../_components/newlists'
import { Provider } from 'react-redux';
import { store } from '../_redux/news/store';

const Admin = () => {
  return (
    <section>
      <Provider store={store}>
        <NewsList />
      </Provider>
    </section>
  )
}

export default Admin