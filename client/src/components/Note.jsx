import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import Axios from "axios";

function Note(props) {
  function deleteNoteInNote() {
    const objectID = {
      id: props.id,
    };
    Axios.post("/delete", objectID);
    props.getNote();
  }
  return (
    <div className="note-parent">
      <div className="note">
        <h1>{props.title}</h1>
        <p>{props.content}</p>
        <button onClick={deleteNoteInNote}>
          {" "}
          <DeleteIcon />{" "}
        </button>
      </div>
    </div>
  );
}

export default Note;
