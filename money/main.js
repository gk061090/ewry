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
      <form className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <input
              id="input-id"
              type="tel"
              value={value}
              onChange={this.handleChange}
              className="validate"
            />
            <label for="input-id">Cost</label>
          </div>
          <div className="col">
            <label>
              <input
                type="radio"
                value={"1"}
                onChange={this.handleCheck}
                checked={checkedValue === "1"}
              />
              <span>Я</span>
            </label>
          </div>
          <div className="col">
            <label>
              <input
                type="radio"
                value={"2"}
                onChange={this.handleCheck}
                checked={checkedValue === "2"}
              />
              <span>Мы</span>
            </label>
          </div>
        </div>
        <div>
          <button
            className="waves-effect waves-light btn"
            onClick={this.handleSubmit}
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
    );
  }
}

class List extends React.Component {
  handleRemove = event => {
    const { onRemove } = this.props;
    onRemove(event.target.getAttribute("listId"));
  };

  getTotal = list => {
    if (list.length === 0) {
      return 0;
    }
    return (
      Number(
        list.reduce((a, b) => ({
          value: +a.value + +b.value
        })).value
      ).toLocaleString() + " р."
    );
  };

  render() {
    const { list } = this.props;

    if (list.length === 0) {
      return <p>Empty list</p>;
    }

    return (
      <React.Fragment>
        <p>
          <b>S</b>: {this.getTotal(list)}
        </p>
        <p>
          <b>1</b>: {this.getTotal(list.filter(({ type }) => type === "1"))}
        </p>
        <p>
          <b>2</b>: {this.getTotal(list.filter(({ type }) => type === "2"))}
        </p>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Cost</th>
              <th>Date</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {list.map(({ value, type, date }) => (
              <tr key={date}>
                <td>{type}</td>
                <td>{Number(value).toLocaleString()} р.</td>
                <td>{new Date(date).toLocaleString()}</td>
                <td>
                  <button
                    listId={date}
                    onClick={this.handleRemove}
                    className="waves-effect waves-light btn-small red darken-2"
                  >
                    Del
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
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
