import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { compose } from "redux";
import { setHello } from "../store/actions";

const About = () => {
  const hello = useSelector(state => state.hello);
  const dispatchSetHello = compose(useDispatch(), setHello);
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <span>About</span>
        <Link to="/todo">Todo</Link>
      </nav>
      <h1>About</h1>
      <br />
      {hello}
      <br />
      <button type="button" onClick={() => dispatchSetHello("Hello")}>
        Say
      </button>
    </div>
  );
};

export default { component: About };
