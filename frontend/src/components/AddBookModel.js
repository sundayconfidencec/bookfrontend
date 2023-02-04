import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineCloseCircle } from "react-icons/ai";

function AddBookModel({
  setIsModal,
  getBooks,
  isEditting,
  selectedBook,
  setSelectedBook,
}) {
  const [title, setTitle] = useState("");
  const [article, setArticle] = useState("");
  const [author, setAuthor] = useState("");

  const addBook = async (e) => {
    const token = localStorage.getItem("token");
    if (isEditting) {
      e.preventDefault();
      try {
        await axios.put(
          `http://localhost:8081/booklibrary/${selectedBook._id}`,
          {
              title:title,
              article:article,
              author:author
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTitle("");
        setArticle("");
        setAuthor("");
        setIsModal(false);
        setSelectedBook(null);
        getBooks();
      } catch (error) {
        console.log(error);
      }
    } else {
      e.preventDefault();
      try {
        await axios.post(
          "http://localhost:8081/booklibrary/",
          {
            title: title,
            article:article,
            author:author
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      setTitle("");
      setArticle("");
      setAuthor("");
        setIsModal(false);
        setSelectedBook(null);
        getBooks();
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    if (isEditting) {
      setTitle(selectedBook.title);
      setArticle(selectedBook.article);
      setAuthor(selectedBook.author);
    }
    console.log(selectedBook);
  }, [isEditting, selectedBook]);

  return (
    <section className="model">
      <div className="addBookModel">
        <span onClick={() => setIsModal(false)} className="closeBtn">
          <AiOutlineCloseCircle />
        </span>
        <form className="addBookForm">
          <h3>Create an account</h3>
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="text"
            value={article}
            onChange={(e) => setArticle(e.target.value)}
          />
          <input
            type="text"
            placeholder="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        
          <button type="submit" onClick={addBook}>
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddBookModel;
