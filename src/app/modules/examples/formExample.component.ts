import { Component } from '@angular/core';
import { StInputError } from "egeo";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
   selector: 'form-example',
   templateUrl: 'formExample.template.html'
})

export class FormExampleComponent {
   public model: FormModel = {
      name: 'Egeo',
      description: '',
      components: 10
   };

   public textWithoutSpaces: string = '[a-z]*';
   public minLength: number = 3;
   public isDisabled: boolean = false;

   public forceValidations: boolean = false;

   public errors: StInputError = {
      generic: 'Error',
      required: 'This field is required',
      minLength: 'The field min length is: ' + this.minLength,
      pattern: 'Invalid value'
   };

   public reactiveForm: FormGroup; // our model driven form

   constructor(private _fb: FormBuilder) {
      this.textWithoutSpaces = '[a-z]*';
      this.minLength = 3;
      this.isDisabled = false;
      this.forceValidations = false;
      this.errors = {
         generic: 'Error',
         required: 'This field is required',
         minLength: 'The field min length is: ' + this.minLength,
         pattern: 'Invalid value'
      };
   }

   forceValidation(): void {
      this.forceValidations = true;
   }

   onSubmitReactiveForm(): void {
      this.model.description = this.reactiveForm.value.description;
      this.model.components = this.reactiveForm.value.components;
   }

   changeDisabled(): void {
      this.isDisabled = !this.isDisabled;
      if (this.isDisabled) {
         this.reactiveForm.get('components').disable();
      } else {
         this.reactiveForm.get('components').enable();
      }
   }

   ngOnInit(): void {
      this.reactiveForm = this._fb.group({
         'description': [
            this.model.description,
            [Validators.required, Validators.minLength(this.minLength), Validators.pattern(this.textWithoutSpaces)]
         ],
         'components': [this.model.components, [Validators.required]]
      });
   }
}

interface FormModel {
   name: string;
   description: string;
   components: number;
}