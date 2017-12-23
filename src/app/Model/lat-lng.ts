import {LatLng} from '@agm/core';


export class LatLngImpl {
    coord:number[];
    //lat:number;
    //lng:number;

    constructor(lng: number, lat: number) {
        this.coord = [lng, lat]
        //this.lat = lat;
        //this.lng = lng;
    }

}
