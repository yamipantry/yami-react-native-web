const intersection = (arrA, arrB) => {
  const shared = []
  let idxA = 0
  let idxB = 0
  while (idxA < arrA.length && idxB < arrB.length) {
    const elemA = arrA[idxA]
    const elemB = arrB[idxB]
    if (elemA == elemB) {
      shared.push(elemA)
    }
    if (elemA <= elemB) {
      idxA++
    }
    if (elemA >= elemB) {
      idxB++
    }
  }
  return shared
}

const hash = ingr => {
  let list = ingr.sort((a, b) => {
    return a - b
  })
  let int = ingr.length // 5
  const yoyo = [int, ...list]
  const joined = yoyo.join('')
  const number = parseInt(joined, 10)
  return number
}

const filtering = (recipe, pantry) => {
  return recipe.filter(x => !pantry.includes(x))
}

module.exports = {intersection, hash, filtering}
