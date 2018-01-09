import {Component} from "@angular/core";
import {UserLoginService} from "../../service/user-login.service";
import {Callback, CognitoUtil, LoggedInCallback} from "../../service/cognito.service";
import {UserParametersService} from "../../service/user-parameters.service";
import {Router} from "@angular/router";


@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './topRoutes.html',
    styleUrls: ['./topRoutes.scss']
})
export class TopRoutesComponent {

    constructor() {
        console.log("In Top Routes");
    }
    //dummy values for dummy results delete this
    ratingOne = 4;
    ratingTwo = 3;

}

