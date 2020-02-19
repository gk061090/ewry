import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div>
    <nav>
      <span>Home</span>
      <Link to="/about">About</Link>
      <Link to="/todo">Todo</Link>
    </nav>
    <h1>Home</h1>
  </div>
);

export default { component: Home };
