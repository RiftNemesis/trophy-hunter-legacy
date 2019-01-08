import axios from 'axios';
import extendMatchResult from '../../shared/matches/extendMatchResult';
import calculateTrophies from '../../shared/trophies/calculateTrophies';
import { parse } from 'url';
import { IncomingMessage, ServerResponse } from 'http';
import exampleMatches from '../../shared/matches/exampleMatches';

export default (req: IncomingMessage, res: ServerResponse) => {
  axios
    .all([exampleMatches])
    .then(
      axios.spread(sampleMatchesArray => {
        const extendedMatchResults = [];

        sampleMatchesArray.forEach(match => {
          const extendedMatchResult = extendMatchResult(
            match,
            'aR6YdOSN9sG6R31d6e9g2CGboeTAXDzcyxcT5nkReJBU-Y8',
            null
          );
          extendedMatchResults.push(extendedMatchResult);
        });

        const result = {
          data: extendedMatchResults
        };
        // Cache result https://zeit.co/docs/v2/routing/caching/#caching-lambda-responses
        res.setHeader('Cache-Control', 's-maxage=31536000, maxage=0');

        const cache = new Set();
        res.end(
          JSON.stringify(result, function(key, value) {
            if (typeof value === 'object' && value !== null) {
              if (cache.has(value)) {
                // Circular reference found
                try {
                  // If this value does not reference a parent it can be deduped
                  return JSON.parse(JSON.stringify(value));
                } catch (err) {
                  // discard key if value cannot be deduped
                  return;
                }
              }
              // Store value in our set
              cache.add(value);
            }
            return value;
          })
        );
      })
    )
    .catch(error => {
      console.log('insidecatch');
      console.log(error);
      res.writeHead(error.response.status);
      res.end(error.response.statusText);
    });
};
