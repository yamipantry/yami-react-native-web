// Recipes.turnToArray = function(object, id) {
//     const obj = object.split(', ')
//     let result = []
//     for (let i = 0; i < obj.length; i++) {
//       let newObj = {}
//       newObj.userId = id
//       newObj.amount = obj[i]
//         .split(' ')
//         .slice(0, 2)
//         .join(' ')
//       newObj.ingredientName = obj[i]
//         .split(' ')
//         .slice(2)
//         .join(' ')
//       newObj.ingredientName =
//         newObj.ingredientName.charAt(0).toUpperCase() +
//         newObj.ingredientName.slice(1)
//       result.push(newObj)
//     }
//     return result
//   }

function whatever(arr) {
  const obj = arr.split(', ')
  let result = []
  for (let i = 0; i < obj.length; i++) {
    let newObj = {}
    newObj.amount = obj[i]
      .split(' ')
      .slice(0, 2)
      .join(' ')
    newObj.ingredientName = obj[i]
      .split(' ')
      .slice(2)
      .join(' ')
    newObj.ingredientName =
      newObj.ingredientName.charAt(0).toUpperCase() +
      newObj.ingredientName.slice(1)
    result.push(newObj)
  }
  return result
}

module.exports = whatever
