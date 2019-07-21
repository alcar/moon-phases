import PropTypes from 'prop-types'
import React from 'react'

import { MOON_IMAGES_URLS } from '../utils/consts'

const MoonPhases = ({ phase }) => (
  <figure className="moon-image-container">
    <figcaption>Moon phase: {phase}.</figcaption>
    <img
      alt={`The moon during the '${phase}' phase.`}
      className="moon-image"
      src={MOON_IMAGES_URLS[phase]}
    />
  </figure>
)

MoonPhases.propTypes = {
  phase: PropTypes.oneOf(Object.keys(MOON_IMAGES_URLS)).isRequired,
}

export default MoonPhases
