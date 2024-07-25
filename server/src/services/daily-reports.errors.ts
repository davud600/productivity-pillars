import {
  type DatabaseQueryErrorName,
  DatabaseQueryErrorBase,
} from '../utils/service-errors'

type ErrorName = string & DatabaseQueryErrorName

export class DailyReportsDatabaseQueryErrorBase extends DatabaseQueryErrorBase<ErrorName> {}
