import Browser from './browser';

export default class BrowserWrapper {
    constructor() {
        this.browser = new Browser();
        this.actions = [];
    }

    create() {
        this.actions.push({
            id: 'createPhantom',
        });

        this.actions.push({
            id: 'createPage',
        });

        return this;
    }

    open(url) {
        this.actions.push({
            url,

            id: 'open',
        });

        return this;
    }

    screenshot(filename) {
        this.actions.push({
            filename,

            id: 'screenshot',
        });

        return this;
    }

    exit() {
        this.actions.push({
            id: 'exit',
        });

        return this;
    }

    evaluate({before, after, params}) {
        this.actions.push({
            before,
            after,
            params,

            id: 'evaluate',
        });

        return this;
    }

    wait(time) {
        this.actions.push({
            id: 'wait',
            time: time,
        });

        return this;
    }

    start() {
        this.actions.reduce((prev, val) => {
            return prev.then(() => {
                return this.getPromise(val);
            }); // successive execution of fn for all vals in array

        }, Promise.resolve())
            .catch(error => {
                console.error('oops: %s', error);
                return this.browser.exit();
            });
    }

    submit(file) {
        this.actions.push({
            id: 'submit',

            file,
        });

        return this;
    }

    getPromise(action) {
        if (action.id === 'createPhantom') {
            return this.browser.createPhantom();
        } else if (action.id === 'createPage') {
            return this.browser.createPage();
        } else if (action.id === 'open') {
            return this.browser.open(action.url);
        } else if (action.id === 'exit') {
            return this.browser.exit();
        } else if (action.id === 'screenshot') {
            return this.browser.screenshot(action.filename);
        } else if (action.id === 'evaluate') {
            return this.browser.evaluate(action.before, action.after, action.params);
        } else if (action.id === 'submit') {
            return this.browser.submit(action.file);
        } else if (action.id === 'wait') {
            return new Promise(resolve => {
                console.info('waiting %d seconds...', action.time / 1000);
                setTimeout(resolve, action.time);
            });
        } else {
            console.error('action unknown: %s. exiting.', action.id);
            return this.browser.exit();
        }
    }
}
