
import {LatLngImpl} from './lat-lng';
import {float} from 'aws-sdk/clients/lightsail';
import {Media} from './Media';

export class SearchParam {

    routeId: String;
    name: String;

    startCountry: String;
    endCountry: String;

    minDistance: number=0;
    maxDistance: number=300;

    minDuration: number;
    maxDuration: number;

    minRating: number;
    maxRating: number;

    minDifficulty: number=0;
    maxDifficulty: number=5;

    constructor () {
    }

}
