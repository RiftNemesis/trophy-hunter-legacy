import SCORES from '../scores';
import { ARAM } from '../types';

const noxianArmy = {
  name: 'noxianArmy',
  title: 'Noxian Army',
  description:
    'Have at least eight kills, eight assists and die at most six times. (ARAM: 10 kills, 10 asssists, 5 deaths)',
  svgPath:
    'M458.125 19.125c-9.603 0-17.188 7.585-17.188 17.188 0 9.602 7.585 17.187 17.188 17.187 9.603 0 17.188-7.585 17.188-17.188 0-9.602-7.585-17.187-17.188-17.187zM377.78 40.938c-160.32.806-218.11 217.493-362.936 96.28 3.244 36.77 88.5 78.407 88.5 78.407-26.103 19.995-34.85 24.705-72.063 25.438 104.168 86.748 338.695-99.8 408.408 40.093l-2.25-38.312-45.47-46.563 42.75.657-.593-10.28-50.75-32.188 48.406-7.22-.655-11.063-50.03-27.25L429 100.094l-.625-10.688-52.156-22.75 50.467-5.844-.812-13.906c-17.043-4.2-33.02-6.044-48.094-5.968zm70.845 29.968l20.188 428 18.656-.875L467.31 71c-2.933.784-6.018 1.188-9.187 1.188-3.283 0-6.472-.442-9.5-1.282zm-93.438 221.97l-43.562 70.03 21.25 25.03L317.22 493h18.874l15.25-102.28 27.937-20.22-24.092-77.625zM198.47 310.78l-28.814 69.783 20.53 20.218 2.22 92.22h18.688l-2.22-92.97 19.595-19.936-30-69.313zm-158.157 5l-16.407 61.876 17.657 13.28L56.406 493H75.28L60.063 388.25l13.22-17.594-32.938-54.875h-.032zm86 7.44l-28.25 57.467 15.156 16.97L106.5 493h18.75l6.72-95.28 15.905-14.19-21.563-60.31zm136.843 32.31L243.72 423.94l19.405 15.125L268.938 493h18.812l-5.875-54.28 16.813-21.595-35.532-61.594zm143.656.064l-18.906 68.562 20.313 15.563 6.155 53.28h18.813l-6.375-55.188 16.03-20.906-36.03-61.312z',
  score: SCORES.MEDIUM,
  obtainedCheck: ({ match, trophiesCategory }) => {
    if (trophiesCategory === ARAM) {
      const validKills = match.participant.stats.kills >= 10;
      const validDeaths = match.participant.stats.deaths <= 5;
      const validAssists = match.participant.stats.assists >= 10;
      return validKills && validDeaths && validAssists;
    }

    {
      const validKills = match.participant.stats.kills >= 8;
      const validDeaths = match.participant.stats.deaths <= 6;
      const validAssists = match.participant.stats.assists >= 8;
      return validKills && validDeaths && validAssists;
    }
  },
  context: 'matches',
  attribute: 'robustness'
};

export default noxianArmy;
