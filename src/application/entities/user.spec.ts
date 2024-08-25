import { User } from './user';

describe('User', () => {
  it('should create a new User with the given props', () => {
    const props = {
      username: 'username',
      password: 'password',
    };

    const user = User.create(props);

    expect(user).toEqual(expect.objectContaining(props));
    expect(user.id).toBeTruthy();
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);
  });

  it('should create a new User with the given props and id', () => {
    const props = {
      id: '123',
      username: 'username',
      password: 'password',
    };

    const user = User.create(props);

    expect(user).toEqual(expect.objectContaining(props));
    expect(user.id).toEqual(props.id);
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);
  });

  it('should update a User with the given props and dates', () => {
    const date = new Date();

    const props = {
      username: 'username',
      password: 'password',
      createdAt: date,
      updatedAt: date,
    };

    const user = User.create(props);

    expect(user).toEqual(expect.objectContaining(props));
    expect(user.id).toBeTruthy();
    expect(user.createdAt).toEqual(date);
    expect(user.updatedAt).toEqual(date);
  });
});
