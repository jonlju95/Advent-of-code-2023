'use strict';

import * as fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf-8');
let textRegEx: RegExp = new RegExp('\r?\n|\r|\n');

function checkLine(str: string): void {
    let sumOfAllRows: number = 0;

    str.split(textRegEx).forEach((row, index) => {
        sumOfAllRows += sumOfDigits(row.replace(/[^0-9]/g, ''))
    });

    console.log(sumOfAllRows);
}

function sumOfDigits(digitStr: string): number {
    let sumOfDigits: number = 0;

    if (digitStr.length === 1) {
        sumOfDigits = Number(digitStr.concat(digitStr));
    } else {
        sumOfDigits = Number(digitStr.charAt(0) + digitStr.charAt(digitStr.length - 1));
    }

    return sumOfDigits;
}

checkLine(input);