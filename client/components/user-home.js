import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {View, Text} from 'react-native'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, pantryItem} = props

  return (
    <View>
      <Text h3>Welcome, {email}</Text>
      <ul>
        {pantryItem.map((elem, index) => {
          return <li key={index}>{elem}</li>
        })}
      </ul>
    </View>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    pantry: state.user.pantryItem
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
