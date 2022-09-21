import React, { useEffect, useState } from "react";
import api from "../api/config";
import { FaTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListBook = () => {
  const [bookList, setBookList] = useState([]);
  const deleteBook = async (id, idx) => {
    // const data = window.confirm("do you want to delete");
    // if (data) {
    try {
      const response = await api.delete(`/book/delete/${id}`);
      console.log(response);
      if (response.data.success) {
        //filtering the data and not show the data in ui if it has been deleted where index is not equal to deleted index.
        const newBookList = bookList.filter((book, index) => index !== idx);
        setBookList(newBookList);
        console.log("book deleted");
        toast.success("Book Deleted");
      } else {
        console.log("unable to delete book");
        toast.error("unable to delete Book");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
    // }
  };
  useEffect(() => {
    async function getBooks() {
      const response = await api.get("/book");
      console.log(response);
      if (response.data) {
        setBookList(response.data);
      }
    }
    getBooks();
  }, []);

  return (
    <center>
      <ToastContainer />
      {bookList.length > 0
        ? bookList.map((book, index) => {
            return (
              <div
                key={index}
                style={{
                  boxShadow: "0px 0px 5px #ccc",
                  padding: "10px",
                  margin: "10px",
                  color: "green",
                  width: "45%",
                  textAlign: "start",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {book.name}
                <FaTrashAlt
                  color="red"
                  style={{ cursor: "pointer" }}
                  //book.id for the database verification and index for the remove form the list
                  onClick={() => deleteBook(book.id, index)}
                />
              </div>
            );
          })
        : "No Books"}
    </center>
  );
};

export default ListBook;
