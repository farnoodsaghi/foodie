import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { RecipesService } from 'src/app/recipes/recipes.service';

@Component({
  selector: 'app-navbar-search',
  templateUrl: './navbar-search.component.html',
  styleUrls: ['./navbar-search.component.css'],
})
export class NavbarSearchComponent implements OnInit {
  searchForm: FormGroup;
  faMagnifyingGlass = faMagnifyingGlass;

  constructor(private recipesService: RecipesService) {}

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchQuery: new FormControl(''),
    });

    this.searchForm.valueChanges.subscribe((formData) => {
      if (this.searchForm.valid) {
        this.recipesService.onSearchQueryChanged.next(formData.searchQuery);
      }
    });
  }
}
