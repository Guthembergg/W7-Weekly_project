var array1 = [];
var c = 0;
const asyncWait = async function (url, where) {
  try {
    let res = await fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/search?q=${url}`
    );
    if (res.ok) {
      let data = await res.json();
      const array = Object.values(data);
      const jarray = Object.values(array[0]);
      let div = document.getElementById(where);
      console.log(jarray);
      if (where === "favourite") {
        jarray.forEach((element) => {
          array1.push(element);
          div.innerHTML += `


          <div class="card my-5 col-8">
          <img class="card-img-top" src="${element.album.cover_xl}" alt="Card image cap">
          <div class="card-body text-center">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.album.title}</p>
            <p class="card-text">${element.artist.name}</p>
            <p class="card-text"><small class="text-muted">${element.duration} seconds</small></p>
            <audio controls>
            <source src="${element.preview}" type="audio/mpeg">
Your browser does not support the audio element.
</audio>
          </div>
        </div>
        



        `;
        });
      } else if (where === "carousel") {
        jarray.forEach((item, index) => {
          array1.push(item);

          // Add items from the JSON file
          const carouselItem = document.createElement("div");
          carouselItem.classList.add("carousel-item");
          if (index === 0) {
            carouselItem.classList.add("active");
          }
          carouselItem.innerHTML = `
              <img src="${item.album.cover_xl}" class="d-block w-100" alt="...">
              <div class="carousel-caption d-none d-md-block">
                <h5>${item.title}</h5>
                <p>${item.album.title}</p>
                <audio controls>
                <source src="${item.preview}" type="audio/mpeg">
    Your browser does not support the audio element.
    </audio>
                
              </div>
            `;
          document.querySelector(".carousel-inner").appendChild(carouselItem);
        });
      } else {
        jarray.forEach((element) => {
          array1.push(element);

          div.innerHTML += `
        <div class="card col-10 col-sm-6 col-md-5 col-lg-4 col-xl-3 m-2 " id="${element.id}" >
        <img class="card-img-top" src="${element.album.cover_xl}" alt="Card image cap">
        <div class="card-body d-flex flex-column justify-content-end align-items-center">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.album.title}</p>
          <p class="card-text">${element.artist.name}</p>
          <p class="card-text">${element.duration} seconds</p>
          <audio controls>
  <source src="${element.preview}" type="audio/mpeg">
Your browser does not support the audio element.
</audio>
       
        </div>
      </div>
        `;
        });
      }

      function shuffle() {
        array1.sort((a, b) => a.rank - b.rank);
        let alertDiv = document.getElementById("alertDiv");

        if (c === 0) {
          alertDiv.classList.remove("d-none");
          array1.forEach((element, index) => {
            let newAlert = document.createElement("div");
            newAlert.classList.add("alert");
            newAlert.role = "alert";

            alertDiv.appendChild(newAlert);
            newAlert.innerHTML = `${index + 1}: ${element.artist.name} - ${
              element.title
            }- Rank: ${element.rank}`;
          });
          c++;
          // alert(JSON.stringify(array1));
        } else {
          alertDiv.classList.toggle("d-none");
        }
      }
      let d = 0;
      function modalFunction() {
        let modalDiv = document.getElementById("modalBody");
        if (d === 0) {
          array1.forEach((element) => {
            modalDiv.innerHTML += `${element.title}: ${element.album.title} </br>`;
          });
          d++;
        }
      }

      let shuffleButton = document.getElementById("shuffleMe");
      shuffleButton.onclick = shuffle;
      let modalButton = document.getElementById("modalButton");
      modalButton.onclick = modalFunction;
    }
  } catch (err) {
    console.log(err);
  }
};

const firstParagraph = asyncWait(
  "alice%20in%20chains%20jar%20of%20flies",
  "myDiv"
);

const secondParagraph = asyncWait(
  "(III)%20crystal%20transgender",

  "favourite"
);

const thirdParagraph = asyncWait(
  "pinkfloyd",

  "carousel"
);
console.log(array1);

let inputField = document.getElementById("searchInput");
let buttonSearch = document.getElementById("mySearch");

function search() {
  if (inputField.value) {
    let searchDiv = document.getElementById("searchDiv");
    searchDiv.innerHTML = "";
    const fourthParagraph = asyncWait(inputField.value, "searchDiv");
    let searchContainer = document.getElementById("searchContainer");
    searchContainer.classList.remove("d-none");
  }
}
function hide() {
  searchContainer.classList.add("d-none");
}

buttonSearch.addEventListener("click", search);
let hideButton = document.getElementById("hideButton");
hideButton.addEventListener("click", hide);
