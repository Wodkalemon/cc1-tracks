
import {LatLngImpl} from './lat-lng';
import {float} from 'aws-sdk/clients/lightsail';
import {Media} from './Media';

export class Rating {

    id:number;
    userName: String;
    rating: number;
    creationDate: number;
    comment: String;

    constructor () {
    }

}
