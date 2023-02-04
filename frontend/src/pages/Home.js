import React, { useEffect, useState } from "react";
import axios from "axios";
import AddBookModal from "../components/AddBookModel";
import {
    AiOutlineSearch,
    AiOutlinePlus,
    AiFillDelete,
    AiFillEdit,
  } from "react-icons/ai";

function Home() {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");
    const [isModal, setIsModal] = useState(false);
    const [isEditting, setIsEditting] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
  
    const getBooks = async () => {
      const token = localStorage.getItem("token");
      try {
        const { data } = await axios.get("http://localhost:8081/booklibrary/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(data)
        setBooks(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    const deleteBook = async (id) => {
      const token = localStorage.getItem("token");
      try {
        await axios.delete(`http://localhost:8081/booklibrary/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBooks(books.filter((book) => book._id !== id));
      } catch (error) {
        console.log(error);
      }
    };
  
    const searchBook = async () => {
      const token = localStorage.getItem("token");
      try {
        const { data } = await axios.get(
          `http://localhost:8081/booklibrary/${search}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBooks(data.book);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      if (!search) getBooks();
    }, [search]);
  
    const editBook = (book) => {
      setSelectedBook(book);
      setIsEditting(true);
      setIsModal(true);
    };
  
    if (search && books.length === 0) {
      return <h1>results not found {search}</h1>;
    }
  
    return (
      <>
        {/* <div className="search">
          <input
            type="text"
            placeholder="Search for book"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="searchIcon">
            <AiOutlineSearch />
          </span>
          <button className="searchBtn" onClick={searchBook}>
            Search
          </button>
        </div> */}
        <div className="addBook">
          <button className="addBookBtn" onClick={() => setIsModal(true)}>
            <AiOutlinePlus /> Add a book
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th className="name">Book Title</th>
              <th className="branch">Book Article</th>
              <th className="location">Book Author</th>
            </tr>
          </thead>
          <tbody>
            {books?.map((book) => {
              return (
                <tr key={book._id}>
                  <td className="name">{book.title}</td>
                  <td className="branch">{book.article}</td>
                  <td className="location">{book.author}</td>
                  <td>
                    <AiFillDelete
                      onClick={() => deleteBook(book._id)}
                      style={{ cursor: "pointer", width: "1.5rem" }}
                    />
                    <AiFillEdit
                      onClick={() => editBook(book)}
                      style={{ cursor: "pointer", width: "1.5rem" }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {isModal && (
          <AddBookModal
            setIsModal={setIsModal}
            getBooks={getBooks}
            isEditting={isEditting}
            selectedBook={selectedBook}
            setSelectedBook={setSelectedBook}
          />
        )}
      </>
    );
  }
  
  export default Home;