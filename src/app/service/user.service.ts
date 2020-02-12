import {User} from '../model/user';
import {Inject, Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Resp} from '../model/response';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class UserService {
  public user: User;
  private activity = false;
  public wait: boolean;
  public falseReg: boolean;
  public succes: boolean;

  constructor(private router: Router, @Inject(HttpService) private httpService: HttpService, private cookieService: CookieService) {
    this.user = new User();
    this.wait = false;
  }
  public getUserInfo(username: string, token: string) {
  this.httpService.getUserInfo(username, token).subscribe((data: User ) => {
    this.user.average = data.average;
    this.user.games = data.games;
    this.user.points = data.points;
  });
  }
  public singUp(username: string, password: string) {
    this.user.username = username;
    this.user.password = password;
    this.httpService.signup(this.user).subscribe((body: Resp) => {
      if (body.Resp === 'User exists') {
        this.falseReg = true;
      } else {
        this.succes = true;
      }
    });
  }
  public login(username: string, password: string) {
      this.user.username = username;
      this.user.password = password;
      this.httpService.login(this.user).subscribe(response => {
          this.httpService.setToken(response.headers.get('authorization'));
          this.setActivity(true);
          this.cookieService.set('username', username);
          this.cookieService.set('token', this.httpService.getToken());
          this.activityResp();
        },
        err => {
          this.setActivity(false);
          this.activityResp();
        });
}
  public activityResp() {
    if (this.getActivity() === true) {
      this.cookieService.set('activity', 'yes');
      this.router.navigateByUrl('playGame');
    } else {
      this.wait = true;
    }
  }
  public getActivity() {
    return this.activity;
  }
  public setActivity(state: boolean) {
    this.activity = state;
  }
}
