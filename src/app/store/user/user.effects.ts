import { Injectable } from '@angular/core';
import * as fromActions from './user.actions';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotificationService } from '@app/services';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
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
      map((action: fromActions.SignUpEmail) => action.user),
      switchMap( userData =>
        this.httpClient.post<UserResponse>(`${environment.url}account/register/`, userData)
          .pipe(
            tap((response: UserResponse) => {
              localStorage.setItem('token', response.token.access);
              this.router.navigate(['/']);
            }),
            map((response: UserResponse) => new fromActions.SignUpEmailSuccess(response.email, response || null)),
            catchError(err => {
              this.notification.error('Errores al registrar un nuevo usuario');
              return of(new fromActions.SignUpEmailError(err.message));
            })
          )
      )
    )
  );

  signInEmail: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.SIGIN_IN_EMAIL),
      map((action: fromActions.SignInEmail) => action.credentials),
      switchMap( userData =>
        this.httpClient.post<UserResponse>(`${environment.url}account/login-app/`, userData)
          .pipe(
            tap((response: UserResponse) => {
              localStorage.setItem('token', response.token.access);
              this.router.navigate(['/']);
            }),
            map((response: UserResponse) => new fromActions.SignInEmailSuccess(response.email, response || null)),
            catchError(err => {
              this.notification.error('Las credenciales son incorrectas');
              return of(new fromActions.SignInEmailError(err.message));
            })
          )
      )
    )
  );

  init: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.INIT),
      switchMap( async () => localStorage.getItem('token')),
      switchMap( token => {
        if(token){
          return this.httpClient.get<UserResponse>(`${environment.url}account/session/`)
          .pipe(
            tap((response: UserResponse) => {
              console.log('data del usuario en sesion que viene del servidor', response)
            }),
            map((response: UserResponse) => new fromActions.InitAuthorized(response.email, response || null)),
            catchError(err => {
              return of(new fromActions.InitError(err.message));
            })
          )
        }else{
          return of(new fromActions.InitUnauthorized());
        }

      }
      )
    )
  );

}
