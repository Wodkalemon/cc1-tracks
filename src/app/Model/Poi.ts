
import {LatLngImpl} from './lat-lng';
import {float} from 'aws-sdk/clients/lightsail';
import {Media} from './Media';

export class Poi {

    id:number;
    name: String;
    location: LatLngImpl;
    description: String;
    media: Media[];

    constructor () {
    }

}
