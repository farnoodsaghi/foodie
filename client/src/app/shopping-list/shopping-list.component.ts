import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../account/user.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  shoppingList: any[];
  shoppingListSubscription: Subscription;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.shoppingListSubscription =
      this.userService.shoppingListChanged.subscribe((list) => {
        this.shoppingList = list;
      });
  }

  ngOnDestroy(): void {
    this.shoppingListSubscription.unsubscribe();
  }
}
