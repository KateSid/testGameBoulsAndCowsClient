import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from '../service/http.service';
import {UserAttemptService} from '../service/userAttempt.service';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.css'],
  providers: [HttpService]
})
export class PlayGameComponent implements OnInit {
  private cookieValue: string;
  private cookieValueToken: string;
  private digit: string;
  private digit1: number;
  private digit2: number;
  private digit3: number;
  private digit4: number;
  private eq: boolean;
  private win: boolean;
  private startg: boolean;
  constructor(private router: Router, @Inject(UserAttemptService) private userAttemptService: UserAttemptService,
              private cookieService: CookieService, @Inject(UserService) private userService: UserService,
              @Inject(HttpService) private httpService: HttpService) {
  }

  ngOnInit() {
    if (this.cookieService.get('activity') === 'yes') {
      this.startg = false;
      this.digit1 = 1;
      this.digit2 = 2;
      this.digit3 = 3;
      this.digit4 = 4;
      this.cookieValue = this.cookieService.get('username');
      this.cookieValueToken = this.cookieService.get('token');
      this.userService.user.username = this.cookieValue;
      if (this.cookieService.get('game-playing') === 'yes') {
        this.startg = true;
        this.userAttemptService.getAttempts(this.cookieValueToken);
      }
      this.userService.getUserInfo(this.cookieValue, this.cookieValueToken);
    } else {
      this.router.navigate(['auth']);
    }
  }
  start() {
    this.cookieService.set('game-playing', 'yes');
    this.win = false;
    this.startg = true;
    this.userAttemptService.start(this.cookieValueToken);
  }
  signOut() {
    this.cookieService.set('username', '');
    this.cookieService.set('token', '');
    this.cookieService.set('game-playing', '');
    this.cookieService.set('activity', '');
    this.router.navigate(['auth']);
  }
  async play() {
    this.eq = false;
    this.win = false;
    if (this.digit1 === this.digit2 || this.digit1 === this.digit3 ||
      this.digit1 === this.digit4 || this.digit2 === this.digit3 ||
      this.digit2   === this.digit4 || this.digit3 === this.digit4) {
      this.eq = true;
    } else {
        this.digit = this.digit1.toString() + this.digit2.toString() + this.digit3.toString() + this.digit4.toString();
        await this.userAttemptService.userTurn(this.digit, this.cookieValueToken);
        await this.userAttemptService.getAttempts(this.cookieValueToken);
        if (this.userAttemptService.end === true) {
          this.userService.getUserInfo(this.cookieValue, this.cookieValueToken);
          this.win = true;
          this.startg = false;
        }
      }
    }
}
