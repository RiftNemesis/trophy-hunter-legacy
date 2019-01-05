import { timelineCache } from './cache';

import Future from 'fibers/future';
import { HTTP } from 'meteor/http';
import { Meteor } from 'meteor/meteor';
import endpoints from '../endpoints';
import version from '../version';
import { getPlatformIdByRegion, getMatch } from '/imports/shared/th-api/index.ts';

class RiotApi {
  constructor() {
    if (!Meteor.settings.riotApiKeys) {
      throw new Meteor.Error('settings', 'riotApiKey is empty');
    }

    this.apiKeys = Meteor.settings.riotApiKeys;
    this.currentKeyIndex = 0;
  }

  _getStatic(url) {
    try {
      const result = HTTP.get(encodeURI(url), {
        timeout: 10000
      });
      return JSON.parse(result.content);
    } catch (error) {
      console.error(error);
    }
  }

  _get(url, attempts = 1, method, region) {
    this.currentKeyIndex = (this.currentKeyIndex + 1) % this.apiKeys.length;

    const apiKey = this.apiKeys[this.currentKeyIndex];
    try {
      const result = HTTP.get(encodeURI(`${url}api_key=${apiKey}`), {
        timeout: 10000
      });
      const content = JSON.parse(result.content);
      return content;
    } catch (error) {
      const response = error.response;
      if (attempts > 2) {
        console.log(
          'RiotApi ERROR',
          response && response.statusCode,
          'Attempt',
          attempts,
          `${url}api_key=${apiKey}`.underline
        );
        return;
      }
      if (response) {
        if (response.statusCode === 404) {
          return;
        }

        if (response.statusCode === 429) {
          console.log('Rate limit exceeded', method, response.headers['retry-after']);
          if (response.headers['retry-after'] === 0) {
            return this._get(url, attempts + 1, method, region);
          }
          return;
        }
        if (response.statusCode === 500) {
          return this._get(url, attempts + 1, method, region);
        }
        if (response.statusCode === 503) {
          // Service Unavailable - Connection retries limit exceeded
          return this._get(url, attempts + 1, method, region);
        }
      }
      console.log(`Riot API Unexpected ${attempts}: ${error.message}`, `${url}api_key=${apiKey}`);
      return this._get(url, attempts + 1, method, region);
    }
  }

  _getHost(region) {
    const endpoint =
      endpoints.find(endpoint => endpoint.region === region) ||
      endpoints.find(endpoint => endpoint.region === 'NA');
    return `https://${endpoint.host}`;
  }

  getTimeline(region, matchId) {
    const host = this._getHost(region);

    const key = `${region}-${matchId}`;
    let timeline = timelineCache.get(key);
    if (!timeline) {
      const url = `${host}/lol/match/v3/timelines/by-match/${matchId}?`;
      timeline = this._get(url, 1, 'getTimeline', region);
      if (timeline) timelineCache.set(key, timeline);
    }

    return timeline;
  }

  getMatchWithTimeline(region, matchId) {
    const matchFuture = new Future();
    const timelineFuture = new Future();
    const platformId = getPlatformIdByRegion(region);
    getMatch({ platformId, matchId })
      .then(match => {
        matchFuture.return(match);
      })
      .catch(() => {
        matchFuture.return(null);
      });
    Meteor.defer(() => {
      const timeline = this.getTimeline(region, matchId);
      timelineFuture.return(timeline);
    });
    const match = matchFuture.wait();
    const timeline = timelineFuture.wait();

    if (match && timeline) {
      return { ...match, timeline };
    }
    return null;
  }

  getChampionsStaticData(lang) {
    const url = `https://ddragon.leagueoflegends.com/cdn/${version}/data/${lang}/champion.json`;
    return this._getStatic(url);
  }

  getChampionStaticData(lang, championId) {
    const url = `https://ddragon.leagueoflegends.com/cdn/${version}/data/${lang}/champion/${championId}.json`;
    return this._getStatic(url);
  }

  getReforgedRunePathsStaticData(lang) {
    const url = `https://ddragon.leagueoflegends.com/cdn/${version}/data/${lang}/runesReforged.json`;
    return this._getStatic(url);
  }

  getItemsStaticData(lang) {
    const url = `https://ddragon.leagueoflegends.com/cdn/${version}/data/${lang}/item.json`;
    return this._getStatic(url);
  }

  getSummonerSpellsStaticData(lang) {
    const url = `https://ddragon.leagueoflegends.com/cdn/${version}/data/${lang}/summoner.json`;
    return this._getStatic(url);
  }
}

const riotApi = new RiotApi();
export default riotApi;
