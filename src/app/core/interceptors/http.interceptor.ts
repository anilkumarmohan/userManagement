import { HttpInterceptorFn } from '@angular/common/http';
​
export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const requestWithAuthor = req.clone({
    headers: req.headers.set('Author', 'Proxymity'),
  });
  return next(requestWithAuthor);
};