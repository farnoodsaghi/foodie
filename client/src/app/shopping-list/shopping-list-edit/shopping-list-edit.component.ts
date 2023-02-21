import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/account/user.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  shoppingListForm: FormGroup;
  selectedItem: Ingredient = { id: '', recipeId: '', name: '', amount: '' };
  shoppingListSubscription: Subscription;
  faPen = faPenToSquare;
  faPlus = faPlus;
  faXMark = faXmark;

  constructor(
    private userService: UserService,
    private shoppingListService: ShoppingListService
  ) {}

  ngOnInit(): void {
    this.shoppingListForm = new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
    });

    this.shoppingListSubscription =
      this.shoppingListService.selectedShoppingItem.subscribe((item) => {
        this.selectedItem = item;
        this.shoppingListForm.setValue({
          name: item.name,
          amount: item.amount,
        });
      });
  }

  onSubmit(): void {
    if (this.shoppingListForm.valid) {
      const { name, amount } = this.shoppingListForm.value;
      this.userService.manualShoppingListAddOrUpdate({
        id: this.selectedItem.id,
        recipeId: this.selectedItem.recipeId,
        name,
        amount,
      });
    }
    this.shoppingListService.selectedShoppingItem.next({
      id: '',
      recipeId: '',
      name: '',
      amount: '',
    });
    this.shoppingListForm.reset();
  }

  onClear() {
    this.shoppingListService.selectedShoppingItem.next({
      id: '',
      recipeId: '',
      name: '',
      amount: '',
    });
    this.shoppingListForm.reset();
  }

  ngOnDestroy(): void {
    this.shoppingListSubscription.unsubscribe();
  }
}
