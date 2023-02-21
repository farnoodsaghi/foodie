import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  navItemsList = [
    { id: '0', name: 'Home', url: '/' },
    { id: '1', name: 'Favorites', url: 'recipes/favorites' },
    { id: '2', name: 'Shopping List', url: 'shopping-list' },
  ];

  constructor() {}
}
