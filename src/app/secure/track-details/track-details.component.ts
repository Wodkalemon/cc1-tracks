import {Component, OnInit} from "@angular/core";
import {LatLng} from '@agm/core';
import {LatLngImpl} from '../../Model/lat-lng';
import {TrackService} from '../../service/track.service';
import {Track} from '../../Model/Track';

@Component({
    selector: 'track-details',
    templateUrl: './track-details.html',
    styleUrls: ['./track-details.css']
})
export class TrackDetailsComponent implements OnInit {

    track: Track;
    lat: number = 50.357968;
    lng: number = 7.569099;


    //polyLine: LatLng[] = [new LatLng(50.357968, 7.569099), new LatLng(50.358899, 7.567618)];
    polyLineRed: LatLngImpl[] = [new LatLngImpl(50.357968, 7.569099), new LatLngImpl(50.358899, 7.567618)];
    polyLineGreen: LatLngImpl[] = [new LatLngImpl(50.358899, 7.567618), new LatLngImpl(50.359899, 7.568618)];
    polyLineBlue: LatLngImpl[] = [new LatLngImpl(50.359899, 7.568618), new LatLngImpl(50.357968, 7.569099)];


    constructor(
        private trackService: TrackService
    ) {
        console.log("TrackDetailsComponent: constructor");

    }

    ngOnInit() {
        this.getTrack(1);
    }


    getTrack(id: number) {
        this.trackService.getTrack(id)
            .subscribe(track => this.track = track);
    }
}

