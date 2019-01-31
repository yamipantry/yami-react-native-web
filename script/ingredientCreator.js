// OB/MS: there's a library called "chance.js" for generating random stuff

function randomInt(maximum) {
  return Math.floor(Math.random() * Math.floor(maximum))
}

// randomInt(x) therefore returns a number from the range 0 to (x-1)
// randomInt(4) returns one of 0, 1, 2, or 3.
// randomInt(26) returns one from 0 to 25.

const alphabet = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
]

function ingredientCreator() {
  const maxNumberOfIngredients = 1100

  let ingredients = []
  let result = ''

  for (let j = 0; j < maxNumberOfIngredients; j++) {
    let ingredientNameLength = randomInt(50) + 1 // (0 to 49) + 1; therefore, (1 to 50)

    for (let i = 0; i < ingredientNameLength; i++) {
      //each ingredient name is at least one char and at most 50 chars long
      const randomIndex = randomInt(26)
      const randomLetter = alphabet[randomIndex]
      result += randomLetter
    }
    ingredients.push(result)
    result = ''
  }

  return ingredients
}

module.exports = ingredientCreator
