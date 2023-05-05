import {
  HttpCode,
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageService } from './top-page.service';
import { CreateTopPageDto } from './dto/create-topPage.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { IdValidationPipe } from 'src/pipes/ad-validation.pipe';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateTopPageDto) {
    return this.topPageService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new IdValidationPipe())
  @Get(':id')
  async get(@Param('id') id: string) {
    const topPage = await this.topPageService.get(id);
    if (!topPage) {
      throw new NotFoundException('PRODUCT_NOT_FOUND_ERROR');
    }
    return topPage;
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new IdValidationPipe())
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const topPage = await this.topPageService.delete(id);
    if (!topPage) {
      throw new NotFoundException('PRODUCT_NOT_FOUND_ERROR');
    }

    return topPage;
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: CreateTopPageDto) {
    const updatedPage = await this.topPageService.updateById(id, dto);
    if (!updatedPage) {
      throw new NotFoundException('NOT_FOUND_TOP_PAGE_ERROR');
    }
    return updatedPage;
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindTopPageDto) {
    return this.topPageService.findByCategory(dto.firstCategory);
  }
}
