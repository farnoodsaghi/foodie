import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { RecipesService } from '../recipes/recipes.service';

@Component({
  selector: 'app-recipe-slider',
  templateUrl: './recipe-slider.component.html',
  styleUrls: ['./recipe-slider.component.css'],
})
export class RecipeSliderComponent implements OnInit {
  @Input() category: string;
  @ViewChild('slider') sliderRef: ElementRef;
  recipes: any[];
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    this.recipesService
      .fetchRecipesByCategory(this.category)
      .subscribe((recipes) => {
        this.recipes = recipes;
      });
  }

  onSliderRight() {
    const slider = this.sliderRef.nativeElement.getBoundingClientRect();
    const sliderWidth = slider.right - slider.left;

    const maxWidth =
      this.sliderRef.nativeElement.scrollWidth -
      this.sliderRef.nativeElement.clientWidth;

    this.sliderRef.nativeElement.scrollLeft =
      this.sliderRef.nativeElement.scrollLeft + sliderWidth;

    if (this.sliderRef.nativeElement.scrollLeft >= maxWidth) {
      this.sliderRef.nativeElement.scrollLeft = 0;
    }
  }

  onSliderLeft() {
    const slider = this.sliderRef.nativeElement.getBoundingClientRect();
    const sliderWidth = slider.right - slider.left;

    const maxWidth =
      this.sliderRef.nativeElement.scrollWidth -
      this.sliderRef.nativeElement.clientWidth;

    this.sliderRef.nativeElement.scrollLeft =
      this.sliderRef.nativeElement.scrollLeft - sliderWidth;

    if (this.sliderRef.nativeElement.scrollLeft === 0) {
      this.sliderRef.nativeElement.scrollLeft = maxWidth;
    }
  }
}
