import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// @SHARED
import { ProductModel } from '@shared/src/database/schemas/productModel';

@Schema({ timestamps: true })
export class Product implements ProductModel {
  @Prop({ type: String, required: true })
  public name: string;

  @Prop({ type: String, required: true })
  public category: string;

  @Prop({ type: String, required: true })
  public description: string;

  @Prop({ type: String, required: true })
  public specification: Array<any>;

  @Prop({ type: String, required: true })
  public price: number;
}

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
