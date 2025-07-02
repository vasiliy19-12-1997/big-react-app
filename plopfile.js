// plopfile.js
module.exports = function (plop) {
    plop.setGenerator('react-component', {
        description: 'Создать React-компонент с модульными стилями',
        prompts: [
            {
                type: 'input',
                name: 'destinationpath',
                message: 'Куда положить файлы?',
                default: 'src/components',
            },
            {
                type: 'input',
                name: 'componentName',
                message: 'Имя компонента (PascalCase)',
                validate: (value) => (value && /^[A-Z][A-Za-z0-9]+$/.test(value)
                    ? true
                    : 'Имя должно быть в PascalCase'),
            },
        ],
        actions: [
            {
                type: 'add',
                path: '{{destinationpath}}/{{componentName}}/{{componentName}}.tsx',
                templateFile: 'plop-templates/Component.tsx.hbs',
            },
            {
                type: 'add',
                path:
          '{{destinationpath}}/{{componentName}}/{{componentName}}.module.scss',
                templateFile: 'plop-templates/Component.module.scss.hbs',
            },
            {
                type: 'add',
                path: '{{destinationpath}}/{{componentName}}/{{componentName}}.stories.tsx',
                templateFile: 'plop-templates/Component.stories.tsx.hbs',
            },
        ],
    });
};
