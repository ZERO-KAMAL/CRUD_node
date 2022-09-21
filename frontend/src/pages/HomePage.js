import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/config";
const HomePage = () => {
  const [bookList, setBookList] = useState([]);
  const [tempBookList, setTempBookList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  //as we know boolist is the initail value so we are setting up the initail value with current state  "setBookList" after rendering the component
  useEffect(() => {
    async function fetchBooks() {
      const response = await api.get("/book");
      setBookList(response.data);
      setTempBookList(response.data);
    }
    fetchBooks();
  }, []);

  //search
  useEffect(() => {
    async function searchBooks() {
      const response = await api.get(`/book/search/all?q=${searchText}`);
      if (response.data) {
        console.log(response.data);
        setBookList(response.data);
      }
    }
    if (searchText) {
      searchBooks();
    } else setBookList(tempBookList);
  }, [searchText]);
  return (
    <>
      <center>
        <input
          type="text"
          placeholder="Search Books..."
          style={{ width: "55%", margin: "20px", padding: "10px" }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </center>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {bookList.length > 0
          ? bookList.map((book, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "20px",
                    border: "1px solid red",
                    padding: "20px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    navigate("/bookdetails", {
                      state: {
                        book,
                      },
                    })
                  }
                >
                  <img
                    src={book.image}
                    alt={`image ${index}`}
                    width="250px"
                    height="250px"
                  />

                  {book.name}
                </div>
              );
            })
          : "No Books Found"}
      </div>
    </>
  );
};

export default HomePage;
