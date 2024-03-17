import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { verify } from 'argon2';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (await user == null) {
      throw new UnauthorizedException('Hibás email vagy jelszó!');
    }
    if (!await verify(user.password, loginDto.password)) {
      throw new UnauthorizedException('Hibás email vagy jelszó!');
    }
    if(await user?.admin){
      throw new UnauthorizedException('Nem léphetsz be adminisztrátorként ezen a felületen biztonsági okokból!');
    }

    return {
      token: await this.authService.generateTokenFor(user)
    }
  }

  @Post('katus/admin/login')
  async adminlogin(@Body() loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    console.log(user);
    if (await user == null) {
      throw new UnauthorizedException('Hibás email vagy jelszó!');
    }
    if (!await verify(user.password, loginDto.password)) {
      throw new UnauthorizedException('Hibás email vagy jelszó!');
    }
    if(await !user.admin){
      throw new UnauthorizedException('Nincs jogosultságod ehhez a művelethez!');
    }

    return {
      token: await this.authService.generateTokenFor(user)
    }
  }
}
