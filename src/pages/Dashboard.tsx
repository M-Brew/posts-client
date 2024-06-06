import React from "react";
import NavBar from "../components/NavBar";
import { Route, Routes } from "react-router-dom";
import Posts from "./Posts";
import AddPost from "./AddPost";

export default function Dashboard() {
  return (
    <NavBar>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/add-post" element={<AddPost />} />
      </Routes>
    </NavBar>
  );
}
