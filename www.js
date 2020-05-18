function prepareText(pageObj, ...words) {
  
  // Object.keys(pageObj).forEach((word) => {
  //   Object.keys(words).forEach((key) => {
  //     if (pageObj[word].indexOf(key) !== -1) {
  //       console.log(word, key);
  //       pageObj[word] = pageObj[word].replace(key, words[key]);
  //     }
  //   });
  // });

  return pageObj;
}

let textObj = {
  h1: "OK",
};

let pageObj = {
  h1: "Currency currency_code",
  language: "ru",
};

let words = {
  currency_code: "RUB",
  currency_code_to: "USD",
};

console.log(prepareText(pageObj, {currency_code: 'RUB'}));
