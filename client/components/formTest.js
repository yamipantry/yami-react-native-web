import React, {Component} from 'react'
import Axios from 'axios'

class TestForm extends Component {
  constructor() {
    super()
    this.state = {
      suggestions: [],
      inForm: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  async handleChange(evt) {
    evt.preventDefault()
    let blah = evt.target.value
    await this.setState({
      inForm: blah
    })

    const sugg = await Axios.get(`/api/users/testSQL?name=${this.state.inForm}`)
    await this.setState({
      suggestions: sugg.data
    })
    console.log(this.state)
  }
  render() {
    return (
      <div>
        <form>
          <input
            value={this.state.inForm}
            type="text"
            name="inForm"
            onChange={this.handleChange}
          />
        </form>
        {this.state.suggestions.map(elem => {
          return <li key={elem.name}>{elem.name}</li>
        })}
      </div>
    )
  }
}
export default TestForm
