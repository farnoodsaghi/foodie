import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { RegisterComponent } from './account/register/register.component';
import { LoginComponent } from './account/login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarSearchComponent } from './navbar/navbar-search/navbar-search.component';
import { NavbarItemComponent } from './navbar/navbar-item/navbar-item.component';
import { RecipeSliderComponent } from './recipe-slider/recipe-slider.component';
import { RecipeSliderItemComponent } from './recipe-slider/recipe-slider-item/recipe-slider-item.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeGridListComponent } from './recipes/recipe-grid-list/recipe-grid-list.component';
import { FavoritesComponent } from './recipes/favorites/favorites.component';
import { RecipeSearchComponent } from './recipes/recipe-search/recipe-search.component';
import { RecipeItemComponent } from './recipes/recipe-item/recipe-item.component';
import { SingleRecipeComponent } from './recipes/single-recipe/single-recipe.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import { ShoppingListItemComponent } from './shopping-list/shopping-list-item/shopping-list-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    NavbarSearchComponent,
    NavbarItemComponent,
    RecipeSliderComponent,
    RecipeSliderItemComponent,
    HomeComponent,
    PageNotFoundComponent,
    RecipesComponent,
    RecipeGridListComponent,
    FavoritesComponent,
    RecipeSearchComponent,
    RecipeItemComponent,
    SingleRecipeComponent,
    LoadingSpinnerComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    ShoppingListItemComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
