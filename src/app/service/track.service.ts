import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {of} from 'rxjs/observable/of';
import 'rxjs/Rx';
import {Track} from '../Model/Track';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {RequestOptions, Response} from '@angular/http';
import {catchError, tap} from 'rxjs/operators';
import {Sponsor} from '../Model/Sponsor';
import {Organisation} from '../Model/Organisation';
import {SearchParam} from '../Model/SearchParam';
import {Story} from '../Model/Story';
import {Poi} from '../Model/Poi';
import {SponsorPart} from '../Model/SponsorPart';

@Injectable()
export class TrackService {
    results: string[];
    trackDetailUrl = "https://l2vba9toe9.execute-api.us-west-2.amazonaws.com/api/route-detail"
    sponsorsUrl = "https://l2vba9toe9.execute-api.us-west-2.amazonaws.com/api/sponsors"
    organisationsUrl = "https://l2vba9toe9.execute-api.us-west-2.amazonaws.com/api/organisation"
    tracksUrl = "https://l2vba9toe9.execute-api.us-west-2.amazonaws.com/api/routes"
    addStoryUrl = "https://l2vba9toe9.execute-api.us-west-2.amazonaws.com/api/add-story"
    addPoiUrl = "https://l2vba9toe9.execute-api.us-west-2.amazonaws.com/api/add-poi"
    uploadMediaUrl = "http://backend-env.fbhen6p3um.us-west-2.elasticbeanstalk.com/api/media"
    checkSponsoringUrl = "https://l2vba9toe9.execute-api.us-west-2.amazonaws.com/api/check-sponsoring"

    constructor(private http: HttpClient) {
    }


    getTrack(id: number): Observable<Track> {
        const url = `${this.trackDetailUrl}?id=${id}`;
        //return this.http.get<Track>(url).pipe(
        return this.http.get<Track>(url).pipe(
            tap(_ => console.log(`fetched Track id=${id}`))
        );
    }

    getSponsors(ids: number[]): Observable<Sponsor[]> {
        const url = `${this.sponsorsUrl}`;
        //return this.http.get<Track>(url).pipe(
        return this.http.get<Sponsor[]>(url).pipe(
            tap(_ => console.log(`fetched Sponsors`))
        );
    }

    getOrganisations(ids: number[]): Observable<Organisation[]> {
        const url = `${this.organisationsUrl}`;
        //return this.http.get<Track>(url).pipe(
        return this.http.get<Organisation[]>(url).pipe(
            tap(_ => console.log(`fetched Organisations`))
        );
    }

    searchTracks(params: SearchParam): Observable<Track[]> {
        let url = `${this.tracksUrl}`;

        let urlParams = `${params.name ? "name=" + params.name + ";" : ''}` +
            `${params.startCountry ? "startCountry=" + params.startCountry + ";" : ''}` +
            `${params.endCountry ? "endCountry=" + params.endCountry + ";" : ''}` +
            `${params.minDistance ? "minDistance=" + params.minDistance + ";" : ''}` +
            `${params.maxDistance ? "maxDistance=" + params.maxDistance + ";" : ''}` +
            `${params.minDuration ? "minDuration=" + params.minDuration + ";" : ''}` +
            `${params.maxDuration ? "maxDuration=" + params.maxDuration + ";" : ''}` +
            `${params.minRating ? "minRating=" + params.minRating + ";" : ''}` +
            `${params.maxRating ? "maxRating=" + params.maxRating + ";" : ''}` +
            `${params.minDifficulty ? "minDifficulty=" + params.minDifficulty + ";" : ''}` +
            `${params.maxDifficulty ? "maxDifficulty=" + params.maxDifficulty + ";" : ''}`;

        if (urlParams != '') {
            url = url + "?" + urlParams;
            console.log("url with Params: " + url);
        }
        //return this.http.get<Track>(url).pipe(
        return this.http.get<Track[]>(url).pipe(
            tap(_ => console.log(`fetched Organisations`))
        );

        //https://l2vba9toe9.execute-api.us-west-2.amazonaws.com/api/routes?name=route2
    }



    checkSponsorPart(part: SponsorPart, track: Track): Observable<SponsorPart> {
        const url = this.checkSponsoringUrl +
            '?id=' + track.id +
            ';x1=' + part.startPoint.coord[1] +
            ';y1=' + part.startPoint.coord[0] +
            ';x2=' + part.endPoint.coord[1] +
            ';y2=' + part.endPoint.coord[0];

        return this.http.get<SponsorPart>(url).pipe(
            tap(_ => console.log(`fetched sponorPart`))
        );
    }

    addStory(story: Story, track: Track): Observable<any> {
        const url = `${this.addStoryUrl}?id=${track.id}`;
        console.log("addStory-url: " + url);

        let headerJson = {
            'Content-Type':'application/json',
            'Accept':'application/json'
        }
        let headers = new HttpHeaders(headerJson );

        let body = JSON.stringify(story, null, 2);
        console.log("addStory-body: " + body)

        return this.http.post(url, body, {
            headers: headers
        }).pipe(
            tap(_ => console.log(`posted addStory`))
        );

    }


    addPoi(poi: Poi, track: Track): Observable<any> {
        const url = `${this.addPoiUrl}?id=${track.id}`;
        console.log("addPoi-url: " + url);


        let headerJson = {
            'Content-Type':'application/json',
            'Accept':'application/json'
        }
        let headers = new HttpHeaders(headerJson );

        let body = JSON.stringify(poi, null, 2);
        console.log("addPoi-body: " + body);

        return this.http.post(url, body, {
            headers: headers
        }).pipe(
            tap(_ => console.log(`posted addPoi`))
        );

    }


    uploadMedia(file: File): Observable<any> {
        let url = `${this.uploadMediaUrl}`;

        let formData: FormData = new FormData();
        formData.append('uploadFile', file, file.name);

        let headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        //let options = new RequestOptions({ headers: headers });

        return this.http.post(url, formData, {
            headers: headers
        }).pipe(
            tap(_ => console.log(`uploaded media`))
        );
    }


}