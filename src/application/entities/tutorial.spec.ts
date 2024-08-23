import { Tutorial } from './tutorial';

describe('Tutorial', () => {
  it('should create a new Tutorial with the given props', () => {
    const props = {
      title: 'Hello World',
    };

    const tutorial = Tutorial.create(props);

    expect(tutorial).toEqual(expect.objectContaining(props));
    expect(tutorial.id).toBeTruthy();
    expect(tutorial.createdAt).toBeInstanceOf(Date);
    expect(tutorial.updatedAt).toBeInstanceOf(Date);
  });

  it('should create a new Tutorial with the given props and id', () => {
    const props = {
      id: '123',
      title: 'Hello World',
    };

    const tutorial = Tutorial.create(props);

    expect(tutorial).toEqual(expect.objectContaining(props));
    expect(tutorial.id).toEqual(props.id);
    expect(tutorial.createdAt).toBeInstanceOf(Date);
    expect(tutorial.updatedAt).toBeInstanceOf(Date);
  });

  it('should create a new Tutorial with the given props and dates', () => {
    const date = new Date();

    const props = {
      title: 'Hello World',
      createdAt: date,
      updatedAt: date,
    };

    const tutorial = Tutorial.create(props);

    expect(tutorial).toEqual(expect.objectContaining(props));
    expect(tutorial.createdAt).toEqual(date);
    expect(tutorial.updatedAt).toEqual(date);
  });
});
