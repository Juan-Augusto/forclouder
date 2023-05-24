document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const result = document.querySelector("#result");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = form.elements.email.value;
    const password = form.elements.password.value;
    await authenticate(email, password);
  });
});

async function authenticate(email, password) {
  let result = document.getElementById("submit-btn");
  let spinner = document.getElementById("loading-spinner");
  result.disabled = true;
  result.classList.add("loading");
  spinner.classList.remove("loading");
  try {
    const response = await fetch(
      "https://forclouder-backend-prod.onrender.com/auth",
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
    console.log(data);
    if (data.erro) {
      window.alert(data.erro);
    } else {
      window.location.href = "./home.html";
    }
    result.disabled = false;
    result.classList.remove("loading");
    spinner.classList.add("loading");
  } catch (err) {
    console.log(err);
    window.alert(err.error);
    result.disabled = false;
    result.classList.remove("loading");
    spinner.classList.add("loading");
  }
}
