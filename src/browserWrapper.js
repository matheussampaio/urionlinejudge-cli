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

    evaluate({after, before, params}) {
        this.action.push({
            after,
            before,
            params,

            id: 'evaluate',
        });

        return this;
    }

    start() {
        console.log(this.actions);
    }
}
