const checkPalindrome = (str) => {
    const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

    let newStr = "";

    for (let i = cleanedStr.length - 1; i >= 0; i--) {
        newStr += cleanedStr[i];
    }

    if (cleanedStr === newStr) {
        console.log(`${str} is a palindrome.`);
        return true;
    } else {
        console.log(`${str} is not a palindrome.`);
        return false;
    }
}

const str = "My nameis Bonheur";
checkPalindrome(str);

const palindromeStr = "A man, a plan, a canal, Panama";
checkPalindrome(palindromeStr);