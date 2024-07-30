import { createSelector } from "@reduxjs/toolkit";
import { useState } from "react";

export const useField = (type) => {
  const [value, setValue] = useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const reset = () => {
    setValue("");
  };
  return {
    type,
    value,
    onChange,
    reset,
  };
};

const selectBlogs = (state) => state.blogs;

export const selectSortedBlogs = createSelector([selectBlogs], (blogs) =>
  [...blogs].sort((b, a) => a.likes - b.likes),
);
