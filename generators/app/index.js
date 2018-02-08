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
    return this.prompt([
      {
        type    : 'input',
        name    : 'projectName',
        message : 'Your COSY project name',
        default : this.appname // Default to current folder name
      },
      // {
      //   type: 'confirm',
      //   name: 'eslintJsxA11y',
      //   message: 'Do you want eslint-jsx-a11y support?',
      //   default: true
      // }
      ])
      .then((answers) => {
        this.props = answers;
        // this.log('app name', answers.name);
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

    // update package.json
    // const packageJson = require('./templates/package.json');
    // const eslintJson = require('./templates/_.eslintrc.json');
    //
    // if (this.props.eslintJsxA11y) {
    //   packageJson.devDependencies['eslint-plugin-jsx-a11y'] = '6.0.2';
    //   eslintJson.extends.push('plugin:jsx-a11y/recommended');
    // }
    //
    // this.fs.writeJSON(this.destinationPath('package.json'), packageJson);
    // this.fs.writeJSON(this.destinationPath('.eslintrc.json'), eslintJson);

  }

  install() {
    this.installDependencies({bower: false});
  }
};
