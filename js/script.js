// Word shift is an app that optimizes a paragraph to lower character counts
const wordShift = {};

// init
wordShift.init = () => {
  wordShift.countUserInput();
  // wordShift.countText('userOutput','afterWord', 'afterChar');
  wordShift.optimize();
};

// function that counts the user text field
wordShift.countUserInput = () => {
  document.getElementById("userInput").addEventListener("input", () => {
    wordShift.countText("userInput", "beforeWord", "beforeChar");
  });
};

// function that counts and updates a specfic text (input/output of user text)
wordShift.countText = (textSource, wordOutput, charOutput) => {
  document.getElementById(wordOutput).innerHTML = `Words: ${wordShift.wordCount(
    textSource
  )}`;
  document.getElementById(
    charOutput
  ).innerHTML = `Characters: ${wordShift.charCount(textSource)}`;
};

//function that counts and returns the number of words
wordShift.wordCount = (textInput) => {
  const input = document.getElementById(textInput).value;
  // To count words, trim the ends of the input,
  // then using regex split on one or more spaces and return length
  let wordCount = 0;
  // if string is = "" then number of words is 0
  input.trim() === ""
    ? (wordCount = 0)
    : (wordCount = input.trim().split(/\s+/).length);
  return wordCount;
};

// function that counts and returns the number of characters
wordShift.charCount = (textInput) => {
  let input = document.getElementById(textInput).value;
  // to count characters, split the string by whitespacees and return length of joned substring
  const charCount = input.split(" ").join("").length;
  return charCount;
};

// function that takes a string and optimizes it for less characters
wordShift.optimize = () => {
  document.getElementById("optimize").addEventListener("click", () => {
    // get the string
    // break it into "words" anything that has spaces
    const paragraph = document
      .getElementById("userInput")
      .value.trim()
      .split(/\s+/);
    const pattern = /[A-Za-z]+[-]?\'?[A-Za-z]+/;

    // creates a new array "editable" that stores all words and their special info
    wordShift.editable = paragraph.map((word) => {
      // for each word if it is in the EDITABLE format:
      //  [a-z] (0 or 1 instance of "-") OR (0 or 1 instance of "'") followed by [a-z]
      // if its also greater than 3 characters
      // console.log(word, word.length > 3 && pattern.test(word));
      let editObj = {};
      const brokenDownWord = wordShift.breakDown(word);
      if (brokenDownWord[1].length > 3 && pattern.test(word)) {
          
        editObj = {
          edit: true,
          word: word,
          leftPunc: brokenDownWord[0],
          cleanWord: brokenDownWord[1],
          rightPunc: brokenDownWord[2]
        };
      } else {
        editObj = {
          edit: false,
          word: word,
        };
      }
      return editObj;
    });

    // create an array of promises each holding the potential wordList for a specfic word at a index
    let promiseArray = [];
    for(let i = 0; i<wordShift.editable.length; i++){
      if(wordShift.editable[i].edit === true) {
        
        promiseArray.push(wordShift.getNewWords(i, wordShift.editable[i].cleanWord));
      }
    }

    Promise.all(promiseArray).then( (response) => {
      response.map((wordListResponse) => {
        // this returns a wordList response array where the first value is the 
        // specfic index of the word that wordList belongs to
        const wordindex = wordListResponse[0];
        // if the wordlist has more then one word, then add the original
        // if (wordListResponse[0] > 0) {
          // wordListResponse[1].push(wordShift.editable[wordindex].cleanWord);
        // }
        
        wordShift.editable[wordindex].wordList = wordListResponse[1].sort(
          (a, b) => a.word.length - b.word.length
        );
      })
      wordShift.displayNewParagraph();
    });

    console.log(wordShift.editable);

    // store that into an object in modifier array like so:
    //  { maybe attach the original word
    //      edit: true;
    //      wordList: [] list of words from thesauras api SORTED
    //      leftPunc: "leftparentheis" example
    //      rightPunc: "." example
    // }
    //  if does not meet EDITABLE criteria then set edit to false in that array
    //

    // for each word clean it by removing the special characters

    // once all api calls to get the wordLists have been done,
    // for each in editable array if edit !== true then begin a sentence string
    //  if edit === true check if it has a wordList of length > 0
    // if it does then stop and return a ptag with sentence string init
    //  THEN return a option with the first option as the lowest word and last is the original word
      
})}; // Optimize end

  // this function breaks a word down into three components to seperate any potential puncuation marks that might be present in order to make a api call with the word with no puncuation
  wordShift.breakDown = (word) => {
    // test for nonLetters (puncuation marks)
    const pattern = /[^a-zA-Z]/;
    let leftPunc,
      rightPunc,
      cleanWord = "";
    // LEFT PUNC TEST
    // if the first character is an alphabetic letter then there is no left puncuation
    if (pattern.test(word.charAt(0)) === false) {
      // console.log(`word: ${word} no left Punc`);
      leftPunc = "";
      cleanWord = word;
    } else {
      //So the first character IS a puncuation mark
      for (let i = 1; i < word.length; i++) {
        // if ther is punctuation go until there is no puncuation, and then store left punc
        // we start at 1 since we know 0 is already a puncuation
        if (pattern.test(word.charAt(i)) === false) {
          leftPunc = word.slice(0, i);
          cleanWord = word.slice(i);
          // console.log(`word: ${word} has left Punc until ${i}. cleanWord: ${cleanWord}`);
          break;
        }
      }
    }

    // RIGHT PUNC TEST
    // if the last character is not an alphabetic letter then there is no right puncuation
    if (pattern.test(cleanWord.charAt(cleanWord.length - 1)) === false) {
      rightPunc = "";
      // console.log(`word: ${word} no right Punc`);
    } else {
      //So the last character IS a puncuation mark start -2 because last is already a puncuation
      for (let i = cleanWord.length - 2; i > 0; i--) {
        // if ther is punctuation go until there is no puncuation, and then store right punc
        if (pattern.test(cleanWord.charAt(i)) === false) {
          // console.log(cleanWord.charAt(i));
          rightPunc = cleanWord.slice(i + 1);
          cleanWord = cleanWord.slice(0, i + 1);
          // console.log(`word: ${word} has right Punc until ${i}. cleanWord: ${cleanWord}`);
          break;
        }
      }
    }
    const brokenDownWord = [leftPunc, cleanWord, rightPunc];
    return brokenDownWord;
  };

  // theis function calls the datamuse api and returns an array of synonyms of the word requested
  wordShift.getNewWords = async (index, word) => {
    try {
      let synArr = [];
      const synonymResponse = await fetch(
        `https://api.datamuse.com/words?rel_syn=${word}`
      );
      const jsonResponse = await synonymResponse.json();
      // return the index and the jsonResponse
      return [index, jsonResponse];
    } catch (err) {
      console.log(err);
    }
  };

  wordShift.displayNewParagraph = () => {
    let paragraph ="";
    wordShift.editable.map((editObj) => {
      if (editObj.edit === false) {
        paragraph = paragraph + " " + editObj.word;
      } else {
        let newWord = "";
        console.log("last word",editObj);
        // console.log("last word1", editObj["wordList"]);
        // console.log("last word2", editObj.wordList);
        console.log(Object.keys(editObj).length);
        editObj.wordList.length === 0 ?
          newWord = editObj.word :
          newWord = editObj.leftPunc + editObj.wordList[0].word + editObj.rightPunc;
          paragraph = paragraph + " " + newWord;
        
      }
    });
    console.log(paragraph);
  };


// document ready
document.addEventListener("DOMContentLoaded", () => {
  wordShift.init();
});
