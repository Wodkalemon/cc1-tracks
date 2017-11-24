import {Component, OnInit} from "@angular/core";
import {LatLng} from '@agm/core';
import {LatLngImpl} from '../../Model/lat-lng';
import {TrackService} from '../../service/track.service';
import {Track} from '../../Model/Track';
import {Poi} from '../../Model/Poi';
import {Story} from '../../Model/Story';

@Component({
    selector: 'track-details',
    templateUrl: './track-details.html',
    styleUrls: ['./track-details.css']
})
export class TrackDetailsComponent implements OnInit {

    POI_DESCRIPTION_LENGTH = 100;
    STORY_TEXT_LENGTH = 100;
    RATING_COMMENT_LENGTH = 100;

    track: Track;
    selectedPoi: Poi;
    selectedStory: Story;
    selectedSponsor: Poi;
    lat: number = 50.357968;
    lng: number = 7.569099;


    //polyLine: LatLng[] = [new LatLng(50.357968, 7.569099), new LatLng(50.358899, 7.567618)];
    polyLineRed: LatLngImpl[] = [new LatLngImpl(50.357968, 7.569099), new LatLngImpl(50.358899, 7.567618)];
    polyLineGreen: LatLngImpl[] = [new LatLngImpl(50.358899, 7.567618), new LatLngImpl(50.359899, 7.568618)];
    polyLineBlue: LatLngImpl[] = [new LatLngImpl(50.359899, 7.568618), new LatLngImpl(50.357968, 7.569099)];


    constructor(private trackService: TrackService) {
        console.log("TrackDetailsComponent: constructor");

    }

    ngOnInit() {
        this.getTrack(1);
        //console.log("Trackname: " + this.track.name);

    }

    showPoi(poi: Poi) {
        console.log("POI selected: " + poi.id);
        this.selectedPoi = poi;
        this.selectedSponsor = null;
        this.selectedStory = null;
    }

    showStory(story: Story) {
        console.log("Story selected: " + story.id);
        this.selectedPoi = null;
        this.selectedSponsor = null;
        this.selectedStory = story;
    }

    getTrack(id: number) {
        this.trackService.getTrack(id)
            .subscribe(track => {
                this.track = track;
                console.log("getTrack(" + id + ")" + this.track.name);
            });
    }

    getInstanceOf(element: any): boolean {
        console.log("constructor: " + element.constructor.name);
        console.log(".type: " + (element.type === 'Poi'));
        if (element instanceof Poi) {
            return true;
        }
        ;
        return false;
    }
}

