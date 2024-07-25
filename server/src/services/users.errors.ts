import {
  type DatabaseQueryErrorName,
  DatabaseQueryErrorBase,
} from '../utils/service-errors'

type ErrorName = string & DatabaseQueryErrorName

export class UsersDatabaseQueryErrorBase extends DatabaseQueryErrorBase<ErrorName> {}
