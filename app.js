// let form = document.querySelector("#form");
// genresel =document.querySelector('#genresel')
// form.addEventListener("submit", evt =>{
//     evt.preventDefault();
//     let {search, All,az   } = evt.target.elements
//     console.log(search.value, All.value, az.value);
// })

// function rgenre(array, element){
//     let genrearr =[];
//     array.forEach((film) => {
// film.genres.forEach(genre =>{
//     !genrearr.includes(genre) ? genrearr.push(genre) : null;
// })
//     });
//     // console.log(genrearr);
//     genrearr.forEach(genre=> {
//         let opt =document.createElement('option')
//         opt.textContent = genre
//         opt.value = genre;
//         element.append(opt)
//     });
// }
// rgenre(films, genresel);

let elForm = select("#form");
let elGenreSelect = select("#genreSelect");
let elList = select("#list");
let cardTemplate = select("#card-template").content;
let modalTemplate = select("#modal-template").content;

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let { search, genre, sortBy } = evt.target.elements;

  let regex = new RegExp(search.value.trim(), "gi");

  let searchedFilms = films.filter((film) => film.Title.match(regex));
  console.log(searchedFilms);
  if (genre.value != "all") {
    let filteredByGenre = searchedFilms.filter((film) =>
      film.genres.includes(genre.value)
    );
    searchedFilms = filteredByGenre;
  }

  if (sortBy.value == "a-z") {
    searchedFilms.sort((a, b) => {
      if (a.Title > b.Title) {
        return 1;
      } else if (a.Title < b.Title) {
        return -1;
      } else {
        return 0;
      }
    });
  } else if (sortBy.value == "z-a") {
    searchedFilms.sort((a, b) => {
      if (b.Title > a.Title) {
        return 1;
      } else if (b.Title < a.Title) {
        return -1;
      } else {
        return 0;
      }
    });
  }
  renderFunc(searchedFilms, elList);
});

function renderGenre(array, element) {
  let genereArr = [];

  array.forEach((film) => {
    film.genres.forEach((genre) => {
      !genereArr.includes(genre) ? genereArr.push(genre) : null;
    });
  });

  genereArr.forEach((genre) => {
    let newOption = create("Option");
    newOption.textContent = genre;
    newOption.value = genre;

    element.append(newOption);
  });
}
renderGenre(films, elGenreSelect);

function renderFunc(array, element) {
  element.innerHTML = null;
  array.forEach((film) => {
    let cloneTemplate = cardTemplate.cloneNode(true);

    let li = select("li", cloneTemplate);
    let img = select("img", cloneTemplate);
    let h2 = select("h2", cloneTemplate);
    let btn = select("button", cloneTemplate);

    img.src = film.Poster;
    h2.textContent = film.Title;
    btn.dataset.id = film.id;

    btn.addEventListener("click", (evt) => {
      let filmId = evt.target.dataset.id;
      let cloneTemplateModal = modalTemplate.cloneNode(true);

      let foundFilm = array.find((item) => item.id == filmId);

      let modal = select("#modal", cloneTemplateModal);
      let iframe = select("iframe", cloneTemplateModal);
      let h2 = select("h2", cloneTemplateModal);
      let h3 = select("h3", cloneTemplateModal);
      let p = select("p", cloneTemplateModal);

      iframe.src = foundFilm.link;
      h2.textContent = foundFilm.Title;
      h3.textContent = `Genres: ${foundFilm.genres.join(", ")}`;
      p.textContent = foundFilm.overview;

      document.querySelector("body").append(modal);
    });

    element.append(li);
  });
}
renderFunc(films, elList);

function deleteModal() {
  const elModal = document.getElementById("modal");
  elModal.remove();
}