import { appendFile, unlink } from 'node:fs';

export const rawNamesPath = './names';

const { body } = await fetch(
    'https://raw.githubusercontent.com/google/material-design-icons/master/font/MaterialIcons-Regular.codepoints',
);

if (!body) throw new Error('There is no response body')

const reader = body.getReader();

unlink(rawNamesPath, (err) => {
    if (err) console.error(err.message);
    else console.log(`File ${rawNamesPath} was deleted`)
})

// eslint-disable-next-line no-constant-condition
while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    if (!value) throw new Error('There is no body value');

    appendFile(rawNamesPath, value, (err) => {
        if (err) console.error(err.message)
        else console.log(`Part with length ${value?.length} was written`)
    });
}
