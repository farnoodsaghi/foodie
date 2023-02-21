import { Component, Input } from '@angular/core';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/account/user.service';

@Component({
  selector: 'app-recipe-slider-item',
  templateUrl: './recipe-slider-item.component.html',
  styleUrls: ['./recipe-slider-item.component.css'],
})
export class RecipeSliderItemComponent {
  @Input() recipe: any;
  faHeart = faHeart;
  faHeartSolid = faHeartSolid;

  constructor(private userService: UserService) {}

  onFavorite(event: Event): void {
    event.stopPropagation();
    this.userService.updateFavorites(this.recipe.idMeal);
  }

  isFavorited(): boolean {
    return this.userService.isRecipeFavorited(this.recipe.idMeal);
  }
}
