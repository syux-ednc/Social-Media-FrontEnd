import {Directive} from '@angular/core';
import {AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors} from "@angular/forms";
import {catchError, map, Observable, of} from "rxjs";
import {UserService} from "../services/user.service";

@Directive({
  selector: '[appUsernameExist]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: UsernameExistDirective,
    multi: true,
  }]
})
export class UsernameExistDirective implements AsyncValidator {

  constructor(private _userService: UserService) {
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this._userService.isUsernameTaken(control.value).pipe(
      map(isUsernameTaken => isUsernameTaken ? {usernameTaken: true} : null),
      catchError(()=> of(null))
    );
  }
}
