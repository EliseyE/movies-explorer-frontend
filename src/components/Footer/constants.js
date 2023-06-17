const FOOTER_TITLE_TEXT = 'Учебный проект Яндекс.Практикум х BeatFilm.';
const FOOTER_LINK1_URL = 'https://practicum.yandex.ru/';
const FOOTER_LINK1_TEXT = 'Яндекс.Практикум';
const FOOTER_LINK2_URL = 'https://github.com/';
const FOOTER_LINK2_TEXT = 'Github';
const YEAR = 2023;
const CURRENT_YEAR = new Date().getFullYear();
const FOOTER_YEAR = CURRENT_YEAR === YEAR ? `${YEAR}` : `${YEAR}-${CURRENT_YEAR}`

export {
  FOOTER_TITLE_TEXT,
  FOOTER_LINK1_URL,
  FOOTER_LINK1_TEXT,
  FOOTER_LINK2_URL,
  FOOTER_LINK2_TEXT,
  FOOTER_YEAR
};

