import phantom from 'phantom';

export default class Browser {
    constructor() {
        this.page = undefined;
        this.phantom = undefined;
    }

    createPhantom() {
        return new Promise((resolve, reject) => {
            console.info('creating phantom');

            phantom.create(phantom => {
                if (phantom) {
                    this.phantom = phantom;
                    console.log('phantom created.');
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
            console.info('creating page');

            this.phantom.createPage(page => {
                if (page) {
                    this.page = page;
                    resolve(this.page);
                } else {
                    reject('error creating page');
                }
            });
        });
    }

    open({url}) {
        return new Promise((resolve, reject) => {
            console.info('loading %s', url);

            this.page.open(url, status => {
                if (status === 'success') {
                    setTimeout(resolve, 2000);
                } else {
                    reject(`open page failed (${status}): ${url}`);
                }
            });
        });
    }

    screenshot({filename}) {
        return new Promise((resolve, reject) => {
            if (this.page) {
                console.info('screenshot: %s', filename);

                this.page.render(filename, resolve);
            } else {
                reject('error when taking screenshot, page is null');
            }
        });
    }

    exit() {
        return new Promise(resolve => {
            console.info('exiting');
            this.phantom.exit();
            resolve();
        });
    }

    submit({file}) {
        return new Promise(resolve => {
            console.log('submiting file');

            this.page.evaluate((file) => {
                editor.getSession().setValue(file);
                $('.send-submit').click();
            }, () => {
                setTimeout(resolve, 2000);
            }, file);
        });
    }

    login({email, password}) {
        return new Promise(resolve => {
            console.log('submiting email and password');

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
