const express = require("express");
const router = express.Router();
const Note = require("../models/Notes");
var userName = "";

router.get("/notes", function (req, res) {
  Note.findOne({ name: userName })
    .lean()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      // })  , (err, data) => {
      //   if (!err) {
      //     res.send(data);
      //   } else {
      //     console.log("Error in get('/notes')");
      //   }
      // });
    });
});
router.post("/save", function (req, res) {
  const data = req.body;
  Note.findOne({ name: userName }, (err, foundUser) => {
    if (!err) {
      foundUser.notes.push(data);
      foundUser.save();
    }
  });
  res.json({
    msg: "success",
  });
});

router.post("/delete", function (req, res) {
  Note.findOneAndUpdate(
    { name: userName },
    { $pull: { notes: { _id: req.body.id } } },
    (err, foundUser) => {
      if (!err) {
        console.log("Succes in deleting");
        // res.redirect("/notes");
      } else {
        console.log(err);
      }
    }
  );
});

router.post("/getName", (req, res) => {
  userName = req.body.name;
  console.log(userName);
  Note.findOne({ name: userName }, (err, foundUser) => {
    if (!foundUser) {
      const newUser = new Note({
        name: userName,
        notes: [
          {
            noteTitle: "This is your first note",
            noteContent: "This is your notes description part",
          },
        ],
      });
      newUser.save();
      res.redirect("/notes");
    } else {
      res.redirect("/notes");
      console.log("name found and exists already !");
    }
  });
});
module.exports = router;
