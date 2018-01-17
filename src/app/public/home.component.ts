import {Component, OnInit} from "@angular/core";
import {NavigationStart, Router} from '@angular/router';
import {UserLoginService} from '../service/user-login.service';
import {Callback, CognitoUtil, LoggedInCallback} from '../service/cognito.service';
import {MyProfileComponent} from '../secure/profile/myprofile.component';
import {UserParametersService} from '../service/user-parameters.service';
import {AwsUser} from '../Model/AwsUser';
import {SharedUserService} from '../service/shared-user.service';
import {JwtComponent} from '../secure/jwttokens/jwt.component';
import {Location} from '@angular/common';

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
    templateUrl: './home.html',
    styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit, LoggedInCallback {

    user: AwsUser;


    constructor(public router: Router, public userService: UserLoginService, public userParams: UserParametersService, private _location: Location, public cognitoUtil: CognitoUtil, public sharedUserService: SharedUserService) {
        this.userService.isAuthenticated(this);
        console.log("SecureHomeComponent: constructor");

        router.events.forEach((event) => {
            if (event instanceof NavigationStart) {
                this.userService.isAuthenticated(this);
            }
        });

    }

    backClicked() {
        this._location.back();
    }

    refreshClicked() {
        //this._location.reload();
        window.location.reload();
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
            this.sharedUserService.sharedUser = null;
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
        let user = new AwsUser();
        for (let i = 0; i < result.length; i++) {
            switch (result[i].getName()) {
                case "email_verified":
                    user.email_verified = result[i].getValue();
                    break;
                case "email":
                    user.email = result[i].getValue();
                    break;
                case "nickname":
                    user.nickname = result[i].getValue();
                    break;
                case "custom:group":
                    user.customGroup = result[i].getValue();
                    break;
                case "sub":
                    user.sub = result[i].getValue();
                    break;
                default:
                    console.log(result[i].getName() + "=>" + result[i].getValue());
            }
        }
        this.me.sharedUserService.sharedUser = user;
        this.me.user = user;
        console.log("User added");
        console.log(this.me.sharedUserService.sharedUser);

        this.cognitoUtil.getIdToken(new IdTokenCallback(this.me));

    }
}

export class IdTokenCallback implements Callback {
    constructor(public me: HomeComponent) {

    }

    callback() {

    }

    callbackWithParam(result) {
        this.me.sharedUserService.sharedUser.idToken = result
    }
}
