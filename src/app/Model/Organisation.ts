
import {LatLngImpl} from './lat-lng';
import {float} from 'aws-sdk/clients/lightsail';
import {Poi} from './Poi';
import {Story} from './Story';
import {Rating} from './Rating';
import {SponsorPart} from './SponsorPart';

export class Organisation {

    id:number;
    name: String;
    trackColor: String;
    imageSmall: String;
    imageLarge: String;
    description: String;

    constructor () {
    }

}
