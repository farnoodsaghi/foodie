import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './account/auth.service';
import { UserService } from './account/user.service';
import { RecipesService } from './recipes/recipes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'foodie';
  searchSubscription: Subscription;

  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authService.autoLogin();
    this.userService.setInitialFavorites();
    this.userService.setInitialShoppingList();
    this.searchSubscription =
      this.recipesService.onSearchQueryChanged.subscribe((query) => {
        if (!query || query === '') {
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['recipes/search']);
        }
      });
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }
}
