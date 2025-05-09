import {
    Controller,
    Get,
    Patch,
    Body,
    Req,
    HttpCode,
    HttpStatus,
    Param,
    ParseUUIDPipe
} from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserResDto } from './dto/res/user.res.dto';
import { UpdateUserDto } from './dto/req/update-user.req.dto';
import { Request } from 'express';
import { User } from './user.entity';
import { ApiResponse } from 'src/common/responses/api-response';

interface RequestWithUser extends Request {
    user: Partial<User>;
}

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/me')
    @HttpCode(HttpStatus.OK)
    async getMe(@Req() req: RequestWithUser): Promise<ApiResponse<UserResDto>> {
        return await this.userService.getMe(req.user);
    }
    
    @Patch('/me')
    @HttpCode(HttpStatus.OK)
    async updateMe(
        @Req() req: RequestWithUser,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<ApiResponse<UserResDto>> {
        return await this.userService.update(req.user.id, updateUserDto);
    }
    
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
        @Param('id', ParseUUIDPipe) id: string
    ): Promise<ApiResponse<UserResDto>> {
        const user = await this.userService.findById(id);
        return ApiResponse.success(
            this.userService['mapToUserResponse'](user),
            'User successfully retrieved'
        );
    }
}
  