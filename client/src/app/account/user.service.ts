import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  defaultIfEmpty,
  forkJoin,
  map,
  mergeMap,
  Subject,
  take,
} from 'rxjs';
import { RecipesService } from '../recipes/recipes.service';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  favoriteRecipes: string[] = [];
  favoritesChanged = new BehaviorSubject<string[]>([]);
  shoppingList: Ingredient[] = [];
  shoppingListChanged = new BehaviorSubject<Ingredient[]>([]);
  user = new Subject<User>();

  constructor(
    private recipesService: RecipesService,
    private http: HttpClient
  ) {}

  setInitialFavorites() {
    this.http
      .get('http://localhost:3000/recipes', {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        take(1),
        map((res: any) => {
          return res.recipes;
        })
      )
      .subscribe((recipes) => {
        this.favoriteRecipes = recipes.map((recipe) => recipe.id);
        this.favoritesChanged.next(recipes.map((recipe) => recipe.id));
      });
  }

  setInitialShoppingList() {
    this.http
      .get('http://localhost:3000/shopping-list', {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        take(1),
        map((res: any) => {
          return res.shoppingList;
        })
      )
      .subscribe((shoppingList) => {
        this.shoppingList = shoppingList.map((item: any) => {
          const { id, name, amount, recipeId } = item;
          return { id, name, amount, recipeId };
        });
        this.shoppingListChanged.next(this.getShoppingList());
      });
  }

  clearFavorites() {
    this.favoriteRecipes = [];
    this.favoritesChanged.next([]);
  }

  clearShoppingList() {
    this.shoppingList = [];
    this.shoppingListChanged.next([]);
  }

  getFavoriteRecipes(): string[] {
    return this.favoriteRecipes.slice();
  }

  getShoppingList(): Ingredient[] {
    return this.shoppingList.slice();
  }

  updateFavorites(id: string): void {
    const token = localStorage.getItem('token');
    if (this.favoriteRecipes.includes(id)) {
      this.favoriteRecipes = this.favoriteRecipes.filter(
        (recipeId) => recipeId !== id
      );
      this.http
        .delete(`http://localhost:3000/recipes/${id}`, {
          headers: { authorization: `Bearer ${token}` },
        })
        .subscribe();
    } else {
      this.favoriteRecipes.push(id);
      this.http
        .post(
          'http://localhost:3000/recipes',
          { id: id },
          { headers: { authorization: `Bearer ${token}` } }
        )
        .subscribe();
    }
    this.favoritesChanged.next(this.getFavoriteRecipes());
  }

  isRecipeFavorited(id: string) {
    return this.favoriteRecipes.includes(id);
  }

  getFavoritesFull() {
    return this.favoritesChanged.pipe(
      mergeMap((recipeIds) => {
        const recipeObsArr = recipeIds.map((id) => {
          return this.recipesService.fetchRecipeById(id);
        });
        return forkJoin(recipeObsArr).pipe(defaultIfEmpty([]));
      })
    );
  }

  updateShoppingList(ingredient: Ingredient) {
    const token = localStorage.getItem('token');
    if (
      this.shoppingList.some(
        (item) =>
          item.recipeId === ingredient.recipeId && item.name === ingredient.name
      )
    ) {
      this.shoppingList = this.shoppingList.filter((item) => {
        return (
          item.recipeId !== ingredient.recipeId ||
          (item.recipeId === ingredient.recipeId &&
            item.name !== ingredient.name)
        );
      });
      this.http
        .put(
          'http://localhost:3000/shopping-list',
          {
            shoppingList: this.shoppingList,
          },
          {
            headers: { authorization: `Bearer ${token}` },
          }
        )
        .subscribe();
    } else {
      const newItem = { id: uuidv4(), ...ingredient };
      this.shoppingList.push(newItem);
      this.http
        .post('http://localhost:3000/shopping-list', newItem, {
          headers: { authorization: `Bearer ${token}` },
        })
        .subscribe();
    }
    this.shoppingListChanged.next(this.getShoppingList());
  }

  manualShoppingListAddOrUpdate(ingredient: Ingredient) {
    const token = localStorage.getItem('token');
    if (ingredient.id) {
      this.shoppingList = this.shoppingList.map((item) => {
        if (item.id === ingredient.id) {
          return ingredient;
        }
        return item;
      });
      this.http
        .put(
          'http://localhost:3000/shopping-list',
          {
            shoppingList: this.shoppingList,
          },
          {
            headers: { authorization: `Bearer ${token}` },
          }
        )
        .subscribe();
    } else {
      const newItem = { ...ingredient, id: uuidv4() };
      this.shoppingList.push(newItem);
      this.http
        .post('http://localhost:3000/shopping-list', newItem, {
          headers: { authorization: `Bearer ${token}` },
        })
        .subscribe();
    }
    this.shoppingListChanged.next(this.getShoppingList());
  }

  manualShoppingListRemove(ingredient: Ingredient) {
    this.shoppingList = this.shoppingList.filter(
      (item) => item.id !== ingredient.id
    );
    this.shoppingListChanged.next(this.getShoppingList());
    this.http
      .delete(`http://localhost:3000/shopping-list/${ingredient.id}`, {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .subscribe();
  }

  isIngredientInShoppingList(ingredient: Ingredient) {
    return this.shoppingList.some(
      (item) =>
        item.recipeId === ingredient.recipeId && item.name === ingredient.name
    );
  }
}
