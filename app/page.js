// pages/index.js
import React from 'react';
import { Provider } from "react-redux";
import { store } from "../app/_redux/news/store";
import Categories from '../app/_components/home';
import Header from "../app/_components/header";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebaseconfig'; // Adjust the path as needed
import { setInitialNews } from '../app/_redux/news/newsSlice';

const Home = ({ initialNews }) => {
  // Initialize the Redux store with the server-side data
  store.dispatch(setInitialNews(initialNews));

  return (
    <Provider store={store}>
      <Header />
      <div className="flex flex-col mx-auto w-[90%]">
        <Categories />
      </div>
    </Provider>
  );
};

export async function getServerSideProps() {
  const newsCollection = collection(db, 'news');
  const snapshot = await getDocs(newsCollection);
  const initialNews = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return {
    props: {
      initialNews,
    },
  };
}

export default Home;
