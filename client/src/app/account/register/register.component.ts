import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  signupError = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.signupError = null;
      this.authService.register(this.registerForm.value).subscribe(
        (res: any) => {
          this.userService.user.next(new User(res.name, res.email));
          localStorage.setItem('token', res.token);
          this.router.navigate(['/']);
        },
        (error) => {
          this.signupError = error.error.message;
          console.log(error);
        }
      );
      this.registerForm.reset();
    } else {
      this.signupError = 'invalid input';
    }
  }
}
