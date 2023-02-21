import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }
  onSubmit = () => {
    if (this.loginForm.valid) {
      this.loginError = null;
      this.authService
        .login(this.loginForm.value)
        .pipe(take(1))
        .subscribe(
          (res) => {
            this.userService.user.next(new User(res.user.name, res.user.email));
            localStorage.setItem('token', res.token);
            this.userService.setInitialFavorites();
            this.userService.setInitialShoppingList();
            this.router.navigate(['/']);
          },
          (error) => {
            this.loginError = error.error.message;
            console.log(error);
          }
        );
      this.loginForm.reset();
    } else {
      this.loginError = 'invalid input';
    }
  };
}
