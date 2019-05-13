import config from './config';
const URL = `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=:country&api_key=${config.apikey}&format=json`;

export default function getArtists (country) {
    const newUrl=URL.replace(':country',country);
    return fetch(newUrl)
        .then(res => res.json())
        .then(json=>json.topartists.artist)
}