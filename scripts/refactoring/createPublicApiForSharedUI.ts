import { Directory, Project } from 'ts-morph';

const path = require('path');

const project = new Project({});
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');
const files = project.getSourceFiles();
const uiPath = path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui');
const sharedDirectory = project.getDirectory(uiPath);
const sharedDirectories = sharedDirectory?.getDirectories();
sharedDirectories?.forEach((dir) => {
    console.log(dir.getBaseName());
});
function isFsdAndAbsolute(value:string) {
    const layers = ['shared', 'entities', 'features', 'widgets', 'pages', 'app'];
    return layers.some((layer) => value.startsWith(layer));
}

files.forEach((sourceFile) => {
    const importDeclorations = sourceFile.getImportDeclarations();
    importDeclorations.forEach((importDecloration) => {
        const value = importDecloration.getModuleSpecifierValue();

        if (isFsdAndAbsolute(value)) {
            importDecloration.setModuleSpecifier(`@/${value}`);
        }
    });
});
project.save();
