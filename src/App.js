import React from "react";
import NoteList from "./components/NoteList";
import NoteForm from "./components/NoteForm";
import { Route, Routes } from "react-router-dom";
import UpdateFrom from "./components/UpdateFrom";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<NoteList />} />
        <Route path="/create" element={<NoteForm />} />
        <Route path="/update/:id" element={<UpdateFrom />} />
      </Routes>
    </>
  );
};

export default App;
