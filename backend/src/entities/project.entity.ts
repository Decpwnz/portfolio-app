import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Project extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String] })
  technologies: string[];

  @Prop()
  imageUrl: string;

  @Prop()
  projectUrl: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
