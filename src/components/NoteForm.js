import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const moment = require("moment-timezone");
const NoteForm = () => {
  // --------------------------------

  const randomIdGenerator = () => {
    return Math.round(Math.random() * 1000000);
  };

  // --------------------------------

  const istTimestamp = moment()
    .tz("Asia/Kolkata")
    .format("DD-MM-YYYY / hh:mm  A");

  // --------------------------------

  const [note, setNote] = useState({
    id: randomIdGenerator(),
    title: "",
    content: "",
    timestamp: istTimestamp,
  });

  // --------------------------------

  const getNoteData = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  // --------------------------------

  const submitData = (e) => {
    e.preventDefault();

    // Retrieve existing notes from localStorage
    const storedNotes = JSON.parse(localStorage.getItem("Notes")) || [];

    // Add the new note to the notes array
    const updatedNotes = [...storedNotes, note];

    setNote({
      // clear input values
      id: randomIdGenerator(),
      title: "",
      content: "",
      timestamp: istTimestamp,
    });

    // Store the updated notes array in localStorage
    localStorage.setItem("Notes", JSON.stringify(updatedNotes));

    // message after data save successfully

    toast.success("Note Saved Successfully");
  };

  return (
    <>
      <div className="addFrom">
        <>
          <div className="bg-gray-100 h-auto sm:h-screen flex items-center justify-center">
            <div className="w-[21rem] mt-[8rem] sm:mt-[0rem] sm:mb-[10rem] sm:max-w-md sm:w-full bg-white p-8 rounded-lg shadow-md">
              <form onSubmit={submitData}>
                <div className="mb-6">
                  <label
                    htmlFor="title"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={note.title}
                    onChange={getNoteData}
                    className="w-full border-2 rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm sm:leading-5 resize-none focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="content"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Content
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={note.content}
                    onChange={getNoteData}
                    required
                    rows={4}
                    className="w-full border-2 rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm sm:leading-5 resize-none focus:outline-none focus:border-blue-500"
                    placeholder="What's on your mind?"
                  />
                </div>

                <button
                  type="submit"
                  className="flex justify-center font-[500] items-center bg-blue-500 hover:bg-red-600 focus:outline-none focus:shadow-outline-blue text-white py-2 px-4 rounded-md transition duration-300 gap-2"
                >
                  Submit
                </button>
              </form>
            </div>
            <Link className="absolute bottom-[6rem] sm:bottom-[9rem]" to="/">
              <button className="w-[18rem]  sm:w-[28rem] font-[500]  bg-blue-600 focus:outline-none focus:shadow-outline-blue text-white py-2 px-4 rounded-md transition duration-300 gap-2">
                Back to Home
              </button>
            </Link>
          </div>
        </>
      </div>
    </>
  );
};

export default NoteForm;
