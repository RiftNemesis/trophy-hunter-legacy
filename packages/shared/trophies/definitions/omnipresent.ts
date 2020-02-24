import { ARAM } from '../types';

import SCORES from '../scores';

const omnipresent = {
  name: 'omnipresent',
  title: 'Omnipresent',
  description: 'Be involved in more than 80% of your teams kills.(ARAM: 90%).',
  svgPath:
    'M18 18v15.797L179.434 215.41l9.484-16.424L28.04 18H18zm77.705 0l96.95 174.512 10.493-18.176L116.295 18h-20.59zm91.154 0c4.326 19.018 15.27 67.152 28.36 125.326.557 2.482 1.074 4.807 1.63 7.278l13.275-22.993C219.105 78.687 209.9 38.14 205.32 18h-18.46zM247 18v80.383l9-15.588 7.795 13.5L265 98.383V18h-18zm59.78 0l-24.51 110.297 13.314 23.058L325.22 18h-18.44zm88.925 0l-86.853 156.336 10.494 18.176L416.296 18h-20.59zm88.254 0L323.083 198.986l9.482 16.424L494 33.797V18h-10.04zM18 98.25v22.5l150.79 113.094 9.067-15.7L18 98.25zm476 0L334.145 218.143l9.064 15.7L494 120.75v-22.5zm-238 20.547l-74.656 129.308c20.297-9.102 46.254-14.35 74.656-14.35 28.402 0 54.36 5.248 74.656 14.35L256 118.797zm-238 70.34v19.226l136.05 51.018 9.122-15.804L18 189.136zm476 0l-145.172 54.44 9.123 15.804L494 208.364v-19.226zM18 249.18v18.14l122.615 15.326 9.77-16.92L18 249.18zm476 0l-132.383 16.547 9.768 16.92L494 267.32v-18.14zm-238 2.576c-14.737 0-26.49 11.75-26.49 26.488 0 8.536 3.948 16.065 10.13 20.895a28.09 28.09 0 0 1-1.384-8.603 28.09 28.09 0 0 1 28.09-28.09 28.09 28.09 0 0 1 13.02 3.223c-4.446-8.315-13.194-13.914-23.366-13.914zm-38.18 3.736c-12.656 2.568-23.93 6.328-33.082 10.904-17.63 8.815-26.21 19.758-26.21 29.594 0 9.837 8.58 20.777 26.21 29.592 17.63 8.815 43.077 14.643 71.262 14.643 28.185 0 53.632-5.828 71.262-14.643 17.63-8.815 26.21-19.755 26.21-29.592 0-9.836-8.58-20.78-26.21-29.594-9.153-4.576-20.426-8.336-33.082-10.904 4 6.67 6.31 14.453 6.31 22.752 0 24.465-20.025 44.49-44.49 44.49-24.465 0-44.49-20.025-44.49-44.49 0-8.3 2.31-16.083 6.31-22.752zm-83.867 38.694L18 308.68v18.14l104.666-13.082 11.287-19.552zm244.094 0l11.287 19.552L494 326.82v-18.14l-115.953-14.494zm-233.758 18.1l-57.112 98.92h337.644l-57.11-98.92c-5.763 12.078-17.677 22.035-32.4 29.398-20.907 10.452-48.695 16.54-79.312 16.54-30.617 0-58.405-6.088-79.31-16.54-14.725-7.363-26.64-17.32-32.4-29.4zm255.84 20.15l14.167 24.537L494 386.863v-19.226l-93.87-35.2zm-288.26.002L18 367.637v19.225l79.703-29.888 14.166-24.538zm-31.645 54.808L18 426.136v21.227l43.05-26.906 19.175-33.21zm351.55 0l19.174 33.21L494 447.364v-21.226l-62.225-38.89zm-350.82 41.96L18 484.29V494h16.238l74.05-64.795H80.956zm42.158 0L67.573 494h23.71l55.537-64.795h-23.707zm41.832 0L127.92 494h20.732l37.026-64.795h-20.733zm42.752 0c-8.665 28.96-15.66 51.885-19.61 64.794h18.82c4.678-15.314 11.433-37.537 19.573-64.795h-18.783zm39.303 0V494h18v-64.795h-18zm39.984 0L305.496 494h18.723l-18.515-64.795h-18.72zm39.338 0L363.348 494h20.732l-37.025-64.795h-20.733zm38.856 0L420.718 494h23.708l-55.54-64.795H365.18zm38.533 0L477.763 494H494v-9.71l-62.955-55.085H403.71z',
  score: SCORES.VERY_HARD,
  obtainedCheck: ({ match, trophiesCategory }) => {
    if (trophiesCategory === ARAM) {
      return match.participant.stats.killParticipation >= 0.9;
    }
    return match.participant.stats.killParticipation >= 0.8;
  },
  context: 'matches',
  attribute: 'wisdom'
};

export default omnipresent;
