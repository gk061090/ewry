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
    checkedValue: "1",
    product: "food"
  };

  handleChange = event => {
    const { value } = event.target;
    if (!value.match(/^[0-9]*$/gm)) {
      return;
    }
    this.setState(state => ({ ...state, value }));
  };

  handleDateChange = event => {
    const { value: datetime } = event.target;
    this.setState(state => ({ ...state, datetime }));
  };

  handleCheck = event => {
    const { value } = event.target;
    this.setState(state => ({ ...state, checkedValue: value }));
  };

  handleSelect = event => {
    const { value: product } = event.target;
    this.setState(state => ({ ...state, product }));
  };

  handleSubmit = event => {
    event.preventDefault();
    const { onAdd } = this.props;
    const { value, datetime, checkedValue, product } = this.state;
    const date = new Date(datetime).getTime();
    if (isNaN(date) || date < 0) {
      return;
    }
    const id = `${date}${this.getRandom(10, 99)}`;
    onAdd({ id, value, type: checkedValue, product, date });
    this.setState(state => ({ ...state, value: "" }));
  };

  render() {
    const { value, datetime, checkedValue, product } = this.state;
    return (
      <form>
        {/* Date Input */}
        <div className="uk-margin">
          <input
            type="datetime-local"
            value={datetime}
            onChange={this.handleDateChange}
            className="uk-input uk-form-small"
          />
        </div>
        {/* Select Input */}
        <div className="uk-margin">
          <select
            onChange={this.handleSelect}
            className="uk-select uk-form-small"
          >
            <option value="food" selected={product === "food"}>
              Food
            </option>
            <option value="" selected={product === ""}>
              Other
            </option>
          </select>
        </div>
        {/* Radio Input */}
        <div className="uk-margin">
          <label>
            <input
              type="radio"
              value={"1"}
              onChange={this.handleCheck}
              checked={checkedValue === "1"}
              class="uk-radio"
            />
            <span> 🚶‍♂️</span>
          </label>
          <span>&nbsp;&nbsp;</span>
          <label>
            <input
              type="radio"
              value={"2"}
              onChange={this.handleCheck}
              checked={checkedValue === "2"}
              class="uk-radio"
            />
            <span> 👫</span>
          </label>
        </div>
        {/* Cost Input */}
        <div className="uk-margin">
          <input
            id="input-id"
            type="tel"
            value={value}
            onChange={this.handleChange}
            className="uk-input uk-form-small"
            placeholder="Input cost..."
          />
        </div>
        {/* Submit Button */}
        <div className="uk-margin">
          <button
            type="submit"
            onClick={this.handleSubmit}
            className="uk-button uk-button-primary"
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
      <div className="uk-card uk-card-default uk-card-statistics uk-card-body">
        <div className="statistics-row">
          <div>👨‍👩‍👧‍👦</div>
          <div>{getTotal(list)}</div>
        </div>
        <div className="statistics-divider" />
        <div className="statistics-row">
          <div>🚶‍♂️</div>
          <div>{getTotal(list.filter(({ type }) => type === "1"))}</div>
        </div>
        <div className="statistics-row">
          <div>👫</div>
          <div>{getTotal(list.filter(({ type }) => type === "2"))}</div>
        </div>
        <div className="statistics-divider" />
        <div className="statistics-row">
          <div>🥩</div>
          <div>
            {getTotal(list.filter(({ product }) => product === "food"))}
          </div>
        </div>
        <div className="statistics-row">
          <div>🙉</div>
          <div>{getTotal(list.filter(({ product }) => product === ""))}</div>
        </div>
      </div>
    </div>
  );
};

const ImportForm = ({ value, onInput, onSubmit, onClose, hasCloseButton }) => (
  <div className="uk-margin">
    <form>
      {hasCloseButton && (
        <button
          type="button"
          onClick={onClose}
          className="uk-button uk-button-default uk-button-small"
        >
          👋
        </button>
      )}
      <input
        type="text"
        value={value}
        onChange={onInput}
        className="uk-input uk-form-small uk-width-auto"
        placeholder="Paste..."
      />
      <button
        type="submit"
        onClick={onSubmit}
        className="uk-button uk-button-danger uk-button-small"
      >
        Import
      </button>
    </form>
  </div>
);

