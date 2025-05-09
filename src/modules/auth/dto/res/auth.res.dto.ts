import { UserResDto } from 'src/modules/user/dto/res/user.res.dto';
import { TokenPairResDto } from './token-pair.res.dto';

export class AuthResDto {
    tokens: TokenPairResDto;
    user: UserResDto;
}
