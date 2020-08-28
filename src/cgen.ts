// import readline from 'readline';
// import { generateFile } from './generator';
// import { createDirectoryStructure } from './generator';
//
// const mdxTemplate = 'mdx';
// const indexTemplate = 'index';
// const typesTemplate = 'types';
// const defaultsTemplate = 'defaults';
// const testTemplate = 'component-test';
// const sbTemplate = 'storybook-component';
// const assetIndexTemplate = 'asset-index';
// const fcTemplate = 'functional-component';
//
// const generateAll = componentName => {
//   createDirectoryStructure(componentName);
//   generateFile(componentName, fcTemplate, '.tsx');
//   generateFile(componentName, testTemplate, '.test.tsx');
//   generateFile(componentName, sbTemplate, '.stories.tsx');
//   generateFile(componentName, mdxTemplate, '.stories.mdx');
//   generateFile(componentName, indexTemplate, '.ts', 'index');
//   generateFile(componentName, typesTemplate, '.ts', 'types');
//   generateFile(componentName, defaultsTemplate, '.ts', 'defaults');
//   generateFile(componentName, assetIndexTemplate, '.ts', 'assets/index');
// };
//
// const runPrompt = promptText => {
//   const cli = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });
//
//   return new Promise(resolve =>
//     cli.question(promptText, response => {
//       cli.close();
//       resolve(response);
//     })
//   );
// };
//
// const run = async () => {
//   const timerLabel = '\ngenerating component boilerplate...  ';
//   const componentName = await runPrompt('\n\nEnter the component name: ');
//   await console.time(timerLabel);
//   await generateAll(componentName);
//   await console.timeEnd(timerLabel);
// };
//
// run().then(() => console.debug('\n🍪🍩🍔🍪🍩🍔🍪🍩🍔🍪🍩🍔🍪🍩🍔\n'));
