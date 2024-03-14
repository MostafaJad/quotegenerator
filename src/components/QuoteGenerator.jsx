import React, { useState, useEffect } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import "./styles.css";

const QuoteGenerator = () => {
  const [quote, setQuote] = useState({ text: "", author: "" });
  const fetchQuote = async () => {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    setQuote({ text: data.content, author: data.author });
  };
  useEffect(() => {
    fetchQuote();
  }, []);

  const getRandomHexColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const updateBackgroundGradient = (color) => {
    document.body.style.setProperty("--background-color", color);
  };

  const handleButtonClick = () => {
    fetchQuote(); // Fetch a new quote
    const newColor = getRandomHexColor(); // Or getRandomRGBColor()
    updateBackgroundGradient(newColor);
  };

  return (
    <div className="quote-generator">
      <blockquote className="quote-text">
        <span>
          {" "}
          <FaQuoteLeft />{" "}
        </span>
        {quote.text}
        <span>
          {" "}
          <FaQuoteRight />{" "}
        </span>
      </blockquote>
      <p className="author">~{quote.author}</p>
      <button className="get-quote-button" onClick={handleButtonClick}>
        Get New Quote
      </button>
    </div>
  );
};

export default QuoteGenerator;
