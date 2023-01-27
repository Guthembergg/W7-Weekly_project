const asyncWait = async function (url, where) {
  try {
    let res = await fetch(url);
    if (res.ok) {
      let data = await res.json();
      const array = Object.values(data);
      const jarray = Object.values(array[0]);
      let div = document.getElementById(where);
      console.log(jarray);
      if (where === "favourite") {
        jarray.forEach((element) => {
          div.innerHTML += `


          <div class="card mb-3">
          <img class="card-img-top" src="${element.album.cover_xl}" alt="Card image cap">
          <div class="card-body text-center">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.album.title}</p>
            <p class="card-text">${element.artist.name}</p>
            <p class="card-text"><small class="text-muted">${element.duration} seconds</small></p>
          </div>
        </div>
        



        `;
        });
      } else if (where === "carousel") {
        jarray.forEach((item, index) => {
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
              </div>
            `;
          document.querySelector(".carousel-inner").appendChild(carouselItem);
        });
      } else {
        jarray.forEach((element) => {
          div.innerHTML += `
        <div class="card col-12 col-sm-5 col-lg-3 m-2 " id="${element.id}" >
        <img class="card-img-top" src="${element.album.cover_xl}" alt="Card image cap">
        <div class="card-body d-flex flex-column justify-content-end align-items-center">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.album.title}</p>
          <p class="card-text">${element.artist.name}</p>
          <p class="card-text">${element.duration} seconds</p>
       
        </div>
      </div>
        `;
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const firstParagraph = asyncWait(
  "https://striveschool-api.herokuapp.com/api/deezer/search?q=alice%20in%20chains%20jar%20of%20flies",
  "myDiv"
);

const secondParagraph = asyncWait(
  "https://striveschool-api.herokuapp.com/api/deezer/search?q=(III)%20crystal%20transgender",

  "favourite"
);

const thirdParagraph = asyncWait(
  "https://striveschool-api.herokuapp.com/api/deezer/search?q=pinkfloyd",

  "carousel"
);
