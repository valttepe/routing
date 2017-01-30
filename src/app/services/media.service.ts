import { Injectable, Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class MediaService {
  private url: string ='http://media.mw.metropolia.fi/wbma';
  private user: any = {
  };
  constructor(private http: Http, private router: Router) { }
  setUser = (user) => {
    this.user = user;
    console.log(this.user);
  }
 

  login = () => {
    // this.http.post(this.url, this.user)
    return this.http.post(this.url+'/login', this.user)
    .subscribe(
      resp => {
        console.log(resp.json());
        const dataFromServer = resp.json();
        // save userdata to local storage
        this.user = dataFromServer.user;
        this.user.token = dataFromServer.token;
        console.log(this.user);
        //save userdata to local storage and redirect to front
        localStorage.setItem("user", JSON.stringify(this.user));
        this.router.navigate(['front']);
      },
      error => {
        console.log(error);
      }
    );
  }

/*
login(username: string, password: string) {
    const url: string = 'http://media.mw.metropolia.fi/wbma/login';
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    let data = `{
        "username": "${username}",
        "password": "${password}"
        }`;
        console.log(data);
    return this.http.post(url, data, options).map
      (resp => resp.json());

  }
*/
  

}
