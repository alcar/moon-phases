import React from 'react'

import { MOON_IMAGES_URLS } from '../utils/consts'

const MoonPhases = ({ phase }) => (
  <figure className="moon-image-container">
    <figcaption>Moon phase: {phase.toLowerCase()}.</figcaption>
    <img
      alt={`The moon during the '${phase.toLowerCase()}' phase.`}
      className="moon-image"
      src={MOON_IMAGES_URLS[phase]}
    />
  </figure>
)

export default MoonPhases
