import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { UpdateUserDto } from './update-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/test')
  getTest(@Query('options') options: string) {
    this.appService.getTest(options);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Query('options') options: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    this.appService.updateTest(id, options, updateUserDto);
  }
}
