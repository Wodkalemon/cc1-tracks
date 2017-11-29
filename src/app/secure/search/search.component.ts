import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {SearchParam} from '../../Model/SearchParam';
import {TrackService} from '../../service/track.service';
import {Track} from '../../Model/Track';
import {NouiFormatter} from 'ng2-nouislider';
import {MyFormatter} from './slider-formatter';


@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './search.html',
    styleUrls: ['./search.scss']
})



export class SearchComponent implements OnInit {
    DIFFICULTY_TEXT={1:"Anfänger",2:"Leicht",3:"Mittel",4:"Schwer",5:"Experte"};
    public searchDistanceMin: number= 0;
    public searchDistanceMax: number= 10000;
    public searchDistance: number[] = [this.searchDistanceMin, this.searchDistanceMax];
    public searchDifficultyMin: number=0
    public searchDifficultyMax: number=5
    public searchDifficulty: number[] = [this.searchDifficultyMin, this.searchDifficultyMax];

    searchParam: SearchParam;
    searchResult: Track[];
    showSettings:boolean=false;

    public sliderConfig: any = {
        connect: true,
        start: [0,5],
        step: 1,
        range: {
            'min': [0],
            'max': [5]
        },
        pips: {
            mode: 'steps',
            density: 1000,
            format: new MyFormatter()
        }
    };

    ngOnInit() {
        this.searchParam = new SearchParam();
        this.searchParam.minDifficulty=this.searchDifficultyMin;
        this.searchParam.maxDifficulty=this.searchDifficultyMax;
        this.searchParam.minDistance=this.searchDistanceMin;
        this.searchParam.maxDistance=this.searchDistanceMax;
        //this.searchTracks();

    }


    constructor(private trackService: TrackService) {
        console.log("SearchComponent: constructor");

    }

    searchTracks() {
        console.log("called searchTracks()");
        console.log(this.searchParam);
        this.trackService.searchTracks(this.searchParam)
            .subscribe(searchResult => {
                this.searchResult = searchResult;
                console.log("searchTracks(): ");
                console.log(this.searchResult);

            });
        /*this.trackService.getTrack(1001)
            .subscribe(searchResult => {
                this.searchResult = [searchResult];
                console.log("searchTracks(): ");
                console.log(this.searchResult);

            });*/
    }

    setDuration(minMax: String){
        let min:number = +minMax.split(";")[0];
        let max:number = +minMax.split(";")[1];
        console.log("Min/Max Duration: " + min +"/"+ max);
        this.searchParam.minDuration = min*24;
        this.searchParam.maxDuration = max*24;
    }
    setDistance(minMax){
        console.log(minMax)
        this.searchParam.minDistance = minMax[0];
        this.searchParam.maxDistance = minMax[1];
    }
    setDifficulty(minMax){
        console.log(minMax)
        this.searchParam.minDifficulty = minMax[0];
        this.searchParam.maxDifficulty = minMax[1];
    }



}


