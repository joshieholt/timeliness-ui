import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {

  constructor(private http: Http, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    const options = {
      withCredentials: true
    };

    const logoutUrl = 'http://localhost:5000/api/session/mine';
    this.http
      .delete(logoutUrl, options)
      .subscribe(
        () => this.router.navigate(['/']),
        error => console.error('Error loggin out', error)
      );
  }
}
