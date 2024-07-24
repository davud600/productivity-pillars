import {
    type MiddlewareErrorName,
    MiddlewareErrorBase,
  } from '../utils/middleware-errors'
  
type ErrorName = string & MiddlewareErrorName
  
export class UserMiddlewareErrorBase extends MiddlewareErrorBase<ErrorName> {}