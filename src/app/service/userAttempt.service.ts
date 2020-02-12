import {Inject, Injectable} from '@angular/core';
import {UserAttempt} from '../model/userAttempt';
import {HttpService} from './http.service';
import {User} from '../model/user';
import {Resp} from '../model/response';

@Injectable()
export class UserAttemptService {
  public userAttempts: UserAttempt[];
  public user: User;
  public end: boolean;
  constructor(@Inject(HttpService) private httpService: HttpService) {
    this.user = new User();
    this.user.username = '';
    this.user.password = '';
  }

  public async getAttempts(token: string) {
    this.httpService.getAttempts(token).toPromise().then((data: UserAttempt[]) => {
      this.userAttempts = data as UserAttempt[];
    });
  }
  public start(token: string) {
    this.end = false;
    this.httpService.startGame(token).subscribe((data: UserAttempt[]) => {
      this.userAttempts = data as UserAttempt[];
    });
  }
  public async userTurn(digit: string, token: string) {
    await this.httpService.userTurn(digit, token).toPromise().then((data: Resp) => {
      if (data.Resp === 'Win') {
        this.end = true;
      }
    });
  }
}
