import { Stage, TasksModel } from '@prisma/client';
import { randomUUID } from 'crypto';
import { Replace } from 'src/types/replace';

interface TasksProps {
  id?: string;
  title: string;
  description: string;
  position: number;
  stage?: Stage;
}

export interface TaskUpdateProps {
  id: string;
  stage: Stage;
  position: number;
}

export class Tasks {
  private props: TasksProps;
  private _id: string;
  private _stage: Stage;

  constructor(props: Replace<TasksProps, {}>, id?: string) {
    this.props = {
      ...props,
    };
    this._id = id || randomUUID();
    this._stage = this.props.stage || Stage.To_Do;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this.props.title;
  }

  set title(title: string) {
    this.props.title = title;
  }

  get position() {
    return this.props.position;
  }

  set position(position: number) {
    this.props.position = position;
  }

  get description() {
    return this.props.description;
  }

  set description(description: string) {
    this.props.description = description;
  }

  get stage() {
    return this._stage;
  }
}
