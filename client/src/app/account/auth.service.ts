import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginMode = true;
  constructor(private http: HttpClient, private userService: UserService) {}

  switchMode() {
    this.loginMode = !this.loginMode;
  }

  login(formData: { email: string; password: string }) {
    const { email, password } = formData;
    return this.http.post<{ message: string; user: User; token: string }>(
      'http://localhost:3000/auth/login',
      {
        email,
        password,
      }
    );
  }

  autoLogin() {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    this.http
      .get('http://localhost:3000/auth/validate', {
        headers: { authorization: `Bearer ${token}` },
      })
      .subscribe((res: any) => {
        if (res.user) {
          const { name, email } = res.user;
          this.userService.user.next(new User(name, email));
        }
      });
  }

  register(formData: { name: string; email: string; password: string }) {
    const { name, email, password } = formData;
    return this.http.post<{ user: User }>(
      'http://localhost:3000/auth/register',
      {
        name,
        email,
        password,
      }
    );
  }

  logOut() {
    this.userService.user.next(null);
    this.userService.clearFavorites();
    this.userService.clearShoppingList();
    localStorage.removeItem('token');
  }
}
