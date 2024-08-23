import { randomUUID } from 'node:crypto';

type TutorialProps = {
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
    Object.assign(this, {
      id: props.id ?? randomUUID(),
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
      ...props,
    });
  }

  static create(props: TutorialProps): Tutorial {
    return new Tutorial(props);
  }
}
