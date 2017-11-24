import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {of} from 'rxjs/observable/of';
import 'rxjs/Rx';
import {Track} from '../Model/Track';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {RequestOptions, Response} from '@angular/http';
import {catchError, tap} from 'rxjs/operators';

@Injectable()
export class TrackService {
    results: string[];
    trackUrl = "https://l2vba9toe9.execute-api.us-west-2.amazonaws.com/api/route-detail"
    constructor(private http: HttpClient) {
    }


    getTrack(id: number): Observable<Track> {
        const url = `${this.trackUrl}?id=${id}`;
        //return this.http.get<Track>(url).pipe(
        return this.http.get<Track>(url).pipe(
            tap(_ => console.log(`fetched Track id=${id}`))

        );
    }


}