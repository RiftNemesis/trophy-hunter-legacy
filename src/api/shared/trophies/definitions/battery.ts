import SCORES from '../scores';
import { TWISTED_TREELINE } from '../types';

const battery = {
  name: 'battery',
  title: 'Battery',
  description:
    'Heal/Regenerate most damage and take most damage. (Twisted Treeline: Heal/Regenerate 20% more damage and take 20% more damage than the next player.)',
  svgPath:
    'M201 16c-15 0-20 3.38-20 20v15h-45c-29.547 0-35 5.453-35 35v375c0 29.547 5.453 35 35 35h240c29.547 0 35-5.453 35-35V86c0-29.547-5.453-35-35-35h-45V36c0-16.62-5-20-20-20H201zm-48.094 69.813c4.666.02 10.594.187 18.094.187h170c40 0 35-5 35 35v305c0 40 5 35-35 35H171c-40 0-35 5-35-35V121c0-32.5-3.31-35.283 16.906-35.188zM231 176c-5.54 0-10 4.46-10 10v50h-50c-5.54 0-10 4.46-10 10v50c0 5.54 4.46 10 10 10h50v50c0 5.54 4.46 10 10 10h50c5.54 0 10-4.46 10-10v-50h50c5.54 0 10-4.46 10-10v-50c0-5.54-4.46-10-10-10h-50v-50c0-5.54-4.46-10-10-10h-50z',
  score: SCORES.MEDIUM,
  obtainedCheck: ({ match, trophiesCategory }) => {
    if (trophiesCategory === TWISTED_TREELINE) {
      return (
        match.participant.stats.totalHeal >= match.participant.stats.others.maxTotalHeal * 1.2 &&
        match.participant.stats.totalDamageTaken >=
          match.participant.stats.others.maxTotalDamageTaken * 1.2
      );
    }

    return (
      match.participant.stats.totalHeal >= match.maxTotalHeal &&
      match.participant.stats.totalDamageTaken >= match.maxTotalDamageTaken
    );
  },

  context: 'matches',
  attribute: 'robustness'
};

export default battery;
