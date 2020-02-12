import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
@Injectable()
export class AuthComponent implements OnInit {

  username: string;
  password: string;
  constructor(private router: Router, @Inject(UserService) private userService: UserService, private cookieService: CookieService) {
    this.userService.wait = false;
    this.username = '';
    this.password = '';
  }
  ngOnInit() {
    if ((this.cookieService.get('activity') === 'yes')) {
      this.router.navigate(['playGame']);
    }
  }
  registration() {
    this.router.navigate(['registration']);
  }

   tryLogin() {
     this.userService.wait = false;
     this.userService.login(this.username, this.password);
   }
}

