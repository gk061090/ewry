class Form extends React.Component {
  state = { value: "", checkedValue: "1" };

  handleChange = event => {
    const value = event.target.value;
    if (!value.match(/^[0-9]*$/gm)) {
      return;
    }
    this.setState(state => ({ ...state, value }));
  };

  handleCheck = event => {
    const value = event.target.value;
    this.setState(state => ({ ...state, checkedValue: value }));
  };

  handleSubmit = event => {
    event.preventDefault();
    const { onAdd } = this.props;
    const { value, checkedValue } = this.state;
    onAdd({ value, type: checkedValue, date: Date.now() });
    this.setState(state => ({ ...state, value: "" }));
  };

  render() {
    const { value, checkedValue } = this.state;
    return (
      <form>
        <input
          value={value}
          onChange={this.handleChange}
          type="tel"
          placeholder="cost"
        />
        <div>
          <input
            type="radio"
            value={"1"}
            onChange={this.handleCheck}
            checked={checkedValue === "1"}
          />
          <input
            type="radio"
            value={"2"}
            onChange={this.handleCheck}
            checked={checkedValue === "2"}
          />
        </div>
        <button onClick={this.handleSubmit} type="submit">
          Add
        </button>
      </form>
    );
  }
}

class List extends React.Component {
  handleRemove = event => {
    const { onRemove } = this.props;
    onRemove(event.target.getAttribute("listId"));
  };

  render() {
    const { list } = this.props;
    return (
      <ul>
        {list.map(({ value, type, date }) => (
          <li key={date}>
            {type} {value} {new Date(date).toLocaleString()}
            <button listId={date} onClick={this.handleRemove}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

class App extends React.Component {
  state = { list: JSON.parse(localStorage.getItem("money") || "[]") };

  saveLocal = list => {
    localStorage.setItem("money", JSON.stringify(list));
  };

  handleAdd = value => {
    if (!value.value.trim()) {
      return;
    }
    this.setState(prevState => {
      const state = {
        ...prevState,
        list: [value, ...prevState.list]
      };
      this.saveLocal(state.list);
      return state;
    });
  };

  handleRemove = id => {
    const { list } = this.state;
    this.setState(prevState => {
      const state = {
        ...prevState,
        list: list.filter(item => item.date !== +id)
      };
      this.saveLocal(state.list);
      return state;
    });
  };

  render() {
    const { list } = this.state;
    return (
      <React.Fragment>
        <Form onAdd={this.handleAdd} />
        <List list={list} onRemove={this.handleRemove} />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
