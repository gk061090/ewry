import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { setHello } from "../store/actions";

// eslint-disable-next-line no-shadow
const About = ({ hello, setHello }) => {
  return (
    <div>
      <h1>About</h1>
      <Link to="/">Home</Link>
      <br />
      {hello}
      <br />
      <button
        type="button"
        onClick={() => {
          alert("1");
          setHello("HELLO");
          alert("2");
        }}
      >
        Hello
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
  hello: state.hello
});

const mapDispatchToProps = { setHello };

export default {
  component: connect(mapStateToProps, mapDispatchToProps)(About)
};
