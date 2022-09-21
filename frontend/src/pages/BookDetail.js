import React from "react";
import { useLocation } from "react-router-dom";

const BookDetail = () => {
  const book = useLocation().state.book;
  console.log(book);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "20px",
          border: "1px solid red",
          padding: "20px",
          cursor: "pointer",
        }}
      >
        <img src={book.image} alt="book" width="250px" height="250px" />
        <h1>{book.name}</h1>
        <br />
        <h4>{book.genre}</h4>
        <br />
        <p>{book.description}</p>
        <br />
        {book.author}
        <br />
      </div>
    </>
  );
};

export default BookDetail;
