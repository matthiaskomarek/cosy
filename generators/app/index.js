const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  initializing() {
    this.props = {};
  }

  _stripLeadingLoDash(name) {
    return name.indexOf('_') === 0 ? name.substring(1) : name;
  };

  prompting() {
    return this.prompt([{
      type    : 'input',
      name    : 'name',
      message : 'Your COSY project name',
      default : this.appname // Default to current folder name
    }])
      .then((answers) => {
        this.props.projectName = answers.name;
        this.log('app name', answers.name);
        this.log('cool feature', answers.cool);
      });
  }

  writing() {
    const files = require('./files.json');

    files.static.forEach((file) => {
      this.fs.copy(
        this.templatePath(file),
        this.destinationPath(this._stripLeadingLoDash(file))
      );
    });

    this.fs.copy(this.templatePath('.storybook'), this.destinationPath('.storybook'));
    mkdirp.sync(this.destinationPath('packages'));
  }

  install() {
    this.installDependencies({bower: false});
  }
};
