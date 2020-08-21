import React, { useState } from "react";
import Axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

function EnterNameTemplate(props) {
  const [nameMe, setNameMe] = useState("");

  function handleChange(event) {
    const { value } = event.target;
    setNameMe(value);
  }

  function handleClick(event) {
    const nameObject = {
      name: nameMe,
    };
    Axios.post("/getName", nameObject)
      .then(() => {
        console.log("Inside axios.post in EnterName template");
        setNameMe("");
        props.getName();
      })
      .catch(() => {
        console.log("Error in axios.post in EnterName template");
      });
    event.preventDefault();
  }
  return (
    <div>
      <Header />
      <div className="d-flex align-items-center flex-column justify-content-center h-100">
        <form className="form-signin form-signin-other-page text-center">
          <label>Enter Your Name below</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name here"
            onChange={handleChange}
            className="form-control"
            required
            autofocus
          />
          <button
            className="btn btn-block btn-social btn-facebook btn-oauth"
            type="submit"
            onClick={handleClick}
          >
            Submit
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default EnterNameTemplate;
