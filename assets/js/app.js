document.addEventListener("DOMContentLoaded", () => {
  // ▶️ MOVIES (flechas)
  const arrows = document.querySelectorAll(".arrow");
  const movieLists = document.querySelectorAll(".movie-list");

  arrows.forEach((arrow, i) => {
    const itemNumber = movieLists[i]?.querySelectorAll("img").length || 0;
    let clickCounter = 0;
    arrow.addEventListener("click", () => {
      const ratio = Math.floor(window.innerWidth / 270);
      clickCounter++;
      if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
        movieLists[i].style.transform = `translateX(${
          movieLists[i].computedStyleMap().get("transform")[0].x.value - 510
        }px)`;
      } else {
        movieLists[i].style.transform = "translateX(0)";
        clickCounter = 0;
      }
    });
  });

  // ▶️ TOGGLE
  const ball = document.querySelector(".toggle-ball");
  const items = document.querySelectorAll(
    ".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle"
  );
  if (ball) {
    ball.addEventListener("click", () => {
      items.forEach((item) => {
        item.classList.toggle("active");
      });
      ball.classList.toggle("active");
    });
  }

  // ▶️ SELECCIÓN DE CIUDAD EN ciudades.html
  const select = document.getElementById("card-ciudad-select");
  const boton = document.getElementById("card-button");
  const ciudadGuardada = localStorage.getItem("ciudadSeleccionada");

  if (select && ciudadGuardada) {
    select.value = ciudadGuardada;
  }

  if (select && boton) {
    boton.addEventListener("click", () => {
      const ciudad = select.value;
      if (!ciudad) {
        return alert("Por favor, selecciona una ciudad");
      }
      localStorage.setItem("ciudadSeleccionada", ciudad);
      window.location.href = "index.html";
    });
  }

  // ▶️ MENÚ DINÁMICO DE SALAS EN header
  const ciudad = ciudadGuardada || "Barranquilla";

  const multicinesPorCiudad = {
    Barranquilla: [
      "Multicine Buenavista",
      "Multicine Parque Alegra",
      "Multicine Nuestro Atlantico",
      "Multicine Plaza del Parque",
    ],
    Medellin: [
      "Multicine Santafé",
      "Multicine El Tesoro",
      "Multicine Jumbo La 65",
    ],
    Bogotá: [
      "Multicine Gran Estación",
      "Multicine San Rafael",
      "Multicine Plaza de las Américas",
    ],
    Cartagena: ["Multicine San Fernando"],
  };

  const salasMenu = document.getElementById("salas-menu");
  if (salasMenu) {
    salasMenu.innerHTML = "";

    (multicinesPorCiudad[ciudad] || []).forEach((nombre) => {
      const li = document.createElement("li");
      const a = document.createElement("a");

      const archivo = nombre
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]/g, "") + ".html";

      a.href = archivo;
      a.textContent = nombre;
      a.className = "dropdown-link";

      li.appendChild(a);
      salasMenu.appendChild(li);
    });
  }
});