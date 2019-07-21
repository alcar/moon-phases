import Kalendaryo from 'kalendaryo'
import React, { Component } from 'react'

import { getMoonPhase } from '../utils/moon'

import BasicCalendar from './BasicCalendar'
import MoonPhases from './MoonPhase'

import '../styles.css'
import { formatDate } from '../utils/dateTime'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentMoonPhase: undefined,
      moonPhaseByDay: {},
    }
  }

  componentDidMount() {
    this.updateState(new Date())
  }

  render() {
    const { currentMoonPhase } = this.state

    return (
      <div className="app">
        <h1 align="center">Moon phases @ New York</h1>
        <Kalendaryo
          onSelectedChange={this.updateState}
          render={BasicCalendar}
        />
        {currentMoonPhase && <MoonPhases phase={currentMoonPhase} />}
      </div>
    )
  }

  updateState = async selectedDate => {
    const { moonPhaseByDay } = this.state

    const moonPhaseKey = formatDate(selectedDate)

    if (moonPhaseByDay[moonPhaseKey]) {
      this.setState({
        currentMoonPhase: moonPhaseByDay[moonPhaseKey],
      })
    } else {
      const newMoonPhase = await getMoonPhase(selectedDate)

      this.setState(prevState => ({
        currentMoonPhase: newMoonPhase,
        moonPhaseByDay: {
          ...prevState.moonPhaseByDay,
          [moonPhaseKey]: newMoonPhase,
        },
      }))
    }
  }
}

export default App
