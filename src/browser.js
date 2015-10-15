import phantom from 'phantom';

export default class Browser {
    constructor() {
        this.page = undefined;
        this.ph = undefined;
    }

    _createPhantom() {
        return new Promise(resolve => {
            console.info('creating phantom');

            phantom.create(ph => {
                this.ph = ph;
                resolve(this.ph);
            }, {
                dnodeOpts: {
                    weak: false,
                },
            });
        });
    }

    _createPage() {
        return new Promise(resolve => {
            console.info('creating page');

            this.ph.createPage(p => {
                this.page = p;
                resolve(this.page);
            });
        });
    }

    create() {
        return this._createPhantom()
            .then(ph => {
                return this._createPage();
            });
    }

    config() {
        return Promise.resolve(this.page);
    }

    open(url) {
        return new Promise((resolve, reject) => {
            console.info('loading %s', url);

            this.page.open(url, status => {
                if (status === 'success') {
                    setTimeout(resolve, 2000);
                } else {
                    reject();
                }
            });
        });
    }

    screenshot(filename) {
        return new Promise(resolve => {
            console.info('screenshot: %s', filename);

            this.page.render(filename, resolve);
        });
    }

    exit() {
        console.info('exiting');

        this.ph.exit();

        return Promise.resolve();
    }

    evaluate(a, b, c) {
        return new Promise(resolve => {
            this.page.evaluate(a, () => {
                b();

                resolve();
            }, c);
        });
    }

}
