
import {LatLngImpl} from './lat-lng';
import {float} from 'aws-sdk/clients/lightsail';
import {Media} from './Media';

export class SearchParam {

    routeId: String;
    name: String;

    startCountry: String;
    endCountry: String;

    minDistance: number;
    maxDistance: number;

    minDuration: number;
    maxDuration: number;

    minRating: number;
    maxRating: number;

    minDifficulty: number;
    maxDifficulty: number;

    constructor () {
    }

}
