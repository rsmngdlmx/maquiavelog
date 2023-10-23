/**
 * outputs.js
 * Main logic for outputs.
 * 
 * Copyright (c) 2023 Ricardo Mendoza.
 * Licensed under the MIT License.
 */

'use strict';

// Output structure:
// {
//     stream: null,
//     level: null,
//     format: null,
//     prefix: null,
//     bindings: null
// }

function addOutput(output) {
    if (!output || !output.stream) {
        throw new Error('No stream provided');
    }

    if (!output.stream.write || typeof output.stream.write !== 'function') {
        throw new Error('The stream provided does not have a write method');
    }

    let level;

    if (output.level) {
        level = this.getLevel(output.level).label;
    } else {
        level = this._level;
    }

    this._outputs.push({ stream: output.stream, level });
}

module.exports = {
    addOutput
};
