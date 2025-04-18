let dataList = JSON.parse(localStorage.getItem("dataList")) || [];
let selected = null;
const table = document.getElementById("table");
const form = document.getElementById("form");
const modal = document.getElementById("modal");
const addBtn = document.getElementById("addBtn");
const closeModal = document.getElementById("closeModal");
const searchInput = document.getElementById("search");

const showModal = () => modal.style.display = "flex";
const hideModal = () => {
  modal.style.display = "none";
  form.reset();
  selected = null;
};

const renderTable = (list = dataList) => {
  table.innerHTML = list.map((data, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${data.firstName}</td>
      <td>${data.lastName}</td>
      <td>${data.date}</td>
      <td>${data.salary}</td>
      <td>${data.isMarried ? "Ha" : "Yo'q"}</td>
      <td>
        <button onclick="editFn(${i})">Tahrirlash</button>
        <button onclick="deleteData(${i})">O'chirish</button>
      </td>
    </tr>
  `).join('');
};

const saveData = () => {
  localStorage.setItem("dataList", JSON.stringify(dataList));
  renderTable();
  hideModal();
};

form.addEventListener("submit", e => {
  e.preventDefault();
  const newData = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    date: form.datePupil.value,
    salary: form.salaryPupil.value,
    isMarried: form.isMarried.checked,
  };

  if (selected !== null) {
    dataList[selected] = newData;
  } else {
    dataList.push(newData);
  }

  saveData();
});

function editFn(index) {
  selected = index;
  const item = dataList[index];
  form.firstName.value = item.firstName;
  form.lastName.value = item.lastName;
  form.datePupil.value = item.date;
  form.salaryPupil.value = item.salary;
  form.isMarried.checked = item.isMarried;
  showModal();
}

function deleteData(index) {
  if (confirm("Haqiqatan ham o'chirmoqchimisiz?")) {
    dataList.splice(index, 1);
    saveData();
  }
}

addBtn.addEventListener("click", showModal);
closeModal.addEventListener("click", hideModal);

searchInput.addEventListener("input", function () {
  const val = this.value.toLowerCase();
  const filtered = dataList.filter(item =>
    item.firstName.toLowerCase().includes(val) ||
    item.lastName.toLowerCase().includes(val)
  );
  renderTable(filtered);
});

renderTable();
