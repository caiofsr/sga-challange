import { Tutorial } from './tutorial';

describe('Tutorial', () => {
  it('should create a new Tutorial with the given props', () => {
    const props = {
      title: 'Hello World',
    };

    const tutorial = Tutorial.create(props);

    expect(tutorial).toEqual(expect.objectContaining(props));
  });

  it('should create a new Tutorial with the given props and id', () => {
    const props = {
      id: '123',
      title: 'Hello World',
    };

    const tutorial = Tutorial.create(props);

    expect(tutorial).toEqual(expect.objectContaining(props));
  });

  it('should create a new Tutorial with the given props and dates', () => {
    const props = {
      title: 'Hello World',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const tutorial = Tutorial.create(props);

    expect(tutorial).toEqual(expect.objectContaining(props));
  });
});
