import React, { useState, useEffect } from "react";
import Header from "./Header";
import CreateArea from "./CreateArea";
import Footer from "./Footer";
import Note from "./Note";
import EnterNameTemplate from "./EnterNameTemplate";
import axios from "axios";
import Form from "./form";

function App() {
  const [finalNoteDB, setFinalNoteDB] = useState([]);
  const [isName, setName] = useState(false);
  function getNote() {
    axios
      .get("/notes")
      .then((response) => {
        // respond.data.notes this contains the notes array
        setFinalNoteDB(response.data.notes);
        console.log(finalNoteDB);
      })
      .catch((err) => {
        if (err) {
          console.log("error in app.jsx");
        }
      });
  }
  function getName() {
    setName(true);
  }
  useEffect(() => {
    let ignore = false;

    if (!ignore) getNote();
    return () => {
      ignore = true;
    };
  }, []);
  return (
    <React.Fragment>
      {isName ? (
        <div>
          <Header />
          <CreateArea getNote={getNote} />
          <div className="container-notes">
            {finalNoteDB &&
              finalNoteDB.map((singleNote, index) => {
                return (
                  <Note
                    key={index}
                    id={singleNote._id}
                    title={singleNote.noteTitle}
                    content={singleNote.noteContent}
                    getNote={getNote}
                  />
                );
              })}
          </div>
          <Footer />
        </div>
      ) : (
        <Form getNote={getNote} getName={getName} />
      )}
    </React.Fragment>
  );
}

export default App;
