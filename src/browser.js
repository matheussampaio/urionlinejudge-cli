import phantom from 'phantom';

export default class Browser {
    constructor() {
        this.page = undefined;
        this.phantom = undefined;
    }

    createPhantom() {
        return new Promise((resolve, reject) => {
            phantom.create(phantom => {
                if (phantom) {
                    this.phantom = phantom;
                    resolve(this.phantom);
                } else {
                    reject('error creating phantom');
                }
            }, {
                dnodeOpts: {
                    weak: false,
                },
            });
        });
    }

    createPage() {
        return new Promise((resolve, reject) => {
            this.phantom.createPage(page => {
                if (page) {
                    page.set('onError', () => {});

                    this.page = page;

                    resolve(this.page);
                } else {
                    reject('error creating page');
                }
            });
        });
    }

    open({url}) {
        return new Promise(resolve => {
            this.page.open(url, () => {
                setTimeout(resolve, 2000);
            });
        });
    }

    screenshot({filename}) {
        return new Promise((resolve, reject) => {
            if (this.page) {
                this.page.render(filename, resolve);
            } else {
                reject('error when taking screenshot, page is null');
            }
        });
    }

    exit() {
        return new Promise(resolve => {
            this.phantom.exit();
            resolve();
        });
    }

    // Ignore JSHint because `editor` and `$` are not defined.
    /* jshint ignore:start */
    submit({file}) {
        return new Promise(resolve => {
            this.page.evaluate(file => {
                editor.getSession().setValue(file);
                $('.send-submit').click();
            }, () => {
                setTimeout(resolve, 2000);
            }, file);
        });
    }
    /* jshint ignore:end */

    login({email, password}) {
        return new Promise(resolve => {
            this.page.evaluate((config) => {
                document.getElementById('UserEmail').value = config.email;
                document.getElementById('UserPassword').value = config.password;
                document.forms[0].submit();
            },
            () => {
                setTimeout(resolve, 2000);
            },
            {
                email,
                password,
            });
        });
    }

}
