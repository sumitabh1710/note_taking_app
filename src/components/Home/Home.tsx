import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import CreateNote from "../CreateNote/CreateNote";
import NotesList from "../NotesList/NotesList";

const Home = () => {
  return (
    <div className="home_main_container">
      <CreateNote />
      <NotesList />
    </div>
  );
};

export default Home;
