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

    createPage({debug}) {
        return new Promise((resolve, reject) => {
            this.phantom.createPage(page => {
                if (page) {

                    if (debug) {
                        page.onConsoleMessage(function(msg) {
                            console.log(msg);
                        });
                    } else {
                        page.set('onError', () => {});
                    }

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
            this.page.open(url, () => {
                setTimeout(() => {
                    this.page.get('url', (pageUrl) => {
                        if (pageUrl === url) {
                            resolve();
                        } else {
                            const mensage = `Wrong page. Should be "${url}" and it's "${pageUrl}".`;
                            reject(mensage);
                        }
                    });
                }, 2000);
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
            this.page.evaluate((options) => {
                document.getElementById('UserEmail').value = options.email;
                document.getElementById('UserPassword').value = options.password;
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

    /**
     * Wait for the problem be prosseced. When it's finished, print the answer.
     */
    waitForAnswer({number, availableAttempts = 10}) {
        return new Promise(resolve => {
            return this._waitForAnswer({number, resolve, availableAttempts});
        });
    }

    _waitForAnswer({number, resolve, availableAttempts}) {
        this.page.evaluate((options) => {
            var table = document.getElementById('element').children[0];
            var tbody = table.children[1];
            var answer = '- In queue -';

            for (var i = 0; i < tbody.children.length; i++) {
                var tr = tbody.children[i];

                var tiny = tr.getElementsByClassName('tiny')[0].innerText;

                if (options.number === parseInt(tiny)) {
                    answer = tr.getElementsByClassName('answer')[0].innerText;
                    break;
                }

            }

            return answer;
        },
        (answer) => {
            if (answer === '- In queue -') {
                if (availableAttempts) {
                    availableAttempts--;

                    setTimeout(() => {
                        this._waitForAnswer({number, resolve, availableAttempts});
                    }, 3000);
                } else {
                    resolve(`Can't find the answer`);
                }
            } else {
                resolve(answer);
            }

        },
        {
            number,
        });
    }

}
