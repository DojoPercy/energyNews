"use client";
import CreatePost from "../../_components/create_post";
import { Provider } from "react-redux";
import { store } from "../../_redux/news/store";
import React from "react";

const CreateNews = () => {
  return (
    <Provider store={store}>
      <CreatePost />
    </Provider>
  );
};

export default CreateNews;
