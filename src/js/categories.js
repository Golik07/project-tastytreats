import { fetchCategories } from './api/categories-api';
import { categorsCards } from './api/gallery-api';
import { render } from './renderCards';
import { callAllOftenedFunctions } from './callFunctions';

const listOfCategories = document.querySelector('.js-categories');
const btnAllCategories = document.querySelector('.js-btn-all-categories');
const listOfCards = document.querySelector('.list-of-cards');

let page = 1;
let limit = 6;
let selectedCategoryId = null;
let category = '';
const windowWidth = window.innerWidth;
let selectedElement = null;

btnAllCategories.addEventListener('click', handleResetCategory);
listOfCategories.addEventListener('click', handleSelectCategory);

function handleSelectCategory({ target }) {
  if (target.tagName !== 'LI') {
    return;
  }

  if (selectedElement) {
    selectedElement.style.color = '#0505054D';
  }

  listOfCards.innerHTML = '';
  target.style.color = '#9BB537';

  if (target.tagName === 'LI') {
    selectedCategoryId = target.dataset.id;
    category = target.dataset.name;
    selectedElement = target;

    if (windowWidth < 768) {
      categorsCards(category, page, limit)
        .then(({ results, totalPages }) => {
          callAllOftenedFunctions(results, totalPages, category, limit);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else if (windowWidth < 1280) {
      limit = 8;
      categorsCards(category, page, limit)
        .then(({ results, totalPages }) => {
          callAllOftenedFunctions(results, totalPages, category, limit);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      limit = 9;
      categorsCards(category, page, limit)
        .then(({ results, totalPages }) => {
          callAllOftenedFunctions(results, totalPages, category, limit);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }
}

function handleResetCategory() {
  listOfCards.innerHTML = '';
  selectedCategoryId = null;
  render();
}

const createMarkupOfCategories = arr => {
  return arr
    .map(
      ({ _id, name }) => `
  <li data-id="${_id}" data-name="${name}" class="categories-item">${name}</></li>`
    )
    .join('');
};

const fetchAllCategories = () => {
  fetchCategories()
    .then(({ data }) => {
      listOfCategories.insertAdjacentHTML(
        'beforeend',
        createMarkupOfCategories(data)
      );
    })
    .catch(error => {
      console.log(error.message);
    });
};

fetchAllCategories();
