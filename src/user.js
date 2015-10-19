export default class User {
    constructor({email, password, username} = {}) {
        this.email = email;
        this.password = password;
        this.username = username;
    }
}
