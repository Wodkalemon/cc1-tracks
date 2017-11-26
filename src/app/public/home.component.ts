import {Component, OnInit} from "@angular/core";
import {NavigationStart, Router} from '@angular/router';
import {UserLoginService} from '../service/user-login.service';
import {Callback, CognitoUtil, LoggedInCallback} from '../service/cognito.service';
import {MyProfileComponent} from '../secure/profile/myprofile.component';
import {UserParametersService} from '../service/user-parameters.service';
import {CongitoUser} from '../Model/CongitoUser';

declare let AWS: any;
declare let AWSCognito: any;

@Component({
    selector: 'awscognito-angular2-app',
    template: '<p>Hello and welcome!"</p>'
})
export class AboutComponent {

}

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './landinghome.html'
})
export class HomeLandingComponent {
    constructor() {
        console.log("HomeLandingComponent constructor");
    }
}

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './home.html'
})
export class HomeComponent implements OnInit, LoggedInCallback {

    user: CongitoUser;


    constructor(public router: Router, public userService: UserLoginService, public userParams: UserParametersService, public cognitoUtil: CognitoUtil) {
        this.userService.isAuthenticated(this);
        console.log("SecureHomeComponent: constructor");

        router.events.forEach((event) => {
            if (event instanceof NavigationStart) {
                this.userService.isAuthenticated(this);
            }
        });
    }

    /*
    constructor() {
        console.log("HomeComponent constructor");
    }
    */

    ngOnInit() {

    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (isLoggedIn) {
            console.log("HomeComponent: User is logged in!" + message)
            this.userParams.getParameters(new GetParametersCallback(this, this.cognitoUtil));

        } else {
            console.log("HomeComponent: User is NOT logged in!" + message)
            this.user = null;
            //this.router.navigate(['/home/login']);
        }
    }
}

export class Parameters {
    name: string;
    value: string;
}

export class GetParametersCallback implements Callback {

    constructor(public me: HomeComponent, public cognitoUtil: CognitoUtil) {

    }

    callback() {

    }

    callbackWithParam(result: any) {
        this.me.user = new CongitoUser();
        for (let i = 0; i < result.length; i++) {
            switch (result[i].getName()) {
                case "email_verified":
                    this.me.user.email_verified = result[i].getValue();
                    break;
                case "email":
                    this.me.user.email = result[i].getValue();
                    break;
                case "nickname":
                    this.me.user.nickname = result[i].getValue();
                    break;
                case "custom:group":
                    this.me.user.customGroup = result[i].getValue();
                    break;
                case "sub":
                    this.me.user.sub = result[i].getValue();
                    break;
                default:
                    console.log(result[i].getName() + "=>" + result[i].getValue());
            }
        }
        console.log("User added");
        console.log(this.me.user);
    }
}
