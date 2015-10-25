import { expect } from 'chai';
import User from '../src/user';

describe('User', () => {
    let email = 'test@email.com';
    let password = 'testpassword';
    let username = 'testuser';
    var user;

    before(() => {
        user = new User({email, password, username});
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

    it('should return the same username', () => {
        expect(user.username).to.equal(username);
    });

    it('should set new email', () => {
        let newEmail = 'new@email.com';
        user.email = newEmail;
        expect(user.email).to.be.equal(newEmail);
    });

    it('should set new password', () => {
        let newPassword = 'new#123';
        user.password = newPassword;
        expect(user.password).to.be.equal(newPassword);
    });

    it('should set new username', () => {
        let newUsername = 'newusername';
        user.username = newUsername;
        expect(user.username).to.be.equal(newUsername);
    });
});
