import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from '../../service/http.service';
import {UserService} from '../../service/user.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [HttpService]
})
export class RegistrationComponent implements OnInit {
  username: string;
  password: string;
  empty: boolean;
  constructor(private router: Router, @Inject(UserService) private userService: UserService, private cookieService: CookieService) { }
  ngOnInit() {
    this.username = '';
    this.password = '';
    if ((this.cookieService.get('activity') === 'yes')) {
      this.router.navigate(['playGame']);
    }
  }
  registration() {
    this.empty = false;
    this.userService.succes = false;
    this.userService.falseReg = false;
    if ((this.username === '') || (this.password === '')) {
      this.empty = true;
    } else {
      this.userService.singUp(this.username, this.password);
    }
  }
  entry() {
    this.router.navigate(['auth']);
  }
}
