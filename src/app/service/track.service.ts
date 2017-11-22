import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {Track} from '../Model/Track';

@Injectable()
export class TrackService {

    constructor() { }


    getTrack(id: number): Observable<Track> {
        return of(null);
    }
}