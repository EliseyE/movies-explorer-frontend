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

export {
  NAVIGATION_ITEMS,
  NAVIGATION_ITEMS_HEADER,
  NAVIGATION_ITEMS_POPUP_MENU,
};
