import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { RefreshTokenReqDto } from "./dto/req/refresh-token.req.dto";
import { SkipAuth } from "./decorators/skip-auth.decorator";
import { AuthReqDto } from "./dto/req/auth.req.dto";
import { AuthResDto } from "./dto/res/auth.res.dto";
import { RefreshTokenResDto } from "./dto/res/refresh-token.res.dto";
import { AuthService } from "./services/auth.service";
import { JwtGuard } from "./guards/jwt.guard";
import { ApiResponse } from "src/common/responses/api-response";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Post('/register')
  public async register(@Body() dto: AuthReqDto): Promise<ApiResponse<AuthResDto>> {
    return await this.authService.register(dto);
  }

  @SkipAuth()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() dto: AuthReqDto): Promise<ApiResponse<AuthResDto>> {
    return await this.authService.login(dto);
  }

  @SkipAuth()
  @UseGuards(JwtGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() refreshTokenDto: RefreshTokenReqDto): Promise<ApiResponse<RefreshTokenResDto>> {
    return await this.authService.refresh(refreshTokenDto);
  }
}