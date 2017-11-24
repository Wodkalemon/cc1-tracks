
import {LatLngImpl} from './lat-lng';
import {float} from 'aws-sdk/clients/lightsail';
import {Poi} from './Poi';
import {Story} from './Story';
import {Rating} from './Rating';

export class Track {

    id:number;
    name: String;
    points: LatLngImpl[];
    startPoint: float;
    endPoint: float;
    distance: number;
    elevations: number[];
    duration: number;
    startCountry: String;
    endCountry: String;
    sponsorPricePerKm: float;
    ratingAvg: float;
    pois: Poi[];
    stories: Story[];
    //ratings: any[];

    constructor () {
    }

}
