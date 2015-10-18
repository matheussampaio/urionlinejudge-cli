import Browser from './browser';

export default class BrowserWrapper {
    constructor() {
        this.browser = new Browser();
        this.actions = [];
    }

    add(action) {
        this.actions.push(action);

        return this;
    }

    createPhantom() {
        return this.add({id: 'createPhantom'});

    }

    createPage() {
        return this.add({id: 'createPage'});
    }

    open({url}) {
        return this.add({id: 'open', url});
    }

    screenshot({filename}) {
        return this.add({id: 'screenshot', filename});
    }

    exit() {
        return this.add({id: 'exit'});
    }

    submit({file}) {
        return this.add({id: 'submit', file});
    }

    login({email, password}) {
        return this.add({id: 'login', email, password});
    }

    wait({time}) {
        return this.add({id: 'wait', time});
    }

    evaluate({before, after, params}) {
        return this.add({id: 'evaluate', before, after, params});
    }

    start() {
        let promise = this.actions.reduce((prev, action) => {
            return prev.then(() => {
                return this.browser[action.id](action);
            });
        }, Promise.resolve());

        this.actions = [];

        return promise.catch(error => {
            console.error('promise failed: %s', error);
            process.exit();
        });
    }

}
