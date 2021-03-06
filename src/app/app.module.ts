import {BrowserModule, DomSanitizer} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {UserRegistrationService} from "./service/user-registration.service";
import {UserParametersService} from "./service/user-parameters.service";
import {UserLoginService} from "./service/user-login.service";
import {CognitoUtil} from "./service/cognito.service";
import {routing} from "./app.routes";
import {AboutComponent, HomeComponent, HomeLandingComponent} from "./public/home.component";
import {AwsUtil} from "./service/aws.service";
import {UseractivityComponent} from "./secure/useractivity/useractivity.component";
import {MyProfileComponent} from "./secure/profile/myprofile.component";
import {SecureHomeComponent} from "./secure/landing/securehome.component";
import {JwtComponent} from "./secure/jwttokens/jwt.component";
import {SearchComponent} from "./secure/search/search.component";
import {TopRoutesComponent} from "./secure/top-routes/topRoutes.component";
import {DynamoDBService} from "./service/ddb.service";
import {LoginComponent} from "./public/auth/login/login.component";
import {RegisterComponent} from "./public/auth/register/registration.component";
import {ForgotPassword2Component, ForgotPasswordStep1Component} from "./public/auth/forgot/forgotPassword.component";
import {LogoutComponent, RegistrationConfirmationComponent} from "./public/auth/confirm/confirmRegistration.component";
import {ResendCodeComponent} from "./public/auth/resend/resendCode.component";
import {NewPasswordComponent} from "./public/auth/newpassword/newpassword.component";
import {HttpClientModule} from '@angular/common/http';


import {TrackDetailsComponent} from './secure/track-details/track-details.component';

import {TrackService} from './service/track.service';

import { AgmCoreModule } from '@agm/core';
import { NouisliderModule } from 'ng2-nouislider';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import {SharedUserService} from './service/shared-user.service';
import {DialogComponent} from './secure/dialog/dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SponsorBuyComponent} from './secure/sponsor-buy/sponsor-buy.component';
import {HaversineService} from 'ng2-haversine';
import {PageSliderModule} from 'ng2-page-slider';
import { CarouselModule } from './secure/carousel/carousel.module';





@NgModule({
    declarations: [
        NewPasswordComponent,
        LoginComponent,
        LogoutComponent,
        RegistrationConfirmationComponent,
        ResendCodeComponent,
        ForgotPasswordStep1Component,
        ForgotPassword2Component,
        RegisterComponent,
        AboutComponent,
        HomeLandingComponent,
        HomeComponent,
        UseractivityComponent,
        MyProfileComponent,
        SecureHomeComponent,
        JwtComponent,
        SearchComponent,
        TopRoutesComponent,
        AppComponent,


        TrackDetailsComponent,
        DialogComponent,
        SponsorBuyComponent

    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        NouisliderModule,
        HttpClientModule,
        NgbModule.forRoot(),

        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD6O0Z3glNdE9eHeoAECtVF8ZinHSjCCzA'
        }),
        AgmJsMarkerClustererModule,
        BrowserAnimationsModule,
        PageSliderModule,
        CarouselModule,


    ],
    providers: [
        CognitoUtil,
        AwsUtil,
        DynamoDBService,
        UserRegistrationService,
        UserLoginService,
        UserParametersService,
        HaversineService,
        TrackService,
        SharedUserService
        ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
