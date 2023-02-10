import { open } from 'node:fs/promises';
import { appendFile, unlink } from 'node:fs';
import { rawNamesPath } from './fetch.mjs';

const namesPath = './index.ts';
const typePath = './index.d.ts';

const file = await open(rawNamesPath);

unlink(namesPath, (err) => {
    if (err) console.error(err.message)
    else console.log(`File ${namesPath} was deleted`)
})

/**
 * @type {string[]}
 */
const hash = [];

for await (const line of file.readLines()) {
    const rawName = nameFromLine(line);
    const name = parsedNameFromLine(line);

    if (hash.includes(name)) continue;

    appendFile(namesPath, `export const ${name} = '${rawName}';\n`, (err) => {
        if (err) console.error(err.message)
        else console.log(`${name} was added`)
    });

    appendFile(typePath, `export const ${name}: string;\n`, (err) => {
        if (err) console.error(err.message);
        else console.log(`type ${name} was added`);
    })

    hash.push(name);
}

file.close();

/**
 * @param {string} line
 */
function nameFromLine(line) {
    return line.split(' ')[0]
}

/**
 * @param {string} line
 */
function parsedNameFromLine(line) {
    return `ms${snakeToPascal(nameFromLine(line))}`
}

/**
 * @param {string} str
 */
function capitalize(str) {
    if (str.length === 0) return '';
    if (str.length === 1) return str.toUpperCase();
    return str[0].toUpperCase() + str.slice(1);
}

/**
 * @param {string} str
 */
function snakeToPascal(str) {
    return str.split('_').map(part => capitalize(part)).join('');
}