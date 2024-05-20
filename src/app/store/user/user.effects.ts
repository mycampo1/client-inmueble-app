import { Injectable } from '@angular/core';
import * as fromActions from './user.actions';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotificationService } from '@app/services';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { UserResponse } from './user.models';
import { environment } from '@src/environments/environment';

type Action = fromActions.All;

@Injectable()
export class UserEffects {
  constructor(
    private httpClient: HttpClient,
    private actions: Actions,
    private notification: NotificationService,
    private router: Router
  ) {}

  signUpEmail: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.SIGIN_UP_EMAIL),
      map((action: fromActions.SignInEmail) => action.user),
      switchMap((userData) =>
        this.httpClient
          .post<UserResponse>(`${environment.url}account/register/`, userData)
          .pipe(
            tap((response: UserResponse) => {
              localStorage.setItem('token', response.token.access);
              this.router.navigate(['/']);
            }),
            map(
              (response: UserResponse) =>
                new fromActions.SignUpEmailSuccess(
                  response.email,
                  response || null
                ),
            ),
            catchError((err) => {
              this.notification.error('Errores al registrar un nuevo usuario');
              return of(new fromActions.SignUpEmailError(err.message));
            })
          )
      )
    )
  );
}
