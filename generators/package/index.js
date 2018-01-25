const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.props = {};
  }

  _stripLeadingLoDash(name) {
    return name.indexOf('_') === 0 ? name.substring(1) : name;
  };

  prompting() {
    return this.prompt([{
      type    : 'input',
      name    : 'packageName',
      message : 'Name of your package'
    }])
      .then((answers) => {
        this.props.packageName = answers.name;
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
    this.fs.copy(this.templatePath('packages'), this.destinationPath('packages'));
  }
};
