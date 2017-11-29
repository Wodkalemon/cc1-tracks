import {Component, OnInit} from "@angular/core";
import {LatLng} from '@agm/core';
import {LatLngImpl} from '../../Model/lat-lng';
import {TrackService} from '../../service/track.service';
import {Track} from '../../Model/Track';
import {Poi} from '../../Model/Poi';
import {Story} from '../../Model/Story';
import {forEach} from '@angular/router/src/utils/collection';
import {SponsorPart} from '../../Model/SponsorPart';
import {Sponsor} from '../../Model/Sponsor';
import {Organisation} from '../../Model/Organisation';
import {SharedUserService} from '../../service/shared-user.service';
import {AwsUser} from '../../Model/AwsUser';

@Component({
    selector: 'track-details',
    templateUrl: './track-details.html',
    styleUrls: ['./track-details.css']
})
export class TrackDetailsComponent implements OnInit {

    POI_DESCRIPTION_LENGTH = 100;
    STORY_TEXT_LENGTH = 100;
    RATING_COMMENT_LENGTH = 100;
    LETTERS = {1:"A", 2:"B", 3:"C", 4:"D", 5:"E", 6:"F", 7:"G", 8:"H", 9:"I", 10:"J", 11:"K", 12:"L", 13:"M", 14:"N", 15:"O", 16:"P", 17:"Q", 18:"R", 19:"S", 20:"T", 21:"U", 22:"V", 23:"W", 24:"X", 25:"Y", 26:"Z"};

    track: Track;
    sponsors: Sponsor[];
    organisations: Organisation[];
    selectedPoi: Poi;
    selectedStory: Story;
    selectedSponsorPart: SponsorPart;
    lat: number = 50.357968;
    lng: number = 7.569099;
//    lat: number = 50.357968;
//    lng: number = 7.569099;


    //polyLine: LatLng[] = [new LatLng(50.357968, 7.569099), new LatLng(50.358899, 7.567618)];
    polyLineRed: LatLngImpl[] = [new LatLngImpl(50.357968, 7.569099), new LatLngImpl(50.358899, 7.567618)];
    polyLineGreen: LatLngImpl[] = [new LatLngImpl(50.358899, 7.567618), new LatLngImpl(50.359899, 7.568618)];
    polyLineBlue: LatLngImpl[] = [new LatLngImpl(50.359899, 7.568618), new LatLngImpl(50.357968, 7.569099)];


    constructor(private trackService: TrackService, private sharedUserService: SharedUserService) {
        console.log("TrackDetailsComponent: constructor");

    }

    ngOnInit() {
        this.getTrack(1);
    }

    showPoi(poi: Poi) {
        console.log("POI selected: " + poi.id);
        this.selectedPoi = poi;
        this.selectedSponsorPart = null;
        this.selectedStory = null;
    }

    showStory(story: Story) {
        console.log("Story selected: " + story.id);
        this.selectedPoi = null;
        this.selectedSponsorPart = null;
        this.selectedStory = story;
    }
    showSponsorPart(part: SponsorPart) {
        console.log("SponsorPart selected: " + part.id);
        this.selectedPoi = null;
        this.selectedSponsorPart = part;
        this.selectedStory = null;
    }

    getTrack(id: number) {
        this.trackService.getTrack(id)
            .subscribe(track => {
                this.track = track;
                console.log("getTrack(" + id + ").name : " + this.track.name);
                console.log(this.track);

                this.getSponsors([1001,1002,1003]);
                this.getOrganisations([2001,2002,2003]);


                for (let sponsorPart of this.track.sponsorParts){
                    //console.log("sponsorPart");
                    //console.log(sponsorPart);
                    sponsorPart = this.getSponsorPartPoints(sponsorPart);
                }
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

    getSponsors(ids:number[]) {

        this.trackService.getSponsors(ids)
            .subscribe(sponsors => {
                this.sponsors = sponsors;
                console.log("getSponsors(" + ids + ") : " + this.sponsors);
                console.log(this.track);



                for (let sponsorPart of this.track.sponsorParts){
                    //console.log("sponsorPart");
                    //console.log(sponsorPart);
                    sponsorPart = this.getSponsorPartPoints(sponsorPart);
                }
            });

    }

    getOrganisations(ids:number[]) {

        this.trackService.getOrganisations(ids)
            .subscribe(oragnisation => {
                this.organisations = oragnisation;
                console.log("getOrganisations(" + ids + ") : " + this.organisations);
                console.log(this.organisations);
            });

    }

    getSponsorColor(id:number):String {
        for(let sponsor of this.sponsors){
            if(sponsor.id == id) {
                console.log("Farbe: " + sponsor.trackColor);
                return sponsor.trackColor;
            }
        }
    }

    getSponsor(id:number):Sponsor {
        for(let sponsor of this.sponsors){
            if(sponsor.id == id) {
                return sponsor;
            }
        }
    }

    getOrganisation(id:number):Organisation {
        for(let organisation of this.organisations){
            if(organisation.id == id) {
                return organisation;
            }
        }
    }
    getUser():AwsUser {
        return this.sharedUserService.sharedUser;
    }

    poiClick(poi: Poi){
        console.log("POI klicked: " + poi.name);
        this.showPoi(poi);
    }
    storyClick(story: Story){
        console.log("Story klicked: " + story.title);
        this.showStory(story);
    }
    getSponsorPartPoints(sponsorPart: SponsorPart): SponsorPart {
        let result: LatLngImpl[]=[];
        let foundStart: boolean=false;
        //console.log("suche...");
        //console.log(point.coord);
        //console.log(sponsorPart.startPoint);
        for(let point of this.track.points){

            if (!foundStart && point[0] == sponsorPart.startPoint[0] && point[1] == sponsorPart.startPoint[1]){
                foundStart = true;
                result.push(point);
                //console.log(sponsorPart.startPoint);
                //console.log("Start gefunden");
            }
            else if(foundStart && point[0] == sponsorPart.endPoint[0] && point[1] == sponsorPart.endPoint[1]){
                foundStart = false;
                result.push(point);
                //console.log("Ende gefunden");
            }
            else if(foundStart) {
                result.push(point);
                //console.log("point added");
            }
        }
        //console.log("points added: "+result.length);
        sponsorPart.points = result;
        return sponsorPart;

    }
}

