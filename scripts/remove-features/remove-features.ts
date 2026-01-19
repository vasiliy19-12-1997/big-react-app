import { Project, SyntaxKind, Node } from 'ts-morph';

const project = new Project({});
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const removedFeatureName = process.argv[2]; // e.g., 'isCounterEnabled'
const featureState = process.argv[3]; // 'on' or 'off'

if (!removedFeatureName) {
    throw new Error('Пожалуйста, укажите название фичи для удаления');
}
if (!featureState) {
    throw new Error('Пожалуйста, укажите состояние фичи: on или off');
}
if (featureState !== 'on' && featureState !== 'off') {
    throw new Error('Пожалуйста, укажите правильное состояние фичи: on или off');
}

const files = project.getSourceFiles();

function isToggleFeaturesFunction(node: Node) {
    let isToggleFeaturesUsed = false;
    node.forEachChild((child) => {
        if (child.isKind(SyntaxKind.Identifier) && child.getText() === 'toggleFeatures') {
            isToggleFeaturesUsed = true;
        }
    });
    return isToggleFeaturesUsed;
}
files.forEach((sourceFile) => {
    sourceFile.forEachDescendant((node) => {
        if (node.isKind(SyntaxKind.CallExpression) && isToggleFeaturesFunction(node)) {
            const firstArg = node.getArguments()[0];
            if (firstArg && firstArg.isKind(SyntaxKind.ObjectLiteralExpression)) {
                const onProperty = firstArg.getProperty('on');
                const offProperty = firstArg.getProperty('off');
                const featureNameProperty = firstArg.getProperty('name');

                const onFunction = onProperty?.getFirstDescendantByKindOrThrow(SyntaxKind.ArrowFunction);
                const offFunction = offProperty?.getFirstDescendantByKindOrThrow(SyntaxKind.ArrowFunction);

                const featureName = featureNameProperty
                    ?.getFirstDescendantByKindOrThrow(SyntaxKind.StringLiteral)
                    .getText()
                    .slice(1, -1);

                if (featureName !== removedFeatureName) {
                    // eslint-disable-next-line no-useless-return
                    return;
                }
                if (featureState === 'on') {
                    node.replaceWithText(onFunction?.getBody().getText() ?? '');
                }
                if (featureState === 'off') {
                    node.replaceWithText(offFunction?.getBody().getText() ?? '');
                }
            }
        }
    });
});
project.save();
