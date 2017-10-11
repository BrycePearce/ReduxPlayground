import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { RecipeService } from 'app/recipes/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] !== null;
        this.initForm(); // we call initForm when the route params change, because that's when its indicated that we have loaded the page
      }
      );
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  // add ingredients while editing the recipe
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push( 
      new FormGroup({
        'name': new FormControl(),
        'amount': new FormControl()
      })
    );
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]); // no ingredients by default, so initialize it as an empty array
    // if the user is editing an existing recipe, we need to populate the fields with the current ingredients
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id); // pull in hardcoded recipe from service
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      // set values for selected recipe, if that recipe has ingredients
      if (recipe['ingredients']) { // ingredients here comes from the model
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name),
              'amount': new FormControl(ingredient.amount)
            })
          );
        }
      }
    }
    // we bind recipeForm to our form in HTML, tells Angular to use our custom form, not the default one
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName), // we also set these values in our html via formControlName or formArrayName
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription), // with this we pre-populate the fields with the current recipe
      'ingredients': recipeIngredients
    });
  }

}
