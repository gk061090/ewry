/* eslint-disable no-underscore-dangle */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos } from "../store/actions";

const List = ({ data: { isLoading, data, error } }) => {
  if (isLoading) {
    return "Loading...";
  }
  if (error) {
    return "Error";
  }
  if (data) {
    return data.map(({ id, title, body }) => (
      <p key={id}>
        <b>{title}</b>
        <br />
        {body}
      </p>
    ));
  }
  return null;
};

const Todo = () => {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!todos.data) {
      fetchTodos()(dispatch);
    }
  }, []);

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <span>Todo</span>
      </nav>
      <h1>Todo</h1>
      <button type="button" onClick={() => fetchTodos()(dispatch)}>
        Refresh
      </button>
      <br />
      <List data={todos} />
    </div>
  );
};

const loadData = (state, param) => state.dispatch(fetchTodos(param));

export default { component: Todo, loadData };
