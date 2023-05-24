document.addEventListener("DOMContentLoaded", () => {
  document.onload = getUsers();
});

async function deleteUser(id) {
  let table = document.getElementById("users-table");
  let spinner = document.getElementById("loading-spinner");
  spinner.classList.remove("loading");
  table.classList.add("loading");
  try {
    const response = await fetch(
      `https://forclouder-backend-prod.onrender.com/aluno/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    window.location.reload();
    spinner.classList.add("loading");
    table.classList.remove("loading");
    return data;
  } catch (err) {
    console.log(err);
    spinner.classList.add("loading");
    table.classList.remove("loading");
  }
}
async function updateUser(id) {
  let modalInput = document.getElementById("update-input").value;
  console.log(modalInput, id);
  try {
    const response = await fetch(
      `https://forclouder-backend-prod.onrender.com/aluno/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: modalInput,
        }),
      }
    );
    const data = await response.json();
    window.location.reload();
    spinner.classList.add("loading");
    table.classList.remove("loading");
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function getUsers() {
  let table = document.getElementById("users-table");
  let spinner = document.getElementById("loading-spinner");
  spinner.classList.remove("loading");
  table.classList.add("loading");
  try {
    const response = await fetch(
      "https://forclouder-backend-prod.onrender.com/aluno",
      {
        method: "GET",
      }
    );
    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
      let row = table.insertRow(i + 1);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      const updateButton = document.createElement("div");
      const deleteButton = document.createElement("button");
      const modalConfirmButton = document.getElementById("modal-button");
      updateButton.innerHTML = `
        <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
          <i class="bi bi-pencil-fill"></i>
        </button>
      `;
      deleteButton.innerHTML = `<i class="bi bi-trash-fill"></i>`;
      deleteButton.addEventListener("click", async () => {
        await deleteUser(data[i]._id);
      });
      updateButton.addEventListener("click", async () => {
        modalConfirmButton.addEventListener("click", async () => {
          await updateUser(data[i]._id);
        });
      });

      cell1.innerHTML = data[i].email;
      cell2.appendChild(updateButton);
      cell2.appendChild(deleteButton);
    }
    spinner.classList.add("loading");
    table.classList.remove("loading");
    return data;
  } catch (err) {
    console.log(err);
    spinner.classList.add("loading");
    table.classList.remove("loading");
  }
}
