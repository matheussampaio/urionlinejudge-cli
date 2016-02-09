import { expect } from 'chai';

import User from '../src/model/user';

describe('User', () => {
  const email = 'test@email.com';
  const password = 'testpassword';
  const username = 'testuser';
  let user;

  before(() => {
    user = new User({ email, password, username });
  });

  it('should create user', () => {
    expect(user).to.not.be.undefined;
    expect(user).to.be.an.instanceof(User);
  });

  it('should return the same email', () => {
    expect(user.email).to.equal(email);
  });

  it('should return the same password', () => {
    expect(user.password).to.equal(password);
  });

  it('should set new email', () => {
    const newEmail = 'new@email.com';
    user.email = newEmail;
    expect(user.email).to.be.equal(newEmail);
  });

  it('should set new password', () => {
    const newPassword = 'new#123';
    user.password = newPassword;
    expect(user.password).to.be.equal(newPassword);
  });
});
