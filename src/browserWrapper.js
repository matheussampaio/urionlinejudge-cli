import chalk from 'chalk';
import ProgressBar from 'progress';
import Browser from './browser';

export default class BrowserWrapper {
    constructor() {
        this.browser = new Browser();
        this.actions = [];
        this.progress = null;
    }

    add(action) {
        this.actions.push(action);

        return this;
    }

    init({progress}) {
        return this.add({id: 'init', progress});
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

    _init({progress}) {

        this.progress = new ProgressBar(` ${progress} [:bar] :percent :elapseds`, {
            complete: chalk.green('='),
            incomplete: ' ',
            width: 40,
            total: this.actions.length - 1,
        });

        return Promise.resolve();
    }

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
