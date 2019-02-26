import Kalendaryo from 'kalendaryo'
import React, { Component } from 'react'

import { getMoonApiConfig, getMoonPhases } from '../utils/moon'

import BasicCalendar from './BasicCalendar'
import MoonPhases from './MoonPhase'

import '../styles.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentMoonPhase: undefined,
      moonPhasesByMonth: {},
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

  getMoonPhasesKey(month, year) {
    return `${year}-${month}`
  }

  updateState = async selectedDate => {
    const { moonPhasesByMonth } = this.state

    const selectedYear = selectedDate.getFullYear()
    const selectedMonth = selectedDate.getMonth() + 1
    const selectedDay = selectedDate.getDate()

    const monthKey = this.getMoonPhasesKey(selectedMonth, selectedYear)

    if (
      moonPhasesByMonth[selectedMonth] &&
      moonPhasesByMonth[selectedMonth].length > 0
    ) {
      this.setState({
        currentMoonPhase: moonPhasesByMonth[monthKey][selectedDay - 1],
      })
    } else {
      const newMoonPhases = await getMoonPhases(getMoonApiConfig(selectedDate))

      this.setState(prevState => ({
        currentMoonPhase: newMoonPhases[selectedDay - 1],
        moonPhasesByMonth: {
          ...prevState.moonPhasesByMonth,
          [monthKey]: newMoonPhases,
        },
      }))
    }
  }
}

export default App
