/**
 * User class
 *
 * @class
 */
export default class User {

    /**
     * Create a new User
     *
     * @param {Object} options - The options.
     * @param {string} options.name - Email of the User.
     * @param {string} options.password - Password of the User.
     * @returns {User} - a new User.
     */
    constructor({email, password} = {}) {
        /**
         * @type {string}
         */
        this.email = email;

        /**
         * @type {string}
         */
        this.password = password;
    }
}
