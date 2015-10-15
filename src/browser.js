import phantom from 'phantom';

export default class Browser {
    constructor() {
        this.page = undefined;
        this.ph = undefined;
    }

    createPhantom() {
        return new Promise(resolve => {
            console.info('creating phantom');

            phantom.create(ph => {
                this.ph = ph;
                console.log('phantom created.');
                resolve(this.ph);
            }, {
                dnodeOpts: {
                    weak: false,
                },
            });
        });
    }

    createPage() {
        return new Promise(resolve => {
            console.info('creating page');

            this.ph.createPage(p => {
                this.page = p;
                resolve(this.page);
            });
        });
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
        return new Promise(resolve => {
            console.info('exiting');
            this.ph.exit();
            resolve();
        });
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
