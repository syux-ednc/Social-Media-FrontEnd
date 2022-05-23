import { Directive } from '@angular/core';
import {AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors} from "@angular/forms";
import {UserService} from "../services/user.service";
import {catchError, map, Observable, of} from "rxjs";

@Directive({
  selector: '[appEmailExist]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: EmailExistDirective,
    multi: true,
  }]
})
export class EmailExistDirective implements AsyncValidator {

  constructor(private _userService: UserService) {
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this._userService.isEmailTaken(control.value).pipe(
      map(isEmailTaken => isEmailTaken ? {emailTaken: true} : null),
      catchError(()=> of(null))
    );
  }
}
