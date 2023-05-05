import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { TopPage } from './top-page.model';
import { CreateTopPageDto, TopLevelCategory } from './dto/create-topPage.dto';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPage.name)
    private readonly topPageModel: Model<TopPage>,
  ) {}

  async create(dto: CreateTopPageDto) {
    return this.topPageModel.create(dto);
  }

  async get(id: string) {
    return this.topPageModel.findById(id);
  }

  async delete(id: string) {
    return this.topPageModel.findByIdAndDelete(id);
  }

  async findByCategory(firstCategory: TopLevelCategory) {
    return this.topPageModel
      .aggregate()
      .match({
        firstCategory,
      })
      .group({
        _id: { secondCategory: '$secondCategory' },
        pages: {
          $push: {
            alias: '$alias',
            title: '$title',
            _id: '$_id',
            category: '$category',
          },
        },
      })
      .exec();
  }

  async deleteById(id: string) {
    return this.topPageModel.findByIdAndRemove(id).exec();
  }

  async updateById(id: string | Types.ObjectId, dto: CreateTopPageDto) {
    return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }
}
