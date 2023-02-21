import { Component, OnInit } from '@angular/core';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../account/auth.service';
import { UserService } from '../account/user.service';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  navItemsList = [];
  authLink = {
    id: '3',
    name: 'Login',
    url: 'account/login',
  };
  isSideBarOpen = false;
  faBars = faBars;
  xMark = faXmark;
  constructor(
    private navbarService: NavbarService,
    private userService: UserService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.navItemsList = this.navbarService.navItemsList;
    this.userService.user.subscribe((user) => {
      if (user) {
        this.authLink.name = 'Logout';
      } else {
        this.authLink.name = 'Login';
      }
    });
  }

  onLogout() {
    this.authService.logOut();
  }

  toggleSideBar() {
    this.isSideBarOpen = !this.isSideBarOpen;
  }
}
