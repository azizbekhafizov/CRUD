let pupils = JSON.parse(localStorage.getItem("pupils")) || [];
let selected = null;

const table = document.getElementById("pupilTable");
const form = document.getElementById("pupilForm");
const modal = document.getElementById("modal");
const addBtn = document.getElementById("addBtn");
const closeModal = document.getElementById("closeModal");
const searchInput = document.getElementById("search");

function showModal() {
  modal.style.display = "flex";
}

function hideModal() {
  modal.style.display = "none";
  form.reset();
  selected = null;
}

function renderTable(data = pupils) {
  table.innerHTML = "";
  data.forEach((pupil, i) => {
    let row = `
      <tr>
        <td>${i + 1}</td>
        <td>${pupil.firstName}</td>
        <td>${pupil.lastName}</td>
        <td>${pupil.date}</td>
        <td>${pupil.salary}</td>
        <td>${pupil.isMarried ? "Ha" : "Yo'q"}</td>
        <td>
          <button onclick="editPupil(${i})">Tahrirlash</button>
          <button onclick="deletePupil(${i})">O'chirish</button>
        </td>
      </tr>
    `;
    table.innerHTML += row;
  });
}

function saveData() {
  localStorage.setItem("pupils", JSON.stringify(pupils));
  renderTable();
  hideModal();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const newPupil = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    date: form.datePupil.value,
    salary: form.salaryPupil.value,
    isMarried: form.isMarried.checked,
  };

  if (selected !== null) {
    pupils[selected] = newPupil;
  } else {
    pupils.push(newPupil);
  }

  saveData();
});

function editPupil(index) {
  selected = index;
  const pupil = pupils[index];
  form.firstName.value = pupil.firstName;
  form.lastName.value = pupil.lastName;
  form.datePupil.value = pupil.date;
  form.salaryPupil.value = pupil.salary;
  form.isMarried.checked = pupil.isMarried;
  showModal();
}

function deletePupil(index) {
  if (confirm("Haqiqatan ham o'chirmoqchimisiz?")) {
    pupils.splice(index, 1);
    saveData();
  }
}

addBtn.addEventListener("click", showModal);
closeModal.addEventListener("click", hideModal);

searchInput.addEventListener("input", function () {
  let value = this.value.toLowerCase();
  let filtered = pupils.filter(p =>
    p.firstName.toLowerCase().includes(value) ||
    p.lastName.toLowerCase().includes(value)
  );
  renderTable(filtered);
});

renderTable();



