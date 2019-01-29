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
      return action.recipes
    default:
      return state
  }
}

export default recipes
