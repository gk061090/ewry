const form = document.getElementById("form");
const todoList = document.getElementById("todo-list");
const sumDOM = document.getElementById("sum");

const getTodos = () => JSON.parse(localStorage.getItem("todos") || "[]");

const todos = getTodos();

const getTotal = todos => {
  if (todos.length === 0) {
    return 0;
  }
  return (
    todos
      .reduce((a, b) => ({
        title: +a.title + +b.title
      }))
      .title.toLocaleString() + "р."
  );
};

const renderTodos = todos =>
  todos
    .map(
      ({ title, type, date }) =>
        `<li class="todo">
          <p>
            ${type}: ${title}
            <br>
            <i>${new Date(date).toLocaleDateString("ru")}</i>
          </p>
          <button class="todo-remove uk-button uk-button-danger" key="${date}" onclick="removeTodo(event)">Delete</button>
        </li>`
    )
    .join("");

const renderCounters = todos => {
  sumDOM.innerHTML = `<p>S: ${getTotal(todos)};<br>1: ${getTotal(
    todos.filter(({ type }) => type === "1")
  )};<br>2: ${getTotal(todos.filter(({ type }) => type === "2"))}</p>`;
};

todoList.innerHTML = renderTodos(todos);
renderCounters(todos);

const removeTodo = event => {
  // id = timestamp
  const id = event.target.getAttribute("key");
  const filteredTodos = getTodos().filter(todo => todo.date !== +id);
  localStorage.setItem("todos", JSON.stringify(filteredTodos));
  todoList.innerHTML = renderTodos(filteredTodos);
  renderCounters(getTodos());
};

const getId = todos =>
  todos.length
    ? todos.reduce((acc, val) => (val.id > acc.id ? val : acc)).id
    : 0;

form.addEventListener("submit", event => {
  event.preventDefault();
  const form = event.target;
  const inputValue = form.querySelector("input[name=todo]").value;
  const radioValue = form.querySelector("input[name=radio]:checked").value;
  if (inputValue.length !== 0) {
    let todos = getTodos();
    localStorage.setItem(
      "todos",
      JSON.stringify([
        {
          id: getId(todos) + 1,
          title: inputValue,
          type: radioValue,
          date: Date.now()
        },
        ...todos
      ])
    );
    form.reset();
    todos = getTodos();
    todoList.innerHTML = renderTodos(todos);
    renderCounters(todos);
  }
});
