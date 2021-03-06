import {Component, EventEmitter, OnInit} from "@angular/core";
import {LatLng, PolyMouseEvent} from '@agm/core';
import {LatLngImpl} from '../../Model/lat-lng';
import {TrackService} from '../../service/track.service';
import {Track} from '../../Model/Track';
import {Poi} from '../../Model/Poi';
import {Story} from '../../Model/Story';
import {SponsorPart} from '../../Model/SponsorPart';
import {Sponsor} from '../../Model/Sponsor';
import {Organisation} from '../../Model/Organisation';
import {SharedUserService} from '../../service/shared-user.service';
import {AwsUser} from '../../Model/AwsUser';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {HaversineService} from 'ng2-haversine';
import {Location} from '@angular/common';


@Component({
    selector: 'sponsor-buy',
    templateUrl: './sponsor-buy.html',
    styleUrls: ['./sponsor-buy.scss']
})
export class SponsorBuyComponent implements OnInit {

    POI_DESCRIPTION_LENGTH = 100;
    STORY_TEXT_LENGTH = 100;
    RATING_COMMENT_LENGTH = 100;
    LETTERS = {
        1: "A",
        2: "B",
        3: "C",
        4: "D",
        5: "E",
        6: "F",
        7: "G",
        8: "H",
        9: "I",
        10: "J",
        11: "K",
        12: "L",
        13: "M",
        14: "N",
        15: "O",
        16: "P",
        17: "Q",
        18: "R",
        19: "S",
        20: "T",
        21: "U",
        22: "V",
        23: "W",
        24: "X",
        25: "Y",
        26: "Z"
    };

    MEDIA_REF = " http://backend-env.fbhen6p3um.us-west-2.elasticbeanstalk.com/api/media"

    track: Track;
    sponsor: Sponsor;

    sponsors: Sponsor[];
    organisations: Organisation[];
    selectedPoi: Poi;
    selectedStory: Story;
    selectedSponsorPart: SponsorPart;
    selectedPosition: LatLngImpl;
    lat: number = 50.357968;
    lng: number = 7.569099;

    showAddStory = false;
    showAddPoi = false;
    showConfirmation = false;
    newStory: Story = new Story();
    newPoi: Poi = new Poi();

    newSponsorPart = new SponsorPart();

