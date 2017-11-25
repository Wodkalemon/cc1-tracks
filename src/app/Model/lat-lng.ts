import {LatLng} from '@agm/core';


export class LatLngImpl {
    coord:number[];
    //lat:number;
    //lng:number;

    constructor(lat: number, lng: number) {
        this.coord = [lat, lng]
        //this.lat = lat;
        //this.lng = lng;
    }

}
