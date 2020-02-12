import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {User} from '../model/user';

@Injectable()
export class HttpService {
  private token: string;
  private url = 'http://localhost:8080/';
  constructor(private http: HttpClient) {
  }

  public login(user: User) {
    const body = {
      username: user.username, password: user.password
    };
    return this.http.post<any>(this.url + 'login', body, {observe: 'response'});
  }
  public getUserInfo(username: string, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' ,
        Authorization: token,
        Accept : 'application/json'
      })
    };
    return this.http.get(this.url + 'currentUserInfo/' + username, httpOptions);
  }
  public getAttempts(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' ,
        Authorization: token,
        Accept : 'application/json'
      })
    };
    return this.http.get(this.url + 'getAttempts', httpOptions);
  }
  public getToken() {
    return this.token;
  }
  public setToken(token: string) {
    this.token = token;
  }
  public startGame(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' ,
        Authorization: token,
        Accept : 'application/json'
      })
    };
    return this.http.get(this.url + 'start', httpOptions);
  }
  public userTurn(userNumber: string, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' ,
        Authorization: token,
        Accept : 'application/json'
      })
    };
    return this.http.get(this.url + 'userTurn/' + userNumber, httpOptions);
  }

  public signup(user: User) {
    const body = {
      username: user.username, password: user.password
    };
    return this.http.post(this.url + 'sign-up', body);
  }
}
