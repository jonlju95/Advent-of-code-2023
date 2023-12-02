'use strict';

import * as fs from 'fs';

const numbersTextMap = new Map<string, string>([
    ['one', '1'],
    ['two', '2'],
    ['three', '3'],
    ['four', '4'],
    ['five', '5'],
    ['six', '6'],
    ['seven', '7'],
    ['eight', '8'],
    ['nine', '9'],
    ['1', '1'],
    ['2', '2'],
    ['3', '3'],
    ['4', '4'],
    ['5', '5'],
    ['6', '6'],
    ['7', '7'],
    ['8', '8'],
    ['9', '9'],

])

const input = fs.readFileSync('resources/input.txt', 'utf-8');
let textRegEx: RegExp = new RegExp('\r?\n|\r|\n');

let sum: number = 0;

function checkLine(str: string): void {
    str.split(textRegEx).forEach((row) => {
        let startNumbers: number[] = [];
        let endNumbers: number[] = [];

        numbersTextMap.forEach((value, key) => {
            startNumbers.push(row.indexOf(key))
            endNumbers.push(row.lastIndexOf(key))
        })

        if (onlyOneNum(endNumbers)) {
            let startingNum = startingNumInArray(startNumbers);
            sumOfAllRows(Number(startingNum?.concat(startingNum)));
        } else {
            let startingNum = startingNumInArray(startNumbers);
            let endingNum = endingNumInArray(endNumbers);
            sumOfAllRows(Number(startingNum?.concat(endingNum !== undefined ? endingNum : "")));
        }
    });

    console.log(sum)

}

function onlyOneNum(arr: number[]): boolean {
    const result: number[] = arr.filter(num => num !== -1)
    return result.length >= 1 ? false : true;
}

function endingNumInArray(arr: number[]): string | undefined {
    let index = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > arr[index]) {
            index = i
        }
    }

    return convertIndexToNum(index);
}

function startingNumInArray(arr: number[]) {
    let index = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[index] == -1) {
            index = i
        }
        if (arr[i] !== -1 && arr[i] < arr[index]) {
            index = i
        }
    }

    return convertIndexToNum(index)
}

function convertIndexToNum(index: number): string | undefined {
    return numbersTextMap.get(Array.from(numbersTextMap.keys())[index])
}

function sumOfAllRows(sumOfDigits: number): void {
    sum += sumOfDigits;
}

checkLine(input);