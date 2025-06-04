export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
}

export class ResponsePayload {
  message: string
  statusCode: number
  constructor(payload: ResponsePayload) {
    this.message = payload.message
    this.statusCode = payload.statusCode
  }
}

export class ResponseSuccessPayload<T> extends ResponsePayload {
  data: T
  constructor(payload: ResponseSuccessPayload<T>) {
    super(payload)
    this.data = payload.data
  }
}

export class ResponseErrorPayload extends Error {
  error: string
  statusCode: number
  constructor(payload: { message: string; error: string; statusCode: number }) {
    super(payload.message)
    this.error = payload.error
    this.statusCode = payload.statusCode
  }
}

export class UnauthorizedException extends ResponseErrorPayload {
  constructor(payload?: string | UnauthorizedException) {
    if (!payload)
      super({
        message: 'Yêu cầu đăng nhập',
        error: 'Unauthorized',
        statusCode: HttpStatusCode.UNAUTHORIZED,
      })
    else if (typeof payload === 'string')
      super({
        message: payload,
        error: 'Unauthorized',
        statusCode: HttpStatusCode.UNAUTHORIZED,
      })
    else super(payload)
  }
}

export class ForbiddenException extends ResponseErrorPayload {
  constructor(payload?: string | ForbiddenException) {
    if (!payload)
      super({
        message: 'Bạn không có quyền truy cập',
        error: 'Forbidden',
        statusCode: HttpStatusCode.FORBIDDEN,
      })
    else if (typeof payload === 'string')
      super({
        message: payload,
        error: 'Forbidden',
        statusCode: HttpStatusCode.FORBIDDEN,
      })
    else super(payload)
  }
}

export class UnprocessableEntityException extends ResponseErrorPayload {
  constraints: {
    message: string
    path: string[]
  }[]

  constructor(payload: UnprocessableEntityException) {
    super(payload)
    this.constraints = payload.constraints
  }
}

export class NotFoundException extends ResponseErrorPayload {
  constructor(payload?: string | NotFoundException) {
    if (!payload)
      super({
        message: 'Không tìm thấy tài nguyên',
        error: 'Not Found',
        statusCode: HttpStatusCode.NOT_FOUND,
      })
    else if (typeof payload === 'string')
      super({
        message: payload,
        error: 'Not Found',
        statusCode: HttpStatusCode.NOT_FOUND,
      })
    else super(payload)
  }
}

export interface CustomRequestInit extends RequestInit {
  baseUrl?: string
}
