import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-sign-up-card',
  templateUrl: './sign-up-card.component.html',
  styleUrls: ['./sign-up-card.component.css']
})
export class SignUpCardComponent implements OnInit {

  private username = '';
  private password = '';
  private error: string;

  constructor(private http: Http, private router: Router) { }

  get disableButton() {
    return this.username.length === 0 ||
           this.password.length === 0;
  }

  ngOnInit() {
  }

  submitSignup() {
    const payload = {
      username: this.username,
      password: this.password
    };
    const options = {
      withCredentials: true
    };
    const cookieUrl = 'http://localhost:5000/api/clients';
    const userUrl = 'http://localhost:5000/api/users';
    this.http
      .post(cookieUrl, options)
      .catch(() => this.http.put(userUrl, payload, options))
      .subscribe(
        () => {
          this.error = '';
          this.router.navigate(['/main']);
        },
        e => {
          if (e.status === 401) {
            this.error = 'Could not log in with those credentials';
          }
        },
      );
  }

}