    constructor(private route: ActivatedRoute,
                private trackService: TrackService,
                private sharedUserService: SharedUserService,
                private sanitizer: DomSanitizer,
                private _location: Location,
                private haversineService: HaversineService) {
        console.log("SponsorBuyComponent: constructor");

    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            console.log("id:" + params['id']);
            if (params['id']){
                this.getTrack(params['id']);
            } else {
                this.getTrack(1);
            }


        });
        this.getSponsorByName(this.getUser() ? this.getUser().nickname:'');

    }



    checkSponsorPart() {

        this.newSponsorPart.startPoint = this.getClosestTrackPoint(this.newSponsorPart.startPoint[0], this.newSponsorPart.startPoint[1]);
        this.newSponsorPart.endPoint = this.getClosestTrackPoint(this.newSponsorPart.endPoint[0], this.newSponsorPart.endPoint[1]);

        this.trackService.checkSponsorPart(this.newSponsorPart, this.track)
            .subscribe(Result => {
                console.log(Result);
                this.newSponsorPart.price = Result.price;
                this.newSponsorPart.distance = Result.distance;
            });
        //this.getSponsorByName(this.getUser() ? this.getUser().nickname:'');
        this.newSponsorPart.sponsorId = this.getUser().nickname;

    }

    getClosestTrackPoint(lat: number, lng: number) :number[] {
        let distance: number;
        let shortestDistance: number = 100000000;
        let closestPoint;
        for (let point of this.track.points) {
            console.log("Distance: " +this.haversineService.getDistanceInMeters({latitude: lat, longitude: lng},{latitude: point[0], longitude: point[1]}));
            distance = this.haversineService.getDistanceInMeters({latitude: lat, longitude: lng},{latitude: point[0], longitude: point[1]});
            if (distance < shortestDistance ) {
                shortestDistance = distance;
                closestPoint = point;
            }
        }
        console.log("ClosestDistance: " +this.haversineService.getDistanceInMeters({latitude: lat, longitude: lng},{latitude: closestPoint[0], longitude: closestPoint[1]}));
        return [closestPoint[0], closestPoint[1]];
    }

    addSponsorPart() {
        this.trackService.addSponsorPart(this.newSponsorPart, this.track).subscribe(result => {
            console.log(result);
            this.showConfirmation = true;
            this.getTrack(this.track.id);


        });
    }


    isBuyable() {
        if (this.newSponsorPart.price &&
            this.newSponsorPart.distance &&
            this.newSponsorPart.sponsoredId &&
            this.newSponsorPart.comment ) {
            //this.newSponsorPart.sponsorId = this.sponsor.id;
            return true;
        }
        return false;
    }


    setEndpoint(lng: number, lat: number) {
        this.newSponsorPart.endPoint = [lng, lat];
        console.log(this.newSponsorPart);
        if (this.newSponsorPart.startPoint) {
            this.checkSponsorPart();
        }
    }

    setStartpoint(lng: number, lat: number) {
        this.newSponsorPart.startPoint = [lng, lat];
        console.log(this.newSponsorPart);
        if (this.newSponsorPart.endPoint) {
            this.checkSponsorPart();
        }
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

                this.getSponsors([1001, 1002, 1003]);
                this.getOrganisations([2001, 2002, 2003]);


                for (let sponsorPart of this.track.sponsorParts) {
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

    getSponsors(ids: number[]) {

        this.trackService.getSponsors(ids)
            .subscribe(sponsors => {
                this.sponsors = sponsors;
                console.log("getSponsors(" + ids + ") : " + this.sponsors);
                console.log(this.track);


                for (let sponsorPart of this.track.sponsorParts) {
                    //console.log("sponsorPart");
                    //console.log(sponsorPart);
                    sponsorPart = this.getSponsorPartPoints(sponsorPart);
                }
            });

    }

    getSponsorByName(name: String) {
    console.log("Sponsor-nickname: " + name);

        this.trackService.getSponsors([])
            .subscribe(sponsors => {

                for (let sponsor of sponsors) {
                    if (sponsor.name == name) {
                        this.sponsor = sponsor;
                        this.newSponsorPart.sponsorId = name;
                    }

                }
            });

    }


    getOrganisations(ids: number[]) {

        this.trackService.getOrganisations(ids)
            .subscribe(oragnisation => {
                this.organisations = oragnisation;
                console.log("getOrganisations(" + ids + ") : " + this.organisations);
                console.log(this.organisations);
            });

    }

    getSponsorColor(id: String): String {
        for (let sponsor of this.sponsors) {
            if (sponsor.id == id) {
                //console.log("Farbe: " + sponsor.trackColor);
                return sponsor.trackColor;
            }
        }
    }

    getSponsor(id: String): Sponsor {
        for (let sponsor of this.sponsors) {
            if (sponsor.id == id) {
                return sponsor;
            }
        }
    }

    getOrganisation(id: number): Organisation {
        for (let organisation of this.organisations) {
            if (organisation.id == id) {
                return organisation;
            }
        }
    }

    getUser(): AwsUser {
        return this.sharedUserService.sharedUser;
    }

    poiClick(poi: Poi) {
        console.log("POI klicked: " + poi.name);
        this.showPoi(poi);
    }

    storyClick(story: Story) {
        console.log("Story klicked: " + story.title);
        this.showStory(story);
    }


    addPoi() {

        this.trackService.addPoi(this.newPoi, this.track).subscribe(result => {
            console.log("addPoi: added Poi");
            console.log(this.newPoi);
            this.showAddPoi = false;
            this.newPoi = new Poi();
        });
    }


    getSponsorPartPoints(sponsorPart: SponsorPart): SponsorPart {
        let result: LatLngImpl[] = [];
        let foundStart: boolean = false;
        //console.log("suche...");
        //console.log(point.coord);
        //console.log(sponsorPart.startPoint);
        for (let point of this.track.points) {

            if (!foundStart && point[0] == sponsorPart.startPoint[0] && point[1] == sponsorPart.startPoint[1]) {
                foundStart = true;
                result.push(point);
                //console.log(sponsorPart.startPoint);
                //console.log("Start gefunden");
            }
            else if (foundStart && point[0] == sponsorPart.endPoint[0] && point[1] == sponsorPart.endPoint[1]) {
                foundStart = false;
                result.push(point);
                //console.log("Ende gefunden");
            }
            else if (foundStart) {
                result.push(point);
                //console.log("point added");
            }
        }
        //console.log("points added: "+result.length);
        sponsorPart.points = result;
        return sponsorPart;

    }

    sanitize(url: string) {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }

    polylineClicked($event: any) {
        console.log("PolyLineClicked() Vertex:" + $event.vertex);
        console.log("PolyLineClicked() path:" + $event.path);
        console.log("PolyLineClicked() edge:" + $event.edge);
        console.log($event);
        console.log($event.latLng.lat());
        console.log($event.latLng.lng());
        this.selectedPosition = new LatLngImpl($event.latLng.lat(), $event.latLng.lng());
    }

    infoWindowClosed($event) {
        this.selectedPosition = null;
    }

    getMedia(reference: String) {
        return this.sanitize(this.MEDIA_REF + '?id=' + reference)
    }

    addStory() {

        this.trackService.addStory(this.newStory, this.track).subscribe(result => {
            console.log("addStory: added Story");
            console.log(this.newStory);
            this.showAddStory = false;
            this.newStory = new Story();
        });

    }


    fileUpload(event: any) {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            console.log("fileUpload: " + fileList[0].name);
            this.trackService.uploadMedia(fileList[0]).subscribe(result => {
                console.log(result);
            });
        }
    }

    backClicked() {
        this._location.back();
    }

    closeConfirmation() {
        this.showConfirmation = !this.showConfirmation;
    }

}

