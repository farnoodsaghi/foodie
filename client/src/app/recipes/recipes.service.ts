import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  onSearchQueryChanged = new Subject<string>();
  constructor(private http: HttpClient) {}

  fetchRecipesByCategory(category: string) {
    return this.http
      .get<{ meals: any[] }>(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      )
      .pipe(map((response) => response.meals));
  }

  fetchRecipeById(id: string) {
    return this.http
      .get<{ meals: any[] }>(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      )
      .pipe(map((response) => response.meals[0]));
  }

  fetchSearchedResults(query: string) {
    return this.http
      .get<{ meals: any[] }>(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      )
      .pipe(map((response) => response.meals));
  }
}
