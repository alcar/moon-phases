import classes from 'classnames'
import { isToday, isSameMonth } from 'date-fns'
import React from 'react'

const BasicCalendar = kalendaryo => {
  const {
    date,
    getDayLabelsInWeek,
    getFormattedDate,
    getWeeksInMonth,
    selectedDate,
    setDateNextMonth,
    setDatePrevMonth,
    setSelectedDate,
  } = kalendaryo

  const currentDate = getFormattedDate('MMMM YYYY')
  const selectDay = date => () => setSelectedDate(date)
  const weeksInCurrentMonth = getWeeksInMonth()
  const dayLabels = getDayLabelsInWeek()

  const isSelectedDay = date =>
    getFormattedDate(selectedDate) === getFormattedDate(date)
  const isDisabled = dateValue => !isSameMonth(date, dateValue)

  return (
    <div className="my-calendar">
      <div className="my-calendar-header">
        <button onClick={setDatePrevMonth}>&larr;</button>
        <span>{currentDate}</span>
        <button onClick={setDateNextMonth}>&rarr;</button>
      </div>
      <div className="my-calendar-body">
        <div className="week day-labels">
          {dayLabels.map(label => (
            <div className="day" key={label}>
              {label}
            </div>
          ))}
        </div>
        {weeksInCurrentMonth.map((week, i) => (
          <div className="week" key={i}>
            {week.map(day => (
              <div
                key={day.label}
                disabled={isDisabled(day.dateValue)}
                onClick={
                  isDisabled(day.dateValue) ? null : selectDay(day.dateValue)
                }
                className={classes('day', {
                  'is-selected': isSelectedDay(day.dateValue),
                  'is-today': isToday(day.dateValue),
                })}
              >
                {day.label}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default BasicCalendar
