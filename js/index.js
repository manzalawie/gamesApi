"use strict";

async function getGames(cat) {
  const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${cat}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "4e005b816fmshfdcd63f6d40c80bp12ca25jsnfacc33383124",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    let data = JSON.parse(result);
    display(data);
  } catch (error) {
    document.getElementById("items").innerHTML = `<h1>Error loading page</h1>`;
  }

  document.getElementById("loader").classList.add("d-none");
  document.getElementById("body").classList.remove("d-none");
}

getGames("mmorpg");

function display(array) {
  let cartona = "";
  for (let i = 0; i < array.length; i++) {
    cartona += `<div class="col-md-3 mb-4" id="itemDetails" onclick="getDetails(${array[i].id})">
            <div data-id="${array[i].id}" class="card h-100 bg-transparent" role="button">
              <div class="card-body">
                <figure class="position-relative">
                  <img
                    class="card-img-top object-fit-cover h-100"
                    src="${array[i].thumbnail}"
                  />
                </figure>
                  <div class="hstack justify-content-between">
                    <h3 class="h6 small">${array[i].title}</h3>
                    <span class="badge text-bg-primary p-2">Free</span>
                  </div>
                  <p class="card-text small text-center opacity-50 text-white" id="short-desc">
                  ${array[i].short_description}  
                  </p>
              </div>
              <footer class="card-footer small hstack justify-content-between">
                <span class="badge badge-color">${array[i].genre}</span>
                <span class="badge badge-color">${array[i].platform}</span>
              </footer>
            </div>
          </div>`;
  }

  document.getElementById("items").innerHTML = cartona;
}

document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-item a");

  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove 'active' class from all nav items
      navItems.forEach((nav) => nav.classList.remove("active"));

      // Add 'active' class to the clicked nav item
      this.classList.add("active");
      getGames(this.id);
    });
  });
});
async function getDetails(id) {
  const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "4e005b816fmshfdcd63f6d40c80bp12ca25jsnfacc33383124",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    let gameDetails = JSON.parse(result);
    displayDetails(gameDetails);
  } catch (error) {
    console.error(error);
  }
}

function displayDetails(result) {
  let itemDetails = ` <header class="hstack justify-content-between">
          <h1 class="text-center h3 py-4">Details Game</h1>
          <button class="btn-close btn-close-white" id="btnClose"></button>
        </header>
        <div class="row g-4" id="detailsContent">
          <div class="col-md-4">
            <img
              src="${result.thumbnail}"
              class="w-100"
              alt="image details"
            />
          </div>
          <div class="col-md-8">
            <h3>Title: ${result.title}</h3>
            <p>Category: <span class="badge text-bg-info"> ${result.genre}</span></p>
            <p>Platform: <span class="badge text-bg-info"> ${result.platform}</span></p>
            <p>Status: <span class="badge text-bg-info"> ${result.status}</span></p>
            <p class="small">
             ${result.description}
            </p>
            <a
              class="btn btn-outline-warning"
              target="_blank"
              href="${result.game_url}"
              >Show Game</a
            >
          </div>
        </div>`;
  document.getElementById("item-details").innerHTML = itemDetails;

  document.querySelector(".details").classList.remove("d-none");
  document.querySelector(".all-games").classList.add("d-none");

  document.getElementById("btnClose").addEventListener("click", function () {
    document.querySelector(".details").classList.add("d-none");
    document.querySelector(".all-games").classList.remove("d-none");
  });
}
