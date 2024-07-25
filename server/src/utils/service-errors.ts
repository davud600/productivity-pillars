export type DatabaseQueryErrorName = 'NOT_FOUND' | 'UNKNOWN' | 'INVALID_DATA'

export class DatabaseQueryErrorBase<
  T extends DatabaseQueryErrorName
> extends Error {
  name: T
  message: string
  cause: string

  constructor({
    name,
    message,
    cause,
  }: {
    name: T
    message: string
    cause: string
  }) {
    super()
    this.name = name
    this.message = message
    this.cause = cause
  }
}
