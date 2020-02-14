class Form extends React.Component {
  formatDate = date => {
    const format = val => (val < 10 ? `0${val}` : val);
    return `${date.getFullYear()}-${format(date.getMonth() + 1)}-${format(
      date.getDate()
    )}T${format(date.getHours())}:${format(date.getMinutes())}`;
  };

  getRandom = (min, max) => (Math.random() * (max - min) + min).toFixed(0);

  state = {
    value: "",
    datetime: this.formatDate(new Date()),
    checkedValue: "1"
  };

  handleChange = event => {
    const value = event.target.value;
    if (!value.match(/^[0-9]*$/gm)) {
      return;
    }
    this.setState(state => ({ ...state, value }));
  };

  handleDateChange = event => {
    const datetime = event.target.value;
    this.setState(state => ({ ...state, datetime }));
  };

  handleCheck = event => {
    const value = event.target.value;
    this.setState(state => ({ ...state, checkedValue: value }));
  };

  handleSubmit = event => {
    event.preventDefault();
    const { onAdd } = this.props;
    const { value, datetime, checkedValue } = this.state;
    const date = new Date(datetime).getTime();
    if (isNaN(date) || date < 0) {
      return;
    }
    const id = `${date}${this.getRandom(10, 99)}`;
    onAdd({ id, value, type: checkedValue, date });
    this.setState(state => ({ ...state, value: "" }));
  };

  render() {
    const { value, datetime, checkedValue } = this.state;
    return (
      <form>
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
        <div className="row">
          <input
            type="datetime-local"
            value={datetime}
            onChange={this.handleDateChange}
          />
        </div>
        <div className="row">
          <label>
            <input
              type="radio"
              value={"1"}
              onChange={this.handleCheck}
              checked={checkedValue === "1"}
            />
            <span>Я</span>
          </label>
          <span>&nbsp;&nbsp;</span>
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

const Statistics = ({ list }) => {
  const getTotal = list => {
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

  return (
    <div className="statistics">
      <p>
        <b>S</b>: {getTotal(list)}
      </p>
      <p>
        <b>1</b>: {getTotal(list.filter(({ type }) => type === "1"))}
      </p>
      <p>
        <b>2</b>: {getTotal(list.filter(({ type }) => type === "2"))}
      </p>
    </div>
  );
};

class List extends React.Component {
  handleRemove = event => {
    const { onRemove } = this.props;
    onRemove(event.target.getAttribute("listId"));
  };

  render() {
    const { list, onSort } = this.props;

    if (list.length === 0) {
      return <p>Empty list</p>;
    }

    return (
      <React.Fragment>
        <button
          type="button"
          onClick={onSort}
          className="waves-effect waves-light btn-small"
        >
          &darr;
        </button>
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
            {list.map(({ id, value, type, date }) => (
              <tr key={id}>
                <td>{type}</td>
                <td>{Number(value).toLocaleString()} р.</td>
                <td>{new Date(date).toLocaleString()}</td>
                <td>
                  <button
                    listId={id}
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
    const confirmed = confirm("Delete?");
    if (!confirmed) {
      return;
    }

    this.setState(prevState => {
      const state = {
        ...prevState,
        list: prevState.list.filter(item => item.id !== id)
      };
      this.saveLocal(state.list);
      return state;
    });
  };

  handleSort = () => {
    const sort = ({ date: date1 }, { date: date2 }) => date2 - date1;

    this.setState(prevState => {
      const state = {
        ...prevState,
        list: prevState.list.sort(sort)
      };
      this.saveLocal(state.list);
      return state;
    });
  };

  render() {
    const { list } = this.state;
    return (
      <React.Fragment>
        <div className="form-block">
          <Statistics list={list} />
          <Form onAdd={this.handleAdd} />
        </div>
        <List
          list={list}
          onRemove={this.handleRemove}
          onSort={this.handleSort}
        />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
