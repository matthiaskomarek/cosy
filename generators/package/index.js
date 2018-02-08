const Generator = require('yeoman-generator');
const glob = require('glob');
const path = require('path');
const _ = require('lodash');
const {removeScope} = require('remove-scope');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('componentName', { type: String, required: false });
  }

  initializing() {
    this.props = {};
    this.props.packageScope = _.get(this.config.getAll(), 'promptValues.packageScope', null);
  }

  prompting() {
    // ask for package name
    // check if scoped is set
    // ask for component name
    return this.prompt([
      {
        when: () => !this.options.componentName,
        type    : 'input',
        name    : 'componentName',
        message : 'Name of your component (e.g. Button)'
      },
      {
        type    : 'input',
        name    : 'packageName',
        message : 'Name of your package',
        default: (prevAnswer) => {
          if (this.options.componentName) {
            return _.kebabCase(this.options.componentName);
          }

          return _.kebabCase(prevAnswer.componentName);
        },
        validate: (input) => {
          // don't allow package scope when already specified in project
          if (this.props.packageScope && (input.includes('@') || input.includes('/'))) {
            return `Package scope (${this.props.packageScope}) will be added automatically`;
          }

          return true;
        }
      },
      ])
      .then((answers) => {
        this.props.packageName = this.props.packageScope ?
          this.props.packageScope + '/' + answers.packageName : answers.packageName;

        this.props.componentName = this.options.componentName || answers.componentName;

        // convert to snakecase
        this.props.packageBundleName = _.kebabCase(removeScope(answers.packageName));
      });
  }

  writing() {
    console.log(this.templatePath('_ComponentName'));

    const options = {nodir: true};

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
