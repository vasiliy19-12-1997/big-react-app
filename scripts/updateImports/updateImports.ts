import { Project } from 'ts-morph';

const project = new Project({});
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');
const files = project.getSourceFiles();

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
