import { Component, Input } from '@angular/core';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/account/user.service';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-item',
  templateUrl: './shopping-list-item.component.html',
  styleUrls: ['./shopping-list-item.component.css'],
})
export class ShoppingListItemComponent {
  @Input() ingredient: { recipeId: string; name: string; amount: string };
  faMinus = faMinusCircle;

  constructor(
    private userService: UserService,
    private shoppingListService: ShoppingListService
  ) {}

  onSelect(item) {
    this.shoppingListService.onSelectShoppingItem(item);
  }

  onRemoveItem(item) {
    this.userService.manualShoppingListRemove(item);
  }
}
