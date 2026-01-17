import { Project, SyntaxKind, Node } from 'ts-morph';

const project = new Project({});
// project.addSourceFilesAtPaths('src/**/*.ts');
// project.addSourceFilesAtPaths('src/**/*.tsx');
project.addSourceFilesAtPaths('src/**/ArticlePageDetails.tsx');
const files = project.getSourceFiles();

function isTogglkeFunction(node: Node) {
    let isToggleFeaturesUsed = false;
    node.forEachChild((child) => {
        if (child.isKind(SyntaxKind.Identifier) && child.getText() === 'toggleFeatures') {
            isToggleFeaturesUsed = true;
        }
    });
}
files.forEach((sourceFile) => {
    sourceFile.forEachDescendant((node) => {
        if (node.isKind(SyntaxKind.CallExpression) && isTogglkeFunction(node)) {
        }
    });
});
project.save();