class List extends React.Component {
  state = { isOpen: false, value: "" };

  handleRemove = event => {
    const { onRemove } = this.props;
    onRemove(event.target.getAttribute("listId"));
  };

  toggle = () => {
    this.setState(state => ({ ...state, isOpen: !state.isOpen }));
  };

  close = () => {
    this.setState(state => ({ ...state, isOpen: false }));
  };

  handleInput = event => {
    const { value } = event.target;
    this.setState(state => ({ ...state, value }));
  };

  handleSubmit = event => {
    event.preventDefault();
    const { onImport } = this.props;
    const { value } = this.state;
    onImport(value);
    this.setState(state => ({ ...state, value: "" }));
  };

  render() {
    const { list, onSort, onCopy } = this.props;
    const { isOpen, value } = this.state;

    if (list.length === 0) {
      return (
        <div>
          <ImportForm
            value={value}
            onInput={this.handleInput}
            onSubmit={this.handleSubmit}
            onClose={this.close}
          />
          <p>Empty list</p>
        </div>
      );
    }

    return (
      <div className="list">
        <button
          type="button"
          onClick={onSort}
          className="uk-button uk-button-primary uk-button-small"
        >
          &darr;
        </button>
        <button
          type="button"
          onClick={onCopy}
          className="uk-button uk-button-default uk-button-small"
        >
          💾
        </button>
        <button
          type="button"
          onClick={this.toggle}
          className="uk-button uk-button-default uk-button-small"
        >
          📝
        </button>
        {isOpen && (
          <ImportForm
            value={value}
            onInput={this.handleInput}
            onSubmit={this.handleSubmit}
            onClose={this.close}
            hasCloseButton
          />
        )}
        <table className="uk-table uk-table-small uk-table-divider">
          <thead>
            <tr>
              <th>👨‍👩‍👧‍👦</th>
              <th>💰</th>
              <th>🤷</th>
              <th>📅⌚</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {list.map(({ id, value, type, product, date }) => (
              <tr key={id}>
                <td>{type === "1" ? "🚶‍♂️" : "👫"}</td>
                <td>{Number(value).toLocaleString()} р.</td>
                <td>{product === "food" ? "🥩" : "🙉"}</td>
                <td>
                  {new Date(date)
                    .toLocaleString()
                    .split(" ")
                    .map(item => (
                      <div className="date-time">{item}</div>
                    ))}
                </td>
                <td>
                  <button
                    listId={id}
                    onClick={this.handleRemove}
                    className="uk-button uk-button-default uk-button-small"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

class App extends React.Component {
  getList = () => JSON.parse(localStorage.getItem("money") || "[]");

  state = { list: this.getList() };

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

  handleCopy = () => {
    const list = localStorage.getItem("money");
    navigator.clipboard.writeText(list);
  };

  handleImport = value => {
    if (!value.trim()) {
      return;
    }
    let parsed;
    try {
      parsed = JSON.parse(value);
    } catch (e) {
      alert("Некорректные данные! Не JSON");
      return;
    }
    if (!Array.isArray(parsed)) {
      alert("Некорректные данные! Нет нужен массив");
      return;
    }
    const isCorrect =
      parsed.length ===
      parsed.filter(
        ({ id, value, type, product, date }) =>
          Boolean(id) &&
          Boolean(value) &&
          Boolean(type) &&
          Boolean(product) &&
          Boolean(date)
      ).length;
    if (!isCorrect) {
      alert("Ошибка в данных!");
      return;
    }
    localStorage.setItem("money", value);
    this.setState(prevState => ({
      ...prevState,
      list: this.getList()
    }));
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
          onCopy={this.handleCopy}
          onImport={this.handleImport}
        />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
