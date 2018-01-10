
import {LatLngImpl} from './lat-lng';
import {float} from 'aws-sdk/clients/lightsail';
import {Poi} from './Poi';
import {Story} from './Story';
import {Rating} from './Rating';

export class SponsorPart {

    id:number;
    sponsorId: String;
    sponsoredId: number;
    startPoint: number[];
    endPoint: number[];
    points: LatLngImpl[];
    distance: number;
    price: number;
    comment: String;

    constructor () {
    }

}
