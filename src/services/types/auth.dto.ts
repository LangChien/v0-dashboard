import { z } from 'zod'
import {
  LoginSchema,
  LogoutSchema,
  RefreshTokenSchema,
  RegisterSchema,
  ResetPasswordSchema,
  SendOtpEmailSchema,
  VerifyOtpSchema,
} from '../schemas/auth.schema'

export interface LoginBodyDto extends z.infer<typeof LoginSchema> {}
export interface RegisterBodyDto extends z.infer<typeof RegisterSchema> {}
export interface RefreshTokenBodyDto extends z.infer<typeof RefreshTokenSchema> {}
export interface LogoutBodyDto extends z.infer<typeof LogoutSchema> {}
export interface ResetPasswordBodyDto extends z.infer<typeof ResetPasswordSchema> {}
export interface SendOtpEmailBodyDto extends z.infer<typeof SendOtpEmailSchema> {}
export interface VerifyOTPBodyDto extends z.infer<typeof VerifyOtpSchema> {}

export interface TokenResponse {
  accessToken: string
  refreshToken: string
}
