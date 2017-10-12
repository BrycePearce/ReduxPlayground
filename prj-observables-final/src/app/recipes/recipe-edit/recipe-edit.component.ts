import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
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
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9+[0-9]*$/) // even positive numbers regex
        ])
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

      // push values for selected recipe, if that recipe has ingredients
      if (recipe['ingredients']) { // ingredients here comes from the model
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount,
                [Validators.required,
                Validators.pattern(/^[1-9+[0-9]*$/) // even numbers regex
                ])
            })
          );
        }
      }
    }
    // we bind recipeForm to our form in HTML, tells Angular to use our custom form, not the default one
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required), // we also set these values in our html via formControlName or formArrayName
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required), // with this we pre-populate the fields with the current recipe
      'ingredients': recipeIngredients
    });
  }

}
