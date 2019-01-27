import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {View, Text} from 'react-native'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = props => {
  console.log(props)
  const {email} = props
  const {pantry} = props || []
  return (
    <View>
      <Text h3="true">Welcome, {email}</Text>
      <ul>
        {pantry.map((elem, idx) => {
          return <li key={idx}>{elem}</li>
        })}
      </ul>
      <button>
        <Link to="/recipe">Recipes</Link>
      </button>
    </View>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    pantry: state.user.pantryItems
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
