import {throttle} from "lodash";
import Notiflix from 'notiflix';
import axios from 'axios';

const DELAY = 1000;
const API_KEY = "33266865-f80f9d7d450116be71a3c9bed";
const searchBarInput = document.querySelector("input");
const searchBarButton = document.querySelector("button");
const galleryBlock = document.querySelector(".gallery");
const loadingButton = document.querySelector(".load-more");
const PER_PAGE = 40;
let page = 1;
let urlComponent = '';
loadingButton.style.display = "none";

async function handleClick(event) {
  event.preventDefault();
  urlComponent = searchBarInput.value;
  while (galleryBlock.firstChild) {
    galleryBlock.removeChild(galleryBlock.firstChild);
  }
  const URL = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + urlComponent + "&orientation=horizontal&safesearch=true" + "&per_page=" + PER_PAGE + "&page=" + page;
  try {
    const response = await axios.get(URL);
    const posts = response.data;
    if (!posts.hits.length) {
      return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    } else {
      for (let i = 0; i < posts.hits.length; i++) {
        if (posts.hits[i].type === "photo") {
          console.log(posts.hits[i]);
          const galleryObject = document.createElement('div');
          galleryObject.classList.add("photo-card");
          galleryObject.innerHTML = `

  <div class="info-photo">
    <img src="${posts.hits[i].webformatURL}" alt="${posts.hits[i].tags}" class="photo-preview" loading="lazy"/>
  </div>
  <div class="info">
    <p class="info-item">
      <b>Likes</b><br>${posts.hits[i].likes}</b>
    </p>
    <p class="info-item">
      <b>Views</b><br>${posts.hits[i].views}</b>
    </p>
    <p class="info-item">
      <b>Comments</b><br> ${posts.hits[i].comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads</b><br>  ${posts.hits[i].downloads}</b>
    </p>
  </div>`
          galleryBlock.append(galleryObject);
        }
      }
    }
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
  }
  loadingButton.style.display = "block";
}

searchBarButton.addEventListener("click", throttle(handleClick, DELAY));

loadingButton.addEventListener("click", throttle(async (event) => {
  event.preventDefault();
  page += 1;
  const URL = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + urlComponent + "&orientation=horizontal&safesearch=true" + "&per_page=" + PER_PAGE + "&page=" + page;
  try {
    const response = await axios.get(URL);
    const posts = response.data;
    if (!posts.hits.length) {
      return Notiflix.Notify.failure("Sorry, there are no more images matching your search query.");
    } else {
      for (let i = 0; i < posts.hits.length; i++) {
        if (posts.hits[i].type === "photo") {
          const galleryObject = document.createElement('div');
          galleryObject.classList.add("photo-card");
          galleryObject.innerHTML = `

  <div class="info-photo">
    <img src="${posts.hits[i].webformatURL}" alt="${posts.hits[i].tags}" class="photo-preview" loading="lazy"/>
  </div>
  <div class="info">
    <p class="info-item">
      <b>Likes</b><br>${posts.hits[i].likes}</b>
    </p>
    <p class="info-item">
      <b>Views</b><br>${posts.hits[i].views}</b>
    </p>
    <p class="info-item">
      <b>Comments</b><br> ${posts.hits[i].comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads</b><br>  ${posts.hits[i].downloads}</b>
    </p>
  </div>`
          galleryBlock.append(galleryObject);
        }
      }
    }
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure("Sorry, there are no more images matching your search query.");
  }
}, DELAY));