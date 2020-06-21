// Word shift is an app that optimizes a paragraph to lower character counts
const wordShift = {};

// init
wordShift.init = () => {
    wordShift.countUserInput();
    // wordShift.countText('userOutput','afterWord', 'afterChar');
}


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




//function that counts words and characters accepts a string
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

wordShift.charCount = (textInput) => {
    let input = document.getElementById(textInput).value;
    // to count characters, split the string by whitespacees and return length of joned substring
    const charCount = input.split(" ").join("").length;
    return charCount;
}

// document ready
document.addEventListener("DOMContentLoaded", () => {
    wordShift.init();
});