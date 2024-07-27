import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "./Loader";
const moment = require("moment-timezone");
const UpdateFrom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  // -----------------------------------------

  const UpdateTime = moment()
    .tz("Asia/Kolkata")
    .format("DD-MM-YYYY / hh:mm  A");

  // -----------------------------------------

  const [note, setNote] = useState({
    id: id,
    title: "",
    content: "",
    timestamp: UpdateTime,
  });

  // -----------------------------------------

  const getNoteData = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  // -----------------------------------------

  const submitData = (e) => {
    e.preventDefault();

    // Retrieve notes from localStorage for identify
    const storedNotes = JSON.parse(localStorage.getItem("Notes")) || [];

    // Find the index of the note being updated
    const noteIndex = storedNotes.findIndex((item) => item.id === +id);

    // Add the new note to the notes array

    if (noteIndex > -1) {
      storedNotes[noteIndex] = note;
    } else {
      storedNotes.push(note); // if item not found add new note
    }

    // Store the updated notes array in localStorage
    localStorage.setItem("Notes", JSON.stringify(storedNotes));

    navigate("/"); // navigate the user after update note

    toast.success("Note Update Successfully");
    setLoading(false);
  };

  // -----------------------------------------

  const getUserById = (id) => {
    const getUserFromLocal = JSON.parse(localStorage.getItem("Notes")) || [];
    const getUser = getUserFromLocal.find((item) => item.id === +id);
    if (getUser) {
      setNote({
        id: getUser.id,
        title: getUser.title,
        content: getUser.content,
        timestamp: UpdateTime,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    getUserById(id);
  }, [id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
                      value={note.title}
                      required
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
      )}
    </>
  );
};

export default UpdateFrom;
