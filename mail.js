const secret = prompt("password");
const secretQuery = `?secret=${secret}`;
const url = "https://ewry-api.herokuapp.com/api/v1/posts";
const listDOM = document.getElementById("list");

const getItemLayout = ({ id, title, description, date }) => {
  return `\
    <div class="list__item">\
      <b>${title}</b>\
      <br>\
      ${description}\
      <br>\
      ${date}\
      <br>\
      <div class="list__nav">\
        <button class="delete" data-id="${id}">Удалить</button>\
      </div>\
    </div>`;
};

const getList = async () => {
  const response = await fetch(url + secretQuery);

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

const removePost = async event => {
  event.preventDefault();
  const postId = event.target.getAttribute("data-id");
  const hasConfirmation = confirm("Удалить?");

  if (!hasConfirmation) {
    return;
  }

  try {
    const response = await fetch(`${url}/${postId}${secretQuery}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    renderList(getList);
  } catch (error) {
    console.error("Ошибка:", error);
  }
};

const renderList = async getList => {
  listDOM.innerHTML = "<p>Идет загрузка...</p>";
  const list = await getList();
  listDOM.innerHTML = "";
  list.forEach(item => (listDOM.innerHTML += getItemLayout(item)));
  document.querySelectorAll(".delete").forEach(btn => {
    btn.addEventListener("click", removePost);
  });
};

const sendForm = async event => {
  event.preventDefault();
  const title = event.target.querySelector("input[name=title]").value.trim();
  const description = event.target
    .querySelector("textarea[name=description]")
    .value.trim();

  if (!title || !description) {
    return;
  }

  const data = { title, description };

  try {
    const response = await fetch(url + secretQuery, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });
    event.target.reset();
    renderList(getList);
  } catch (error) {
    console.error("Ошибка:", error);
  }
};

renderList(getList);

document.getElementById("form").addEventListener("submit", sendForm);
