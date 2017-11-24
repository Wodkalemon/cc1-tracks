
import {LatLngImpl} from './lat-lng';
import {float} from 'aws-sdk/clients/lightsail';
import {Media} from './Media';

export class Story {

    id:number;
    title: String;
    text: String;
    media: Media[];

    constructor () {
    }

}
