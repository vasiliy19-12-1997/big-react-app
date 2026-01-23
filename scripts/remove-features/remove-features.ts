import { Project, SyntaxKind, Node, JsxAttribute } from 'ts-morph';

const project = new Project({});
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const removedFeatureName = process.argv[2]; // e.g., 'isCounterEnabled'
const featureState = process.argv[3]; // 'on' or 'off'

const toggleComponentName = 'ToggleFeatures';
const toggleFunctionName = 'toggleFeatures';

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
        if (child.isKind(SyntaxKind.Identifier) && child.getText() === toggleFunctionName) {
            isToggleFeaturesUsed = true;
        }
    });
    return isToggleFeaturesUsed;
}
function isToggleFeaturesComponent(node: Node) {
    const ToggleFeaturesUsed = node.getFirstDescendantByKind(SyntaxKind.Identifier);
    return ToggleFeaturesUsed?.getText() === toggleComponentName;
}

const replaceToggleFunction = (node: Node) => {
    const firstArg = node.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression);
    if (!firstArg) return;
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
};

const getAttributeNodeByName = (jsxAttributes: JsxAttribute[], name: string) => {
    return jsxAttributes.find((node) => node.getName() === name);
};

const getReplacedComponent = (attribute?: JsxAttribute) => {
    const value = attribute?.getFirstDescendantByKind(SyntaxKind.JsxExpression)?.getExpression()?.getText();

    if (value?.startsWith('(')) {
        return value.slice(1, -1);
    }

    return value;
};

const replaceComponent = (node: Node) => {
    const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute);

    const onAttribute = getAttributeNodeByName(attributes, 'on');
    const offAttribute = getAttributeNodeByName(attributes, 'off');

    const featureNameAttribute = getAttributeNodeByName(attributes, 'name');
    const featureName = featureNameAttribute
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        ?.getText()
        ?.slice(1, -1);

    if (featureName !== removedFeatureName) return;

    const offValue = getReplacedComponent(offAttribute);
    const onValue = getReplacedComponent(onAttribute);

    if (featureState === 'on' && onValue) {
        node.replaceWithText(onValue);
    }

    if (featureState === 'off' && offValue) {
        node.replaceWithText(offValue);
    }
};

files.forEach((sourceFile) => {
    sourceFile.forEachDescendant((node) => {
        if (node.isKind(SyntaxKind.CallExpression) && isToggleFeaturesFunction(node)) {
            replaceToggleFunction(node);
        }
        if (node.isKind(SyntaxKind.JsxSelfClosingElement) && isToggleFeaturesComponent(node)) {
            replaceComponent(node);
        }
    });
});
project.save();
