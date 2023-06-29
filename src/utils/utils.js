
function getArrayKeyWords(searchQuery) {
  let searchQueryNew = searchQuery.toLowerCase();
  searchQueryNew = searchQueryNew.replace(/[.,:;^*'"()%<>!?\/\\\-]/g, '');
  searchQueryNew = searchQueryNew.split(' ');
  return searchQueryNew;
};

function searchInArrayByProperties(propertiesArray, arraySearchingSpace, keyWordsArray) {

  const seachigArea = [...arraySearchingSpace];

  let foundArray= [];
  seachigArea.forEach((item) => {

    let itemWithProperties = [];
    propertiesArray.forEach((property) => {
      itemWithProperties = [...itemWithProperties, item[property]]
    });

    const searchigAreaString = itemWithProperties.join(' ').toLowerCase();

    let matchСounter = 0;
    keyWordsArray.forEach((keyWord) => {
      if(searchigAreaString.includes(keyWord))
        matchСounter++;
      });

    if(matchСounter === keyWordsArray.length)
      foundArray = [...foundArray, item];
  });

  return foundArray;
};

function debounce(callee, timeoutMs) {
  return function perform(...args) {
    let previousCall = this.lastCall;
    this.lastCall = Date.now();

    if (previousCall && this.lastCall - previousCall <= timeoutMs) {
      clearTimeout(this.lastCallTimer);
    };

    this.lastCallTimer = setTimeout(() => callee(...args), timeoutMs);
  };
};

// LOCALSTORAGE FUNCTIONS
  // PUT ITEM INTO LOCALSTORAGE AS JSON
  function putItemIntoLocalstorageJson(arrayKeyItem, item) {
    localStorage.setItem(`${arrayKeyItem}`, JSON.stringify(item));
  };

  // GET ITEM FROM LOCALSTORAGE JSON
  function getItemFromLocalstorageJson(arrayKeyItem) {
    const item = JSON.parse(localStorage.getItem(`${arrayKeyItem}`));
    return item;
  };

  // PUT STRING INTO LOCALSTORAGE
    function putStringIntoLocalstorage(key, string) {
      localStorage.setItem(`${key}`, `${string}`);
    };

  // GET STRING FROM LOCALSTORAGE
    function getStringFromLocalstorage(key) {
      const string = localStorage.getItem(`${key}`);
      return string;
    };

export {
  getArrayKeyWords,
  searchInArrayByProperties,
  debounce,
  putItemIntoLocalstorageJson,
  getItemFromLocalstorageJson,
  putStringIntoLocalstorage,
  getStringFromLocalstorage,
};
