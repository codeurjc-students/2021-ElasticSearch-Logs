import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router'
import { catchError } from 'rxjs/operators'


@Injectable()
export class RequestService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError(error => this.handleError(error))
    )

  }

  handleError(error: any) {

    const statusCode = error.status;

    if (statusCode === 403 || statusCode === 401) {
      if (localStorage.getItem('logged'))
        localStorage.removeItem('logged');

      this.router.navigateByUrl(`/login`);
      return throwError("You are unauthorized to access the API");
    }

    return throwError("Unknown error");
  }


}

