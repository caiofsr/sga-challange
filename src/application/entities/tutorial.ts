import { randomUUID } from 'node:crypto';

export type TutorialProps = {
  id?: string;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Tutorial {
  id?: string;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: TutorialProps) {
    this.id = props.id ?? randomUUID();
    this.title = props.title;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }

  update(props: Pick<TutorialProps, 'title'>) {
    Object.assign(this, {
      updatedAt: new Date(),
      ...props,
    });
  }

  static create(props: TutorialProps): Tutorial {
    return new Tutorial(props);
  }
}
