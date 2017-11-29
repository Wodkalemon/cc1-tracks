import {Injectable} from '@angular/core';
import {AwsUser} from '../Model/AwsUser';


@Injectable()
export class SharedUserService {

    sharedUser: AwsUser;

    constructor() {}
}