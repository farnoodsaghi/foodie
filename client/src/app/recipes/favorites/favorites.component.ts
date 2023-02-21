import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/account/user.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit, OnDestroy {
  recipes: any[] = [];
  recipeSubscription: Subscription;
  isLoading = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.recipeSubscription = this.userService
      .getFavoritesFull()
      .subscribe((recipes) => {
        this.recipes = recipes;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }
}
