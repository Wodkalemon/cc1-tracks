import {Component, EventEmitter, OnInit} from "@angular/core";
import {LatLng, PolyMouseEvent} from '@agm/core';
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
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {Media} from '../../Model/Media';


@Component({
    selector: 'track-details',
    templateUrl: './track-details.html',
    styleUrls: ['./track-details.scss']
})
export class TrackDetailsComponent implements OnInit {

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
    sponsors: Sponsor[];
    organisations: Organisation[];
    selectedPoi: Poi;
    selectedStory: Story;
    selectedSponsorPart: SponsorPart;
    selectedPosition: number[];
    lat: number = 50.357968;
    lng: number = 7.569099;

    showAddStory = false;
    showAddPoi = false;
    newStory: Story = new Story();
    newPoi: Poi = new Poi();

    public myInterval:number = 5000;
    public noWrapSlides:boolean = false;
    public slides:Array<any> = [];

    constructor(private route: ActivatedRoute, private trackService: TrackService, private sharedUserService: SharedUserService, private sanitizer: DomSanitizer) {
        console.log("TrackDetailsComponent: constructor");

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
        for (let i = 0; i < 4; i++) {
            this.addSlide();
        }


    }

    public addSlide():void {
        let newWidth = 600 + this.slides.length + 1;
        this.slides.push({
            image: `//placekitten.com/${newWidth}/300`,
            text: `${['More', 'Extra', 'Lots of', 'Surplus'][this.slides.length % 4]}
      ${['Cats', 'Kittys', 'Felines', 'Cutes'][this.slides.length % 4]}`
        });
    }

    isSponsor() {
        let user = this.getUser();
        if (this.getUser() && this.getUser().customGroup == "sponsor"){
            return true;
        }
        return false;
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

    updateTrack(id: number) {
        this.trackService.getTrack(id)
            .subscribe(track => {
                this.track = track;
                console.log("getTrack(" + id + ").name : " + this.track.name);
                console.log(this.track);

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

    getOrganisations(ids: number[]) {

        this.trackService.getOrganisations(ids)
            .subscribe(oragnisation => {
                this.organisations = oragnisation;
                console.log("getOrganisations(" + ids + ") : " + this.organisations);
                console.log(this.organisations);
            });

    }

    getSponsorColor(id: number): String {
        for (let sponsor of this.sponsors) {
            if (sponsor.id == id) {
                //console.log("Farbe: " + sponsor.trackColor);
                return sponsor.trackColor;
            }
        }
    }

    getSponsor(id: number): Sponsor {
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

    showAddPoiModal(lng: number, lat: number) {
        this.showAddPoi = true;
        this.newPoi = new Poi();
        this.newPoi.location = [lng, lat];

    }

    showAddStoryModal(lng: number, lat: number) {
        this.showAddStory = true;
        this.newStory = new Story();
        this.newStory.point = [lng, lat];
    }

    addStory() {

        this.trackService.addStory(this.newStory, this.track).subscribe(result => {
            console.log("addStory: added Story");
            console.log(result);
            this.showAddStory = false;
            this.selectedPosition = null;
            this.newStory = new Story();
            this.updateTrack(this.track.id);
        });

    }

    addPoi() {

        this.trackService.addPoi(this.newPoi, this.track).subscribe(result => {
            console.log("addPoi: added Poi");
            console.log(result);
            this.showAddPoi = false;
            this.selectedPosition = null;
            this.newPoi = new Poi();
            this.updateTrack(this.track.id);
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
        console.log($event);
        console.log($event.latLng.lat());
        console.log($event.latLng.lng());
        //this.selectedPosition = new LatLngImpl($event.latLng.lng(), $event.latLng.lat());
        this.selectedPosition = [$event.latLng.lng(), $event.latLng.lat()];
        console.log(this.selectedPosition);

    }

    infoWindowClosed($event) {
        this.selectedPosition = null;
    }

    getMedia(reference: String) {
        console.log("getmedia:" + this.MEDIA_REF + '?id=' + reference);
        return this.sanitize(this.MEDIA_REF + '?id=' + reference)
    }



    addMedia2NewStory(event: any) {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            console.log("fileUpload: " + fileList[0].name);
            this.trackService.uploadMedia(fileList[0]).subscribe(result => {
                console.log(result);
                let media = new Media();
                media.reference = result.id;
                media.typ = result.type;

                if (!this.newStory.media) {
                    this.newStory.media = [];
                }
                this.newStory.media.push(media);
                console.log(this.newStory);

            });
        }

    }

    addMedia2NewPoi(event: any) {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            console.log("fileUpload: " + fileList[0].name);
            this.trackService.uploadMedia(fileList[0]).subscribe(result => {
                console.log(result);
                let media = new Media();
                media.reference = result.id;
                media.typ = result.type;

                if (!this.newPoi.media) {
                    this.newPoi.media = [];
                }
                this.newPoi.media.push(media);
                console.log(this.newPoi);

            });
        }

    }


    fileUpload(event: any): String {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            console.log("fileUpload: " + fileList[0].name);
            this.trackService.uploadMedia(fileList[0]).subscribe(result => {
                console.log(result);
                return result.id;
            });
        } else {
            return "";
        }

    }


}

