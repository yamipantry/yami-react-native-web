import React from 'react'
import {View, Text, ListItem, Image} from 'react-native'
import {connect} from 'react-redux'
import {recipesThunk} from '../store'
import {filtering} from '../../util'

class RecipeMatch extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true
    }
  }

  async load() {
    if (!this.state.loading) {
      this.setState({loading: true})
    }
    await this.props.recipesThunk()
    this.setState({loading: false})
  }
  componentDidMount() {
    setTimeout(() => {
      this.load()
    }, 400)
  }

  render() {
    const {recipes} = this.props || [] // 3,1,4
    if (this.state.loading) {
      return (
        <View className="fun">
          <Text>Loading</Text>
        </View>
      )
    }
    return (
      <View>
        {recipes.map(recipe => {
          const ingList = recipe.ingredientsIncluded || []
          return (
            <View key={recipe.id}>
              <Text key={recipe.id}>{recipe.name}</Text>
              <img src={recipe.imageUrl} style={{width: 100, height: 100}} />
              <ul>
                {ingList.map((ing, idx) => {
                  return <li key={idx}>{ing.ingredientName}</li>
                })}
              </ul>
            </View>
          )
        })}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.recipes.result,
    pantry: state.user.pantryItems
  }
}
const mapDispatchToProps = {
  recipesThunk: recipesThunk
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeMatch)
