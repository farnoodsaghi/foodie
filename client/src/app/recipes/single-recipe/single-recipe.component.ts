import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCircleMinus, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { mergeMap, Subscription } from 'rxjs';
import { UserService } from 'src/app/account/user.service';

import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.css'],
})
export class SingleRecipeComponent implements OnInit, OnDestroy {
  recipe: any;
  recipeSubscription: Subscription;
  faPlus = faCirclePlus;
  faMinus = faCircleMinus;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.recipeSubscription = this.route.params
      .pipe(
        mergeMap((params) => {
          return this.recipesService.fetchRecipeById(params['id']);
        })
      )
      .subscribe((recipe) => {
        this.recipe = recipe;
        this.isLoading = false;
      });
  }

  get ingredients() {
    let ingredients = [];

    for (let i = 1; i <= 20; i++) {
      if (
        this.recipe[`strIngredient${i}`] &&
        this.recipe[`strIngredient${i}`] !== ''
      ) {
        ingredients.push({
          recipeId: this.recipe.idMeal,
          amount: this.recipe[`strMeasure${i}`],
          name: this.recipe[`strIngredient${i}`],
        });
      }
    }

    return ingredients;
  }

  onAddOrRemoveIngredient(ingredient) {
    this.userService.updateShoppingList(ingredient);
  }

  isInShoppingList(ingredient) {
    return this.userService.isIngredientInShoppingList(ingredient);
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }
}
