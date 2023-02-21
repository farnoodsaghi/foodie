import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  selectedShoppingItem = new Subject<Ingredient>();
  constructor() {}

  onSelectShoppingItem(item) {
    this.selectedShoppingItem.next(item);
    console.log(item);
  }
}
