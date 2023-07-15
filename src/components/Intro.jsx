import React, { useState } from 'react';
import blobOne from '../assets/blob-one.png';
import blobTwo from '../assets/blob-two.png';

export default function Intro(props) {
    const [formData, setFormData] = useState({
        amount: 4,
        category: 'Any Category',
        difficulty: 'Any Difficulty',
        type: 'Any Type',
    });
    
    const { setStart, setUrl, setTotalQuestions } = props;

  function startQuiz(e) {
    e.preventDefault();
    const form = e.target;
    const newFormData = {
      amount: parseInt(form.amount.value),
      category: form.category.value,
      difficulty: form.difficulty.value,
      type: form.type.value,
    };
    const num = `amount=${parseInt(form.amount.value)}`
    const cat = form.category.value != "Any Category" ? 
        `&category=${form.category.value}` : ""
    const dif = form.difficulty.value != "Any Difficulty" ? 
        `&difficulty=${form.difficulty.value}` : ""
    const type = form.type.value != "Any Type" ? 
        `&type=${form.type.value}` : ""

    setFormData(newFormData);
    const url = `https://opentdb.com/api.php?${num}${cat}${dif}${type}`
    setUrl(url)
    setTotalQuestions(form.amount.value)
    setStart(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  return (
    <div className="intro">
      <img className="blob-one" src={blobOne} alt="Blob One" />
      <img className="blob-two" src={blobTwo} alt="Blob Two" />
      <h1 className="intro-name">Quizzical</h1>
      <p className="desc">Test Out Your Knowledge On Some Quiz</p>
      <form className="form" onSubmit={startQuiz}>
        <label>
          Amount of questions
          <input
            type="number"
            max={10}
            min={4}
            name="amount"
            onChange={handleChange}
            value={formData.amount}
            required
          />
        </label>
        <label>
          Category
          <select
            name="category"
            onChange={handleChange}
            value={formData.category}
          >
            <option value="Any Category">Any Category</option>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musicals & Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="17">Science & Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertainment: Comics</option>
            <option value="30">Science: Gadgets</option>
            <option value="31">Entertainment: Japanese Anime & Manga</option>
            <option value="32">Entertainment: Cartoon & Animations</option>
          </select>
        </label>
        <label>
          Difficulty
          <select name="difficulty" onChange={handleChange} value={formData.difficulty}>
            <option value="Any Difficulty">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <label>
          Type
          <select name="type" onChange={handleChange} value={formData.type}>
            <option value="Any Type">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </select>
        </label>
        <button className="start-btn" type="submit">Start quiz</button>
      </form>
    </div>
  );
}
