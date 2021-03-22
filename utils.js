function genArray(low, high) {
    const newArray = []
    for(let num = low; num <= high; num++ ) {
        let newChar = String.fromCharCode(num)
        newArray.push(newChar);
    }
    return newArray;
}

// get the ascii array for the characters allowed
const characters = genArray(65, 90).concat(genArray(97, 122)).concat(genArray(48,57)).concat([45,95]);

function getRandomName() {
    // generate random name
    const nameArray = [];
    const n = 6 + Math.ceil(Math.random() * 4);
    for(var i = 0; i < n; i++) {
        nameArray.push(characters[Math.floor(Math.random() * characters.length)]);
    }

    return nameArray.join('');
}

module.exports = {
    characters,
    getRandomName
}