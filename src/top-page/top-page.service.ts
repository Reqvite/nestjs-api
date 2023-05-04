import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TopPage } from './top-page.model';
import { TopPageDto } from './dto/create-topPage.dto';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPage.name)
    private readonly productModel: Model<TopPage>,
  ) {}

  async create(dto: TopPageDto) {
    return this.productModel.create(dto);
  }
}
