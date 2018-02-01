const Generator = require('yeoman-generator');
const glob = require('glob');
const path = require('path');
const _ = require('lodash');
const {removeScope} = require('remove-scope');

module.exports = class extends Generator {
  initializing() {
    this.props = {};
  }

  prompting() {
    // ask for package name
    // check if scoped is set
    // ask for component name
    return this.prompt([
      {
        type    : 'input',
        name    : 'packageName',
        message : 'Name of your package (e.g. @scope/package-name)'
      },
      {
        type    : 'input',
        name    : 'componentName',
        message : 'Name of your component (e.g. Button)'
      }])
      .then((answers) => {
        this.props.packageName = answers.packageName;
        this.props.componentName = answers.componentName;

        // convert to snakecase
        this.props.packageBundleName = _.snakeCase(removeScope(answers.packageName));
      });
  }

  writing() {
    console.log(this.templatePath('_ComponentName'));

    const options = {nodir: true};

// options is optional
    glob(`${this.templatePath()}/**/*`, options, (er, files) => {

      files.forEach((file) => {
        // split for template
        const newFile = file
          .split(this.templatePath() + '/')[1]
          .replace(/_ComponentName/g, this.props.componentName);


        const destinationPath = path.join(this.destinationPath(), 'packages', newFile);


        this.fs.copyTpl(file, destinationPath, this.props);
      });
    });
  }
};
