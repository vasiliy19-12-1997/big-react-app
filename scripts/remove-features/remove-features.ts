import { Project } from 'ts-morph';

const project = new Project({});
// project.addSourceFilesAtPaths('src/**/*.ts');
// project.addSourceFilesAtPaths('src/**/*.tsx');
project.addSourceFilesAtPaths('src/**/ArticlePageDetails.tsx');
const files = project.getSourceFiles();

files.forEach((sourceFile) => {});
project.save();
