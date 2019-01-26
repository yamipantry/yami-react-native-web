import React from 'react'
import {View, Text, ListItem} from 'react-native'
import {connect} from 'react-redux'
import {matchedThunk} from '../store'

class RecipeMatch extends React.Component {
  constructor() {
    super()
  }
  async componentDidMount() {
    await this.props.matchThunk()
  }
  render() {
    const {matched} = this.props || [] // 3,1,4
    return (
      <View>
        {matched.map(elem => {
          return (
            <ul key={elem.recipe.id}>
              <li>{elem.recipe.name}</li>
              <img src={elem.recipe.imageUrl} />
              <li>{elem.recipe.description}</li>
              {elem.recipe.instructions.map((ins, idx) => {
                return (
                  <ul key={idx}>
                    <li>{ins}</li>
                  </ul>
                )
              })}
            </ul>
          )
        })}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    matched: state.matched
  }
}
const mapDispatchToProps = {
  matchThunk: matchedThunk
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeMatch)
