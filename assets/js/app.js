document.addEventListener("DOMContentLoaded", () => {
  const arrows = document.querySelectorAll(".arrow");
  const wrappers = document.querySelectorAll(".movie-list-wrapper");

  arrows.forEach((arrow, i) => {
    const wrapper = wrappers[i];
    const list    = wrapper.querySelector(".movie-list");
    const item    = list.querySelector(".movie-list-item");
    const itemWidth = item.getBoundingClientRect().width + parseInt(getComputedStyle(list).gap || 0);

    arrow.addEventListener("click", () => {
      // Si llegamos al final, volvemos al inicio
      if (wrapper.scrollLeft + wrapper.clientWidth >= list.scrollWidth) {
        wrapper.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        // Avanzamos un ítem
        wrapper.scrollBy({ left: itemWidth, behavior: "smooth" });
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
  document.querySelectorAll('.movie-list-item').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.add('active');
  });

  const btn = card.querySelector('.btn-close');
  btn?.addEventListener('click', e => {
    e.stopPropagation();  // evita que también dispare el card
    card.classList.remove('active');
  });
});
});