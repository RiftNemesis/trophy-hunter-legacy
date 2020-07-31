import SCORES from '../scores';
import { ARAM } from '../types';

const teamPlayer = {
  name: 'teamPlayer',
  title: 'Team Player',
  description: 'Score at least ten assists (from 20: High Society). (ARAM: 20 assists). ',
  svgPath:
    'M164.594 21.625c-.537.012-1.068.028-1.563.094-29.656 3.852-52.56 35.847-52.56 74.75 0 21.55 7.307 41.193 18.686 54.905-61.678 11.594-66.563 115.158-66.562 188.063h43.218l11.094 152.437h63.063L168.905 340.03h21.47l11.343 152.158h108.686l10.03-152.157h21.627l-9.907 151.845h63.063l10.53-152.438h40.28c0-73.107 1.407-178.78-65.967-189.218 10.89-13.646 18.093-32.734 18.093-53.75 0-41.496-26.52-74.75-59-74.75-2.03 0-4.43-.263-6.406 0-9.4 1.22-17.562 5.455-25.125 11.686 16.388 13.303 27.468 36.433 27.47 63.063 0 21.016-7.236 40.104-18.126 53.75 67.373 10.438 66 116.11 66 189.218h-21.94c.008-73.086 1.29-178.215-65.905-188.625 10.89-13.647 17.906-32.61 17.906-53.625 0-41.497-26.457-75-58.936-75-2.03 0-4.117-.262-6.094 0-29.657 3.85-52.813 36.095-52.813 75 0 21.547 7.373 40.788 18.75 54.5-61.514 11.563-66.318 114.874-66.343 187.75H126.25c-.002-72.905 4.322-176.47 66-188.063-11.38-13.712-18.687-33.356-18.688-54.906 0-26.575 11.138-49.632 27.438-63.064-9.148-7.425-19.896-11.687-31.53-11.687-1.525 0-3.267-.132-4.876-.095z',
  score: SCORES.EASY,
  obtainedCheck: ({ match, trophiesCategory }) => {
    if (trophiesCategory === ARAM) {
      const hasMinAssists = match.participant.stats.assists >= 20;
      const hasMaxAssists = match.participant.stats.assists < 30;
      return hasMinAssists && hasMaxAssists;
    }

    {
      const hasMinAssists = match.participant.stats.assists >= 10;
      const hasMaxAssists = match.participant.stats.assists < 20;
      return hasMinAssists && hasMaxAssists;
    }
  },
  context: 'matches',
  attribute: 'cooperation'
};

export default teamPlayer;
