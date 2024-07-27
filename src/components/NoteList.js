import React, { useEffect, useState } from "react";
import { GoPencil } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import { IoAddOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Pagination from "./Pagination";

const NoteList = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [result, setResult] = useState(1);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // -----------------------------------

  const deleteNote = (id) => {
    setLoading(true);
    const updateValue = data.filter((item) => item.id !== id);
    localStorage.setItem("Notes", JSON.stringify(updateValue));
    setData(updateValue);
    setOriginalData(updateValue);
    setLoading(false);
  };

  // -----------------------------------

  const getSearchValue = (search) => {
    if (!search) {
      const notes = JSON.parse(localStorage.getItem("Notes")) || [];
      setData(notes);
      setOriginalData(notes);
      setResult(1);
      return;
    }

    const searchUpdateValue = originalData.filter((item) => {
      return (
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.content.toLowerCase().includes(search.toLowerCase())
      );
    });

    if (searchUpdateValue.length === 0) {
      setResult(0);
    } else {
      setResult(1);
    }
    setData(searchUpdateValue);
    setPage(1);
    setLoading(false);
  };

  // -------------------------------------------

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem("Notes")) || [];
    setData(notes);
    setOriginalData(notes);
    setLoading(false);
  }, []);

  // -----------------------------------

  // calculation of total pages
  let TotalPages = Math.ceil(data.length / itemsPerPage);

  // -----------------------------------

  const currentPageData = data.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  // -----------------------------------

  return (
    <>
      {/* {search bar} */}
      <div className="addSearch flex justify-between mt-4">
        <div className="pt-2 relative mx-auto text-gray-600">
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            type="text"
            name="search"
            onChange={(e) => getSearchValue(e.target.value)}
            placeholder="Search"
          />
          <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
            <IoIosSearch />
          </button>
        </div>

        {/* {search bar} */}
        {/* {add button} */}
        <Link to="/create">
          <button className="flex fixed sm:absolute z-50 right-[1rem] bottom-[5rem] sm:top-[1.3rem] sm:right-[4rem] justify-center items-center  w-14 h-14  sm:h-12 cursor-pointer rounded-[100%] sm:rounded-md hover:shadow-md hover:ease-in-out duration-300  bg-[yellow]  sm:bg-slate-200">
            <IoAddOutline className="text-black w-8 h-8" />
          </button>
        </Link>
      </div>
      {/* {add button} */}
      {/* {Note list stat} */}
      {loading ? (
        <Loader />
      ) : result === 0 ? (
        <h1
          className="text-center mt-[12rem] font-[700] text-[2rem] sm:text-[3rem]"
          style={{
            backgroundImage: "linear-gradient(to left, #776edb, #ec4c4c)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Your Result Not Present
        </h1>
      ) : data.length === 0 ? (
        <h1
          className="text-center mt-[12rem] font-[700] text-[2rem] sm:text-[3rem]"
          style={{
            backgroundImage: "linear-gradient(to left, #776edb, #ec4c4c)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          CREATE YOUR DAILY TASK
        </h1>
      ) : (
        <>
          <div
            className="grid justify-center gap-4 mt-[2rem] sm:mt-[5rem] py-[2rem] px-[4rem]"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            }}
          >
            {data &&
              currentPageData.map((item) => (
                <div
                  key={item.id}
                  className="relative h-[15rem] dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4"
                >
                  <div>
                    <h3 className="text-gray-800 dark:text-gray-100 leading-7 font-semibold w-11/12">
                      {item.title}
                    </h3>
                    <h3 className="text-gray-800 dark:text-gray-100 leading-7 font-semibold w-11/12">
                      {item.content}
                    </h3>
                  </div>

                  <div className="flex gap-4 absolute bottom-2 items-center justify-between text-gray-800">
                    <p className="dark:text-gray-100 text-sm">
                      {item.timestamp}
                    </p>
                  </div>
                  <div className="flex absolute right-3 bottom-2 items-end justify-center gap-4">
                    <Link to={`/update/${item.id}`}>
                      <button
                        className="w-8 h-8 rounded-full dark:bg-gray-100 dark:text-gray-800 bg-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-black"
                        aria-label="edit note"
                        role="button"
                      >
                        <GoPencil />
                      </button>
                    </Link>
                    <button
                      className="w-8 h-8 rounded-full dark:bg-gray-100 dark:text-gray-800 bg-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-black"
                      aria-label="edit note"
                      role="button"
                      onClick={() => deleteNote(item.id)}
                    >
                      <MdDeleteOutline />
                    </button>
                  </div>
                </div>
              ))}
          </div>
          {/* {Note list} */}
          {/* {pagination} */}
          <Pagination TotalPages={TotalPages} page={page} setPage={setPage} />
          {/* {pagination} */}
        </>
      )}
    </>
  );
};

export default NoteList;
