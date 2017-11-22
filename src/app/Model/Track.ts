
import {LatLngImpl} from './lat-lng';
import {float} from 'aws-sdk/clients/lightsail';

export class Track {

    id:number;
    name: String;
    points: LatLngImpl[];
    startPoint: float;
    endPoint: float;

    constructor() {
    }

}
