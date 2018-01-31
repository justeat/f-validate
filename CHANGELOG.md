# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


v0.10.0
------------------------------
*January 31, 2018*

### Changed
- Only validate fields on blur/keyup if they are not empty
- Amending dateInFuture rule to validate correctly when selecting current year/month


v0.9.0
------------------------------
*January 30, 2018*

### Added
- Browserslist added

### Changed
- Package update for `gulp-build-fozzie`
- Updating the babel config

### Fixed
- Fixed test warning for js-dom on `submit` (as it doesn't handle submit events)


v0.8.2
------------------------------
*January 26, 2018*

### Added
- Added "files" property to `package.json` so that only the `dist` directory is published to npm.


v0.8.1
------------------------------
*January 26, 2018*

### Removed
- Unnecessary space from import

v0.8.0
------------------------------
*January 24, 2018*

### Added
- Ability to validate on 'blur' or 'keyup'
- Migrated 'dateinfuture' rule from other project
- Explicitly restrict an implementation where you're able to both group messages and validate on blur/keyup

v0.7.0
------------------------------
*January 19, 2018*

### Added
- Default error message to each rule
- Logic to display and hide default error messages
- Logic to display and hide custom error messages
- Ability to group messages together either at the top/bottom of form

### Changed
- Moved classes into constants file

v0.6.1
------------------------------
*January 14, 2018*

### Changed
- Split rule definitions and associated unit tests into separate files.
- Updated some of the unit test descriptions.

### Removed
- Unnecessary eslint disable line comments.


v0.6.0
------------------------------
*January 11, 2018*

### Added
- Callback handlers for success and error events.
- Separate callback.js file added to manage callback addition and running.


v0.5.0
------------------------------
*December 20, 2017*

### Added
- Added JS unit test utility module.

### Changed
- Using JS unit test utility module in unit test files.


v0.4.0
------------------------------
*December 20, 2017*

### Added
- Using `concurrently` to run npm tasks concurrently...!

### Changed
- Main file pointed at dist directory.
- Fixed ESlint issues.
- Changed custom validation rule so that it throws an error rather than logs to the console.
- Tidied up Travis config.

### Removed
- Removed placeholder readmes.


v0.3.0
------------------------------
*December 19, 2017*

### Added
- Removed inputs with certain attributes from being validated.

### Changed
- Prevented the last rule on a field from overwriting previous state.
- Binding isValid method to submit.


v0.2.0
------------------------------
*December 19, 2017*

### Added
- Added base rules JSON and conditions/tests.


v0.1.0
------------------------------
*December 12, 2017*

### Added
- Initial setup of component template.
