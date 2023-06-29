const NAVIGATION_ITEMS = {
  main: { link: '/', name: 'Главная'},
  movies: { link: '/movies', name: 'Фильмы'},
  savedMovies: { link: '/saved-movies', name: 'Сохранённые фильмы'},
  signup: { link: '/signup', name: 'Регистрация'},
  signin: { link: '/signin', name: 'Вход'},
};

const NAVIGATION_ITEMS_HEADER = [
  NAVIGATION_ITEMS.movies,
  NAVIGATION_ITEMS.savedMovies
];

const NAVIGATION_ITEMS_POPUP_MENU = [
  NAVIGATION_ITEMS.main,
  NAVIGATION_ITEMS.movies,
  NAVIGATION_ITEMS.savedMovies
];

// PROPERTY FOR SEARCHING
const PROPERTIES_FOR_SEARCHNG_ARRAY = ['nameRU'];

// API
// const MOVIES_EXPLORER_BASE_URL_API  = 'http://localhost:3001';
const MOVIES_EXPLORER_BASE_URL_API  = 'https://api.mexp.nomoredomains.rocks';
const BEATFILM_MOVIES_BASE_URL_API  = 'https://api.nomoreparties.co';

const MOVIES_GRID_LARGE = {
  maxInitial: 12,
  addQuantity: 3,
  breakPoint: 1216
};

const MOVIES_GRID_MEDIUM = {
  maxInitial: 8,
  addQuantity: 2,
  breakPoint: 686
};

const MOVIES_GRID_SMALL = {
  maxInitial: 5,
  addQuantity: 2,
  breakPoint: 686
};

const SHORT_MOVIES_DURATION = 40;

export {
  NAVIGATION_ITEMS,
  NAVIGATION_ITEMS_HEADER,
  NAVIGATION_ITEMS_POPUP_MENU,
  BEATFILM_MOVIES_BASE_URL_API,
  MOVIES_EXPLORER_BASE_URL_API,
  PROPERTIES_FOR_SEARCHNG_ARRAY,
  SHORT_MOVIES_DURATION,
  MOVIES_GRID_LARGE,
  MOVIES_GRID_MEDIUM,
  MOVIES_GRID_SMALL,
};
