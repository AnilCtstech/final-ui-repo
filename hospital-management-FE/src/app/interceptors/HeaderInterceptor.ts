import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //const API_KEY = '123456';
        const NO_HEADER = 'NA';
        const token = localStorage.getItem("jwtToken");
        const token1 = token?.slice(1, token.length - 1);
        let tokenStr: string = 'Bearer ' + token1;
        const Authorization = tokenStr;
        if (httpRequest.url.includes('authenticate')) {
            return next.handle(httpRequest.clone({ setHeaders: { NO_HEADER } }));
        }
        else
            return next.handle(httpRequest.clone({ setHeaders: { Authorization } }));
    }
}