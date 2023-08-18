const {readFileSync, writeFileSync} = require('fs');
const {join} = require('path');

const config = require("./src/behaviorConfig.js");

// parse instance.js
//const instanceCode = readFileSync(join(__dirname, 'src/instance.js'), 'utf8');
//const instanceCodeLines = instanceCode.split('\n');

// get list of keys in Act object in config
const configActKeys =  Object.keys(config.Acts);

// generate function from actions in config
const configActFunctions = configActKeys.map((key) => {
    const action = config.Acts[key];
    const {forward, params} = action;
    if (forward) {
        const parameterNames = params.map((param) => {
            const name = param.name.toLowerCase();
            const nameCapitalized = name.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
            const nameNoSpaces = nameCapitalized.replace(/\s/g, '');
            const nameNoSpacesLowercase = nameNoSpaces.charAt(0).toLowerCase() + nameNoSpaces.slice(1);
            return nameNoSpacesLowercase;
        });
        const parameterString = parameterNames.join(', ');
        const functionString = `    ${forward}(${parameterString}) {\r      // implementation\r    };\r\r`;
        return functionString;
    }
});

const configCndKeys =  Object.keys(config.Cnds);

// generate function from conditions in config
const configCndFunctions = configCndKeys.map((key) => {
    const condition = config.Cnds[key];
    const {forward, params} = condition;
    if(forward) {
        const parameterNames = params.map((param) => {
            const name = param.name.toLowerCase();
            const nameCapitalized = name.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
            const nameNoSpaces = nameCapitalized.replace(/\s/g, '');
            const nameNoSpacesLowercase = nameNoSpaces.charAt(0).toLowerCase() + nameNoSpaces.slice(1);
            return nameNoSpacesLowercase;
        });
        const parameterString = parameterNames.join(', ');
        const functionString = `    ${key}(${parameterString}) {\r      return true;\r    };\r\r`;
        return functionString;
    }
});

const configExpKeys =  Object.keys(config.Exps);

// generate function from expressions in config
const configExpFunctions = configExpKeys.map((key) => {
    const expression = config.Exps[key];
    const {forward, params} = expression;
    if(forward) {
        const parameterNames = params.map((param) => {
            const name = param.name.toLowerCase();
            const nameCapitalized = name.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
            const nameNoSpaces = nameCapitalized.replace(/\s/g, '');
            const nameNoSpacesLowercase = nameNoSpaces.charAt(0).toLowerCase() + nameNoSpaces.slice(1);
            return nameNoSpacesLowercase;
        });
        const parameterString = parameterNames.join(', ');
        const functionString = `    ${key}(${parameterString}) {\r      return null;\r    };\r\r`;
        return functionString;
    }
});

const actions = configActFunctions.join('\n');
const conditions = configCndFunctions.join('\n');
const expressions = configExpFunctions.join('\n');
const instanceCodeLinesWithFunctions = `const functions = class {\r${actions}\n${conditions}\n${expressions}\r};`;

writeFileSync(join(__dirname, 'src/_generated_instance.js'), instanceCodeLinesWithFunctions);






