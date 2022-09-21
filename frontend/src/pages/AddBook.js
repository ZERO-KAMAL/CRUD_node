import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api/config";

const AddBook = () => {
  const [formData, setFormData] = useState({});
  const [imageData, setImageData] = useState({});
  const handleChange = (e) => {
    // console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //form submit
  const addBook = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/book/add",
        {
          ...formData,
          image: imageData,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.id) {
        console.log(response);
        // console.log("success");
        toast.success(`${response.data.name} have added data succfully`, {
          position: "bottom-left",
        });
        e.target.reset();
        setFormData({});
        setImageData();
      } else {
        // console.log();
        toast.error(response.data.message, {
          position: "bottom-left",
        });
      }
    } catch (err) {
      // console.log(response.data.message);
      toast.error(err.message);
    }
  };
  return (
    <div>
      <ToastContainer />
      <form
        action=""
        method=""
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        onSubmit={addBook}
      >
        name
        <input type="text" name="name" id="" onChange={handleChange} />
        author
        <input type="text" name="author" id="" onChange={handleChange} />
        genre
        <input type="text" name="genre" id="" onChange={handleChange} />
        image
        <input
          type="file"
          name="image"
          id=""
          onChange={(e) => setImageData(e.target.files[0])}
        />
        description
        <textarea
          name="description"
          id=""
          cols="30"
          rows="10"
          onChange={handleChange}
        ></textarea>
        <button type="submit" value="submit" className="btn btn-primary">
          submit
        </button>
      </form>
    </div>
  );
};

export default AddBook;
