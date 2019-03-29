const Generator = require('yeoman-generator');
const glob = require('glob');
const path = require('path');
const _ = require('lodash');
const {removeScope} = require('remove-scope');
const version = require('../../package').version;

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('componentName', { type: String, required: false });
  }

  initializing() {
    this.props = {};
    this.props.packageScope = _.get(this.config.getAll(), 'promptValues.packageScope', null);
    this.log(`generator-cosy v${version}`);
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
      {
        type: 'list',
        name: 'atomicType',
        message: 'Atomic Design Stage',
        choices: ['Atom', 'Molecule', 'Organism', 'Template', 'Page']
      },
      {
        type: 'confirm',
        name: 'useProjectSwitch',
        message: 'Would you like to use the "Project Switch" Add-on?'
      },
      {
        when: (answers) => answers.useProjectSwitch,
        type: 'checkbox',
        name: 'allowedProjects',
        message: 'Please select the allowed projects for your component',
        choices: [
          {name: 'zurich', value: 'zurich', checked: true},
          {name: 'vita', value: 'vita', checked: true}
        ]
      },
      {
        type: 'confirm',
        name: 'useSeparateBundle',
        message: 'Would you like to use a separate bundle file?'
      },
      {
        type: 'confirm',
        name: 'useLayoutComponent',
        message: 'Would you like to use the LayoutComponent?'
      },

      ])
      .then((answers) => {
        this.props.packageName = this.props.packageScope ?
          this.props.packageScope + '/' + answers.packageName : answers.packageName;

        this.props.componentName = this.options.componentName || answers.componentName;

        // convert to snakecase
        this.props.packageBundleName = _.kebabCase(removeScope(answers.packageName));
        this.props.atomicType = answers.atomicType;
        this.props.useProjectSwitch = answers.useProjectSwitch;
        this.props.useLayoutComponent = answers.useLayoutComponent;
        this.props.allowedProjects = JSON.stringify(answers.allowedProjects || []);
        this.props.useSeparateBundle = answers.useSeparateBundle;
      });
  }

  writing() {
    const options = {nodir: true};

    const {useSeparateBundle} = this.props;

    glob(path.join(this.templatePath(), '/**/*'), options, (er, files) => {

      files.forEach((file) => {
        const templatePath = path.join(this.templatePath(), '/');
        // split for template
        // we have to use path.join here, because of different path separators on win and linux
        const newFile = path
          .join(file)
          .split(templatePath)[1]
          .replace(/_ComponentName/g, this.props.componentName)
          .replace(/\/_/g, '/')
          .replace(/\\_/g, '\\');

        const destinationPath = path.join(this.destinationPath(), 'packages', newFile);

        if (
          !file.endsWith('bundle.js')
          || file.endsWith('bundle.js') && useSeparateBundle
        ) {
          this.fs.copyTpl(file, destinationPath, this.props);
        }
      });
    });
  }
};
