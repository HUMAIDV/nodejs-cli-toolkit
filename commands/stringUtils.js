function uppercase(text){
    return text.toUpperCase()
}

function wordCount(text) {
    const trimmedText = text.trim()
    if (!trimmedText) {
        return 0;
    }
    return trimmedText.split(/\s+/).length;
}

function isPalindrome(text) {
    const cleanedText = text.toLowerCase().replace(/[^a-z0-9]/g,"")
    return cleanedText === cleanedText.split("").reverse().join("");
}

module.exports = {
    uppercase, wordCount, isPalindrome
}