# [5.3.0](https://github.com/matheussampaio/urionlinejudge-cli/compare/v5.2.1...v5.3.0) (2018-06-20)


### Features

* move to inquirer ([67fec26](https://github.com/matheussampaio/urionlinejudge-cli/commit/67fec26))



## [5.2.1](https://github.com/matheussampaio/urionlinejudge-cli/compare/v5.2.0...v5.2.1) (2018-06-19)


### Bug Fixes

* publish to npm as well ([5975b93](https://github.com/matheussampaio/urionlinejudge-cli/commit/5975b93))



# [5.2.0](https://github.com/matheussampaio/urionlinejudge-cli/compare/v5.1.0...v5.2.0) (2018-06-19)


### Features

* submit question using puppeteer ([ba6563e](https://github.com/matheussampaio/urionlinejudge-cli/commit/ba6563e))
* update semantic-release configurations ([3b60a01](https://github.com/matheussampaio/urionlinejudge-cli/commit/3b60a01))



# [5.1.0](https://github.com/matheussampaio/urionlinejudge-cli/compare/v5.0.1...v5.1.0)  (2016-04-06)

#### Features
- add init command ([43ba53f8](https://github.com/matheussampaio/urionlinejudge-cli/commit/43ba53f8))



## [5.0.1](https://github.com/matheussampaio/urionlinejudge-cli/compare/v5.0.0...v5.0.1) (2016-04-06)

#### Bug Fixes
- refresh page to check if answer changes ([4727115c](https://github.com/matheussampaio/urionlinejudge-cli/commit/4727115c))



# [5.0.0](https://github.com/matheussampaio/urionlinejudge-cli/compare/v4.3.0...v5.0.0) (2016-04-06)

#### Features
- add multiple languages and getting number from filename ([4466d3a6](https://github.com/matheussampaio/urionlinejudge-cli/commit/4466d3a6))
- setting language when submiting ([ad4440e8](https://github.com/matheussampaio/urionlinejudge-cli/commit/ad4440e8))
- add python ([8493cbd8](https://github.com/matheussampaio/urionlinejudge-cli/commit/8493cbd8))

#### Breaking Changes
- submit command change
  $ urionlinejudge submit <filepath>
  
  ([4466d3a6](https://github.com/matheussampaio/urionlinejudge-cli/commit/4466d3a6))



# [4.3.0](https://github.com/matheussampaio/urionlinejudge-cli/compare/v4.2.0...v4.3.0) (2016-03-14)

#### Features
- add template to configs and simplify commands ([fe40e5fc](https://github.com/matheussampaio/urionlinejudge-cli/commit/fe40e5fc))



# [4.2.0](https://github.com/matheussampaio/urionlinejudge-cli/compare/v4.1.2...v5.2.0) (2016-02-09)

#### Bug Fixes
- update login form ids ([1c293b34](https://github.com/matheussampaio/urionlinejudge-cli/commit/1c293b34))

#### Features
- update dependencies ([e3d7ea12](https://github.com/matheussampaio/urionlinejudge-cli/commit/e3d7ea12))
- release configs ([4230f83e](https://github.com/matheussampaio/urionlinejudge-cli/commit/4230f83e))



## [4.1.2](https://github.com/matheussampaio/urionlinejudge-cli/compare/v4.1.1...v4.1.2) (2015-12-10)

#### Bug Fixes
- remove console.log ([536bc5c1](https://github.com/matheussampaio/urionlinejudge-cli/commit/536bc5c1))



## [4.1.1](https://github.com/matheussampaio/urionlinejudge-cli/compare/v4.1.0...v4.1.1) (2015-12-10)

#### Bug Fixes
- add polyfill and fix urls ([9cc6f801](https://github.com/matheussampaio/urionlinejudge-cli/commit/9cc6f801))



# [4.1.0](https://github.com/matheussampaio/urionlinejudge-cli/compare/v4.0.0...v4.1.0) (2015-12-10)

#### Bug Fixes
- add node bin ([2210027e](https://github.com/matheussampaio/urionlinejudge-cli/commit/2210027e))

#### Features
- removing phantomjs from travis ([84edb838](https://github.com/matheussampaio/urionlinejudge-cli/commit/84edb838))



# [4.0.0](https://github.com/matheussampaio/urionlinejudge-cli/compare/v3.2.0...v4.0.0) (2015-12-10)

#### Features
- using nightmare instead phantomjs ([87194398](https://github.com/matheussampaio/urionlinejudge-cli/commit/87194398), closes [#5](https://github.com/matheussampaio/urionlinejudge-cli/issues/5))

#### Breaking Changes
- using nightmare instead phantomjs ([87194398](https://github.com/matheussampaio/urionlinejudge-cli/commit/87194398))



# [3.2.0](https://github.com/matheussampaio/urionlinejudge-cli/compare/v3.1.0...v3.2.0) (2015-12-03)

#### Features
- add fetch command ([bffd84ef](https://github.com/matheussampaio/urionlinejudge-cli/commit/bffd84ef))



# [3.1.0](https://github.com/matheussampaio/urionlinejudge-cli/compare/v3.0.0...v3.1.0) (2015-11-27)

#### Features
- removing install before pushing ([4f542031](https://github.com/matheussampaio/urionlinejudge-cli/commit/4f542031))



# [3.0.0](https://github.com/matheussampaio/urionlinejudge-cli/compare/v2.4.0...v3.0.0) (2015-11-26)

#### Breaking Changes
- Now all `beta` release will be published on `next`

```
$ npm install urionlinejudge-cli@next
```

 ([c5950a6d](https://github.com/matheussampaio/urionlinejudge-cli/commit/c5950a6d))



# [2.4.0](https://github.com/matheussampaio/urionlinejudge-cli/compare/v2.3.1...v2.4.0) (2015-11-25)

#### Features
- only show warning if version is outdated ([2fbfccf0](https://github.com/matheussampaio/urionlinejudge-cli/commit/2fbfccf0))



## [2.3.1](https://github.com/matheussampaio/urionlinejudge-cli/compare/v2.3.0...v2.3.1) (2015-11-25)

#### Bug Fixes
- uncomment code and change npm version ([4c9d2abd](https://github.com/matheussampaio/urionlinejudge-cli/commit/4c9d2abd))
- move check-update to dependencies ([fb94dd3f](https://github.com/matheussampaio/urionlinejudge-cli/commit/fb94dd3f))



# [2.3.0](https://github.com/matheussampaio/urionlinejudge-cli/compare/v2.2.0...v2.3.0) (2015-11-25)

#### Features
- add analytics (beta) ([bd5ccff4](https://github.com/matheussampaio/urionlinejudge-cli/commit/bd5ccff4))



# [2.2.0](https://github.com/matheussampaio/urionlinejudge-cli/compare/v2.1.1...v2.2.0) (2015-11-24)

#### Features
- warning if version is outdated ([57c728af](https://github.com/matheussampaio/urionlinejudge-cli/commit/57c728af))



## [2.1.1](https://github.com/matheussampaio/urionlinejudge-cli/compare/v2.1.0...v2.1.1) (2015-11-24)

#### Bug Fixes
- add babel-core to dependencies ([9784dd9d](https://github.com/matheussampaio/urionlinejudge-cli/commit/9784dd9d))



# [2.1.0](https://github.com/matheussampaio/urionlinejudge-cli/compare/v2.0.0...v2.1.0) (2015-11-23)

#### Bug Fixes
- return user at the end ([2385c43b](https://github.com/matheussampaio/urionlinejudge-cli/commit/2385c43b))

#### Features
- add feedback mensage to reset command ([516910c0](https://github.com/matheussampaio/urionlinejudge-cli/commit/516910c0))
- add answer result resolver ([d0338f2e](https://github.com/matheussampaio/urionlinejudge-cli/commit/d0338f2e))
- resolve problem anwer ([42152673](https://github.com/matheussampaio/urionlinejudge-cli/commit/42152673), closes [#2](https://github.com/matheussampaio/urionlinejudge-cli/issues/2))



# [2.0.0](https://github.com/matheussampaio/urionlinejudge-cli/compare/v1.1.2...v2.0.0) (2015-10-30)

#### Features
- add progress bar ([8d314785](https://github.com/matheussampaio/urionlinejudge-cli/commit/8d314785))
- remove phantom stdout ([d15dd1c3](https://github.com/matheussampaio/urionlinejudge-cli/commit/d15dd1c3))

#### Breaking Changes
- change command and params to use the cli ([6c7468b5](https://github.com/matheussampaio/urionlinejudge-cli/commit/6c7468b5))



## [1.1.2](https://github.com/matheussampaio/urionlinejudge-cli/compare/v1.1.1...v1.1.2) (2015-10-19)

#### Bug Fixes
- fixing config file path ([f41cb9d4](https://github.com/matheussampaio/urionlinejudge-cli/commit/f41cb9d4))



## [1.1.1](https://github.com/matheussampaio/urionlinejudge-cli/compare/v1.1.0..v1.1.1) (2015-10-19)

#### Bug Fixes
- move read and config to dependencies ([743eea6f](https://github.com/matheussampaio/urionlinejudge-cli/commit/743eea6f))



# [1.1.0](https://github.com/matheussampaio/urionlinejudge-cli/compare/v1.0.0..v1.1.0) (2015-10-19)

#### Features
- ask for using infos ([0d5bfad3](https://github.com/matheussampaio/urionlinejudge-cli/commit/0d5bfad3), closes [#1](https://github.com/matheussampaio/urionlinejudge-cli/issues/1))



# 1.0.0 (2015-10-19)

#### Bug Fixes
- add babel to dev dependencies ([b5239cd3](https://github.com/matheussampaio/urionlinejudge-cli/commit/b5239cd3))
- fixed phantomjs and gulp installation ([9600753d](https://github.com/matheussampaio/urionlinejudge-cli/commit/9600753d))

#### Features
- add more es6 and conventional changelog ([9c9f6a30](https://github.com/matheussampaio/urionlinejudge-cli/commit/9c9f6a30))

#### Breaking Changes
- change dist paths ([9c9f6a30](https://github.com/matheussampaio/urionlinejudge-cli/commit/9c9f6a30))
