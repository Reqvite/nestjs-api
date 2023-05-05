import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TopLevelCategory } from './dto/create-topPage.dto';

export type ProductDocument = HydratedDocument<TopPage>;
class Hh {
  @Prop({ required: true })
  count: number;
  @Prop({ required: true })
  juniorSalary: number;
  @Prop({ required: true })
  middleSalary: number;
  @Prop({ required: true })
  seniorSalary: number;
}

class Advantages {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
}

@Schema({ timestamps: true })
export class TopPage {
  @Prop({ required: true })
  firstCategory: TopLevelCategory;

  @Prop({ required: true })
  secondCategory: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  category: string;

  @Prop({ type: () => [Hh], _id: false })
  hh?: Hh;

  @Prop({ type: () => [Advantages], _id: false })
  advantages: Advantages[];

  @Prop({ required: true })
  seoText: string;

  @Prop({ required: true })
  tags: string[];

  @Prop({ required: true })
  tagsTitle: string;
}

export const TopPageSchema = SchemaFactory.createForClass(TopPage);
