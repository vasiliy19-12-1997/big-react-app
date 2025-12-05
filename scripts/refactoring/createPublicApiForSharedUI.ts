import { Project } from 'ts-morph';

const path = require('path');

const project = new Project({});
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');
const files = project.getSourceFiles();
const uiPath = path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui');
const sharedDirectory = project.getDirectory(uiPath);
const sharedDirectories = sharedDirectory?.getDirectories();
sharedDirectories?.forEach((dir) => {
    const indexPath = `${dir.getPath()}/index.ts`;
    const indexFile = dir.getSourceFile(indexPath);
    if (!indexFile) {
        const sourceCode = `export * from './${dir?.getBaseName()}';`;
        const file = dir.createSourceFile(indexPath, sourceCode);
        file.save();
    }
});
function isFsdAndAbsolute(value:string) {
    const layers = ['shared', 'entities', 'features', 'widgets', 'pages', 'app'];
    return layers.some((layer) => value.startsWith(layer));
}

files.forEach((sourceFile) => {
    const importDeclorations = sourceFile.getImportDeclarations();
    importDeclorations.forEach((importDecloration) => {
        const value = importDecloration.getModuleSpecifierValue();
        const valueWithoutAlias = value.replace('@/', '');

        const segments = valueWithoutAlias.split('/');
        const isSharedUi = segments[0] === 'shared' && segments[1] === 'ui';
        if (isFsdAndAbsolute(valueWithoutAlias) && isSharedUi) {
            const result = valueWithoutAlias.split('/').slice(0, 3).join('/');
            importDecloration.setModuleSpecifier(`@/${result}`);
        }// import { SortOrder } from '@/shared/types';
    });
});
project.save();
