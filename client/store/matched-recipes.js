import axios from 'axios'

const GET_MATCHED = 'GET_MATCHED'

export const getMatched = matched => ({
  type: GET_MATCHED,
  matched
})

export const matchedThunk = () => async dispatch => {
  try {
    const recipes = await axios.get('/api/recipe')
    dispatch(getMatched(recipes.data))
  } catch (err) {
    console.error(err)
  }
}

const matched = (state = [], action) => {
  switch (action.type) {
    case GET_MATCHED:
      console.log('action', action.matched)
      return action.matched
    default:
      return state
  }
}

export default matched
