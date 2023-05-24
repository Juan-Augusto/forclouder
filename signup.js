async function getUsers() {
  try {
    const response = await fetch(
      "https://forclouder-backend-prod.onrender.com/aluno",
      {
        method: "GET",
      }
    );
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const result = document.querySelector("#result");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = form.elements.email.value;
    const password = form.elements.password.value;
    await signUpUser(email, password);
  });
});

async function signUpUser(email, password) {
  let result = document.getElementById("submit-btn");
  let spinner = document.getElementById("loading-spinner");
  result.disabled = true;
  result.classList.add("loading");
  spinner.classList.remove("loading");
  try {
    const currentUsers = await getUsers();
    if (currentUsers.find((user) => user.email === email)) {
      window.alert("Email já cadastrado");
    } else {
      const response = await fetch(
        "https://forclouder-backend-prod.onrender.com/aluno",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      const data = await response.json();
      window.alert("Cadastro realizado com sucesso");
      window.location.href = "./home.html";
      result.disabled = false;
      result.classList.remove("loading");
      spinner.classList.add("loading");
    }
  } catch (err) {
    console.log(err);
    result.disabled = false;
    result.classList.remove("loading");
    spinner.classList.add("loading");
  }
}
