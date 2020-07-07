// Word shift is an app that optimizes a paragraph to lower character counts
const wordShift = {};

// init
wordShift.init = () => {
    wordShift.countUserInput();
    // wordShift.countText('userOutput','afterWord', 'afterChar');
    wordShift.optimize();
}

// function that counts the user text field
wordShift.countUserInput = () => {
    document.getElementById('userInput').addEventListener('input', () => {
        wordShift.countText('userInput','beforeWord', 'beforeChar');
    });
}

// function that counts and updates a specfic text (input/output of user text)
wordShift.countText = (textSource, wordOutput, charOutput) => {
    document.getElementById(wordOutput).innerHTML=`Words: ${wordShift.wordCount(textSource)}`;
    document.getElementById(charOutput).innerHTML=`Characters: ${wordShift.charCount(textSource)}`;
}

//function that counts and returns the number of words
wordShift.wordCount = (textInput) => {
    const input = document.getElementById(textInput).value;
    // To count words, trim the ends of the input,
    // then using regex split on one or more spaces and return length
    let wordCount = 0;
    // if string is = "" then number of words is 0 
    input.trim() === "" ?
        wordCount = 0:
        wordCount = input.trim().split(/\s+/).length;
    return wordCount
}

// function that counts and returns the number of characters
wordShift.charCount = (textInput) => {
    let input = document.getElementById(textInput).value;
    // to count characters, split the string by whitespacees and return length of joned substring
    const charCount = input.split(" ").join("").length;
    return charCount;
}

// function that takes a string and optimizes it for less characters
wordShift.optimize = () => {
    document.getElementById('optimize').addEventListener('click', () => {
    // get the string
    // break it into "words" anything that has spaces
    const paragraph = document.getElementById('userInput').value.trim().split(/\s+/);
    console.log(paragraph);
    
    // for each word if it is in the EDITABLE format:
    //  [a-z] (0 or 1 instance of "-") OR (0 or 1 instance of "'") followed by [a-z]
    // if its also greater than 3 characters
    // store that into an object in modifier array like so:
    //  { maybe attach the original word
    //      edit: true;
    //      wordList: [] list of words from thesauras api SORTED
    //      leftPunc: "(" example
    //      rightPunc: "." example
    // }
    //  if does not meet EDITABLE criteria then set edit to false in that array
    //  
    // once all api calls to get the wordLists have been done,
    // for each in editable array if edit !== true then begin a sentence string
    //  if edit === true stop and return a ptag with sentence string init
    //  THEN return a option with the first option as the lowest word and last is the original word
    
    });

wordShift.getNewWords = (word)=> {
    console.log("word to replace: " , word);

}
}

// document ready
document.addEventListener("DOMContentLoaded", () => {
    wordShift.init();
});