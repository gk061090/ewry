const secret = prompt("password");
const url = `https://ewry-api.herokuapp.com/api/v1/posts?secret=${secret}`;
const listDOM = document.getElementById("list");

const getList = async () => {
  const response = await fetch(url);

  if (!response.ok) {
    console.log("Response error");
    return;
  }

  const data = await response.json();

  return data
    .map(({ _id: id, title, description, date }) => ({
      id,
      title,
      description,
      date
    }))
    .reverse();
};

const renderList = async getList => {
  const list = await getList();
  list.forEach(({ id, title, description, date }) => {
    const html = `<p id="${id}"><b>${title}</b><br>${description}<br>${date}</p>`;
    listDOM.innerHTML += html;
  });
};

const sendForm = async event => {
  event.preventDefault();
  const title = event.target.querySelector("input[name=title]").value;
  const description = event.target.querySelector("input[name=description]")
    .value;

  if (!title || !description) {
    return;
  }

  const data = { title, description };

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });
    event.target.reset();
    // const { title, description, date } = await response.json();
    renderList(getList);
  } catch (error) {
    console.error("Ошибка:", error);
  }
};

renderList(getList);

document.getElementById("form").addEventListener("submit", sendForm);
