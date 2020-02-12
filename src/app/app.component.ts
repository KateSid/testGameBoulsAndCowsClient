import {Component, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {UserAttemptService} from './service/userAttempt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, @Inject(UserAttemptService) private userAttemptService: UserAttemptService) {
  }
}
