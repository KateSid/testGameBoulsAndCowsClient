import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpService} from './service/http.service';
import { PlayGameComponent } from './play-game/play-game.component';
import {UserAttempt} from './model/userAttempt';
import {UserAttemptService} from './service/userAttempt.service';
import { RegistrationComponent } from './modals-form/registration/registration.component';
import {AuthComponent} from './modals-form/auth/auth.component';
import {User} from './model/user';
import {UserService} from './service/user.service';
import {CookieService} from 'ngx-cookie-service';
// определение маршрутов

const appRoutes: Routes = [
  {path: 'playGame', component: PlayGameComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: '**', redirectTo: 'auth'}
];

@NgModule({
  declarations: [
    AppComponent,
    PlayGameComponent,
    RegistrationComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes), HttpClientModule, FormsModule
  ],
  providers: [UserAttempt, HttpService, UserAttemptService, User, UserService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
