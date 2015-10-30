import chalk from 'chalk';
import ProgressBar from 'progress';
import Browser from './browser';

/**
 * Wrapper Browser class to make simple work with the browser.
 *
 * @class
 * @example
new BrowserWrapper
    .init({progress: 'Submiting'})
    .createPhantom()
    .createPage()
    .open({url: URLS.base})
    .login({email: user.email, password: user.password})
    .open({url: URLS.problemSubmit + cli.number})
    .submit({file: problemfile})
    .exit()
    .start();
 */
export default class BrowserWrapper {

    /**
     * Create a new BrowserWrapper.
     */
    constructor() {
        /**
         * @type {Browser}
         */
        this.browser = new Browser();

        /**
         * @type {Array}
         */
        this.actions = [];

        /**
         * @type {ProgressBar}
         */
        this.progress = null;
    }

    /**
     * Add an action to the stack.
     *
     * @param {Object} action - the action to be add.
     * @returns {BrowserWrapper} - The same instance (for chaining).
     */
    add(action) {
        this.actions.push(action);

        return this;
    }

    /**
     * Add init action to the stack.
     *
     * @param {Object} action - The action.
     * @param {string} action.progress - The name of the action (to be showed in progress bar).
     * @returns {BrowserWrapper} - The same instance (for chaining).
     */
    init({progress}) {
        return this.add({id: 'init', progress});
    }

    /**
     * Add create phatom action to the stack.
     *
     * @returns {BrowserWrapper} - The same instance (for chaining).
     */
    createPhantom() {
        return this.add({id: 'createPhantom'});
    }

    /**
     * Add create page action to the stack.
     *
     * @returns {BrowserWrapper} - The same instance (for chaining).
     */
    createPage() {
        return this.add({id: 'createPage'});
    }

    /**
     * Add open page action to the stack.
     *
     * @param {Object} action - The action.
     * @param {string} action.url - The url to be opened.
     * @returns {BrowserWrapper} - The same instance (for chaining).
     */
    open({url}) {
        return this.add({id: 'open', url});
    }

    /**
     * Add screenshot action to the stack.
     *
     * @param {Object} action - The action.
     * @param {string} action.filename - The screenshot filename to be saved.
     * @returns {BrowserWrapper} - The same instance (for chaining).
     */
    screenshot({filename}) {
        return this.add({id: 'screenshot', filename});
    }

    /**
     * Add exit action to the stack.
     *
     * @returns {BrowserWrapper} The same instance (for chaining).
     */
    exit() {
        return this.add({id: 'exit'});
    }

    /**
     * Add submit file action to the stack.
     *
     * @param {Object} action - The action.
     * @param {string} action.file - The file content to be submited.
     * @returns {BrowserWrapper} - The same instance (for chaining).
     */
    submit({file}) {
        return this.add({id: 'submit', file});
    }

    /**
     * Add login action to the stack.
     *
     * @param {Object} action - The action.
     * @param {string} action.email - The user email.
     * @param {string} action.password - The user password.
     * @returns {BrowserWrapper} - The same instance (for chaining).
     */
    login({email, password}) {
        return this.add({id: 'login', email, password});
    }

    /**
     * Add wait action to the stack.
     *
     * @param {Object} action - The action.
     * @param {number} action.time - The waiting time.
     * @returns {BrowserWrapper} - The same instance (for chaining).
     */
    wait({time}) {
        return this.add({id: 'wait', time});
    }

    /**
     * Init the progress bar.
     *
     * @param {Object} params - Options.
     * @param {string} params.progress - The progress title.
     * @returns {Promise} - Resolved promise.
     */
    _init({progress}) {

        this.progress = new ProgressBar(` ${progress} [:bar] :percent :elapseds`, {
            complete: chalk.green('='),
            incomplete: ' ',
            width: 40,
            total: this.actions.length - 1,
        });

        return Promise.resolve();
    }

    /**
     * Start the actions on the stack.
     *
     * @returns {Promise} - Promise with every actions.
     */
    start() {
        let promise = this.actions.reduce((prev, action) => {
            return prev.then(() => {
                if (action.id === 'init')
                    return this._init(action);

                return this.browser[action.id](action).then(() => { this.progress.tick(); });
            });
        }, Promise.resolve());

        return promise.catch(error => {
            console.error('promise failed: %s', error);
            process.exit();
        });
    }

}
