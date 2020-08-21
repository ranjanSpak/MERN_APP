import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p> &copy;Yash Salvi {" " + year} </p>
    </footer>
  );
}

export default Footer;
