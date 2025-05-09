import { IsNotEmpty, IsString, IsJWT } from 'class-validator';

export class RefreshTokenReqDto {
  @IsNotEmpty({ message: 'Refresh token is required' })
  @IsString({ message: 'Refresh token must be a string' })
  @IsJWT({ message: 'Invalid refresh token format' })
  refresh_token: string;
} 