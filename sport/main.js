const fetchData = async (container) => {
  const response = await fetch('/sport/db.json');
  if (response.status !== 200) {
    console.error('Error! Data not found')
    return;
  }
  const data = await response.json();
  
  const { date, items}  = data[0];
  
  const p = document.createElement('p');
  const ul = document.createElement('ul');

  p.textContent = new Date(date).toLocaleDateString('ru');

  items.forEach(({label, count}) => {
    const li = document.createElement('li');
    li.textContent = `${label} ... ${count}`;
    ul.appendChild(li);
  });

  container.appendChild(p);
  container.appendChild(ul);
}

fetchData(document.getElementById('root'))