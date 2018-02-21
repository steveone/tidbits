const {jsdom} = require('jsdom');



// extract text from an Element by selector.
const parseTextFromHTML = (htmlAsString, selector) => {
  const selectedElement = jsdom(htmlAsString).querySelector(selector);
  if (selectedElement !== null) {
    //remove white space and carriage returns
    return selectedElement.textContent.replace(/^\s+|\s+$/g, '');
  } else {
    throw new Error(`No element with selector ${selector} found in HTML string`);
  }
};

module.exports = {
  parseTextFromHTML
};
