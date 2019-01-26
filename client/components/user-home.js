import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {View, Text} from 'react-native'

/**
 * COMPONENT
 */
export const UserHome = props => {
  console.log(props)
  const {email} = props
  const {pantry} = props || []
  return (
    <View>
      <Text h3>Welcome, {email}</Text>
      <ul>
        {pantry.map(elem => {
          return <li key={elem.id}>{elem.name}</li>
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
    pantry: state.user.pantryNames
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
