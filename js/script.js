// Word shift is an app that optimizes a paragraph to lower character counts
const wordShift = {};

// init
wordShift.init = () => {
    // function that gets number of words
    // function that gets number of characters
    wordShift.wordCharCount();
}

//function that counts words and characters
wordShift.wordCharCount = () => {
    document.getElementById('userInput').addEventListener('input', () => {
        let input = document.getElementById('userInput').value;
        console.log(input);
        // to count characters, split the string by whitespacees and return length of joned substring
        const charCount = input.split(" ").join("").length;
        // to count words, first remove the white spaces from both ends of string
        input.replace(/(^\s*)|(\s*$)/gi, "");
        // second reduces all multi spaces to a single space
        input.replace(/[ ]{2,}/gi, " ");
        // last remove indents on new paragraphs.
        input.replace(/\n /, "\n"); 
        const wordCount = input.length;

        console.log("words: ", wordCount);
        console.log("chars: ", charCount);
    });
}

// document ready
document.addEventListener("DOMContentLoaded", () => {
    wordShift.init();
});