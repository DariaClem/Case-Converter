let upperCase = document.getElementById("upper-case");
let lowerCase = document.getElementById("lower-case");
let properCase = document.getElementById("proper-case");
let sentenceCase = document.getElementById("sentence-case");
let saveText = document.getElementById("save-text-file");
let copyText = document.getElementById("save-text-clipboard");

upperCase.addEventListener("click", function () {
    let textArea = document.querySelector("textarea");
    textArea.value = textArea.value.toUpperCase();
});

lowerCase.addEventListener("click", function () {
    let textArea = document.querySelector("textarea");
    textArea.value = textArea.value.toLowerCase();
});

function isPunctuationMark(character) {
    let punctuationMarks = ['.', '?', '!'];
    return punctuationMarks.indexOf(character) !== -1;

}

function isLetter(character) {
    return (character >= 'a' && character <= 'z') || (character >= 'A' && character <= 'Z');
}

properCase.addEventListener("click", function () {
    let textArea = document.querySelector("textarea");
    let text = textArea.value;
    let ok = true;
    for (let i = 0; i < text.length; i += 1) {
        if (isPunctuationMark(text[i])) {
            ok = true; /*We mark that we have encountered a punctuation mark.
            That will be useful if the user does not put a space between two sentences.*/
        } else if (i === 0 || (i > 0 && (text[i - 1] === ' ' || ok || text[i - 1] === '\n'))) {
            /*We make the letter uppercase only if it's the first character in the text or if the previous
            character was a punctuation mark or a space*/
            text = text.substring(0, i) + text[i].toUpperCase() + text.substring(i + 1, text.length);
            ok = false;
        } else {
            text = text.substring(0, i) + text[i].toLowerCase() + text.substring(i + 1, text.length);
            ok = false;
        }
    }
    textArea.value = text;

});

sentenceCase.addEventListener("click", function () {
    let textArea = document.querySelector("textarea");
    let text = textArea.value;
    let ok = true;
    for (let i = 0; i < text.length; i += 1) {
        if (isPunctuationMark(text[i])) {
            ok = true; /*We mark that we have encountered a punctuation mark.
            That will be useful if the user does not put a space between two sentences.*/
        } else if (isLetter(text[i]) && ok) {
            /*We make the letter uppercase only if it's the first character in the text or if the previous
            character was a punctuation mark*/
            text = text.substring(0, i) + text[i].toUpperCase() + text.substring(i + 1, text.length);
            ok = false;
        } else if (isLetter(text[i])) {
            text = text.substring(0, i) + text[i].toLowerCase() + text.substring(i + 1, text.length);
        }
    }
    textArea.value = text;
});

function download(filename, text) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

saveText.addEventListener("click", function () {
    let textArea = document.querySelector("textarea").value;
    download("text.txt", textArea);
});

copyText.addEventListener("click", function () {
    let textArea = document.querySelector("textarea").value;
    navigator.clipboard.writeText(textArea).then(function () {
        console.log("Success.");
    })
})
