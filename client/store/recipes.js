import axios from 'axios'

const GET_RECIPES = 'GET_RECIPES'

export const getRecipes = recipes => ({
  type: GET_RECIPES,
  recipes
})

export const recipesThunk = () => async dispatch => {
  try {
    const recipes = await axios.get('/api/recipe')
    dispatch(getRecipes(recipes.data))
  } catch (err) {
    console.error(err)
  }
}

const recipes = (state = [], action) => {
  switch (action.type) {
    case GET_RECIPES:
      const recipeToAdd = action.recipes.recipes
      const pantry = action.recipes.userPantry.pantryItems
      let result = []
      let ingredientsArr = []
      for (let i = 0; i < recipeToAdd.length; i++) {
        let len = recipeToAdd[i].ingredientsIncluded.filter(
          x => !pantry.includes(x.ingredientName)
        )
        if (len.length <= 2) {
          ingredientsArr.push(len)
          result.push(recipeToAdd[i])
        }
      }
      const obj = {result, ingredientsArr}
      return obj
    default:
      return state
  }
}

export default recipes
