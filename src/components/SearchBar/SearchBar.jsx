import { useState } from "react";
import styles from "./SearchBar.module.css";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function SearchBar({ onSubmit }) {
  const [input, setInput] = useState("");

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (input.trim() === "") {
      toast.error("Please enter a search query.");
      return;
    }
    onSubmit(input);
  };

  return (
    <header className={styles.searchBar}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <button type="submit" className={styles.button}>
          <FaSearch />
        </button>
        <input
          type="text"
          className={styles.input}
          value={input}
          onChange={handleChange}
          placeholder="Search images and photos"
          autoComplete="off"
          autoFocus
        />
      </form>
    </header>
  );
}
