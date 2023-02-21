import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-grid-list',
  templateUrl: './recipe-grid-list.component.html',
  styleUrls: ['./recipe-grid-list.component.css'],
})
export class RecipeGridListComponent {
  @Input() recipes: any[];
}
