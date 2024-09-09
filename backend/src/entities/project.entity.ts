import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Project extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  desription: string;

  @Prop({ type: [String] })
  technologies: string[];

  @Prop()
  imageUrl: string;

  @Prop()
  projectUrl: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
