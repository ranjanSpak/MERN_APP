import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Fab, Zoom } from "@material-ui/core";
import Axios from "axios";

function CreateArea(props) {
  const [note, setNote] = useState({
    noteTitle: "",
    noteContent: "",
  });
  const [zoom, setZoom] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }
  function handleClick(event) {
    event.preventDefault();
    Axios({
      url: "/save",
      method: "POST",
      data: note,
    })
      .then(() => {
        console.log("Data sent successfully to mongoose");
      })
      .catch(() => {
        console.log("Error detected !");
      });
    setNote({
      noteTitle: "",
      noteContent: "",
    });
    props.getNote();
  }
  function setZoomFunction() {
    setZoom(true);
  }

  return (
    <div className="container container-custom">
      <form className="create-note">
        {zoom ? (
          <input
            name="noteTitle"
            placeholder="Title"
            onChange={handleChange}
            value={note.noteTitle}
          />
        ) : null}

        <textarea
          name="noteContent"
          placeholder="Take a note..."
          rows={zoom ? "3" : "1"}
          onChange={handleChange}
          value={note.noteContent}
          onClick={setZoomFunction}
        />
        <Zoom in={zoom}>
          <Fab onClick={handleClick}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
