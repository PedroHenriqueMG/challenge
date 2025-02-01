import { Stage, TasksModel } from '@prisma/client';
import { randomUUID } from 'crypto';
import { Replace } from 'src/types/replace';

interface TasksProps {
  id?: string;
  title: string;
  description: string;
  stage?: Stage;
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
