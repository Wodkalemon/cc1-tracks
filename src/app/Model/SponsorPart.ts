
import {LatLngImpl} from './lat-lng';
import {float} from 'aws-sdk/clients/lightsail';
import {Poi} from './Poi';
import {Story} from './Story';
import {Rating} from './Rating';

export class SponsorParts {

    id:number;
    sponsorId: number;
    sponsoredId: number;
    startPoint: LatLngImpl;
    endPoint: LatLngImpl;
    points: LatLngImpl[];
    distance: number;
    price: number;
    comment: String;

    constructor () {
    }

}
