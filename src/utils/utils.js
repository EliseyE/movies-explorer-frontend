
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

export {
  getArrayKeyWords,
  searchInArrayByProperties,
};
