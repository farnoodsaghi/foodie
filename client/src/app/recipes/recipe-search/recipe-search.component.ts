import { Component, OnDestroy, OnInit } from '@angular/core';
import { mergeMap, Subscription } from 'rxjs';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.css'],
})
export class RecipeSearchComponent implements OnInit, OnDestroy {
  recipes: any[] = [];
  recipeSubscription: Subscription;
  isLoading = false;
  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.recipeSubscription = this.recipesService.onSearchQueryChanged
      .pipe(
        mergeMap((query) => {
          return this.recipesService.fetchSearchedResults(query);
        })
      )
      .subscribe((recipes) => {
        this.recipes = recipes;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }
}
