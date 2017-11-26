
import {LatLngImpl} from './lat-lng';
import {float} from 'aws-sdk/clients/lightsail';
import {Poi} from './Poi';
import {Story} from './Story';
import {Rating} from './Rating';
import {SponsorPart} from './SponsorPart';

export class CongitoUser {

    sub: String;
    email_verified: boolean;
    nickname: String;
    customGroup: String;
    email: String;


    constructor () {
    }

}
