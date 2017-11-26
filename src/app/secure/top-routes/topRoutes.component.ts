import {Component} from "@angular/core";
import {UserLoginService} from "../../service/user-login.service";
import {Callback, CognitoUtil, LoggedInCallback} from "../../service/cognito.service";
import {UserParametersService} from "../../service/user-parameters.service";
import {Router} from "@angular/router";


@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './topRoutes.html'
})
export class TopRoutesComponent {

    constructor() {
        console.log("In Top Routes");
    }

}

