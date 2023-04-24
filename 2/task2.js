/**
 * Петя играет в игру Сладкие загадки и не может найти следующий ход.
 * Нужно составить программу, которая поможет ему.
 * Правильным ходом считается обмен местами двух рядом стоящих элементов так,
 * что в результате получится 3 или более элементов одного цвета, стоящих рядом по горизонтали или вертикали.
 *
 * Дано N - число строк, M число столбцов, в следующих N строках задано поле.
 * Нужно вывести координаты двух элементов для обмена Y X, если вариантов несколько,
 * то вывести с минимальным Y и X, если ход отсутствует, то -1.
 *
 * Created by andrey on 16.03.2023
 */

const assert = require("assert");

const checkLeft = (fieldArr, i,j) =>{
    if(j >= 2){ //Влево
        if((fieldArr[i][j] === fieldArr[i][j-1] && fieldArr[i][j] === fieldArr[i][j-2])){
            return true;
        }
    }

    if(j > 0 && j < fieldArr[0].length-1){ //Середина горизонталь
        if((fieldArr[i][j] === fieldArr[i][j-1] && fieldArr[i][j] === fieldArr[i][j+1])){
            return true;
        }
    }

    if(i > 0 && i < fieldArr.length-1){ //Середина вертикаль
        if((fieldArr[i][j] === fieldArr[i-1][j] && fieldArr[i][j] === fieldArr[i+1][j])){
            return true;
        }
    }

    if(i > 1){ //Вверх
        if((fieldArr[i][j] === fieldArr[i-1][j] && fieldArr[i][j] === fieldArr[i-2][j])){
            return true;
        }
    }

    if(i < fieldArr.length-2){ //Вниз
        if((fieldArr[i][j] === fieldArr[i+1][j] && fieldArr[i][j] === fieldArr[i+2][j])){
            return true;
        }
    }
    return false;
}
const checkRight =  (fieldArr, i,j) =>{

    if(j > 0 && j < fieldArr[0].length-1){ //Середина горизонталь
        if((fieldArr[i][j] === fieldArr[i][j-1] && fieldArr[i][j] === fieldArr[i][j+1])){
            return true;
        }
    }

    if(i > 0 && i < fieldArr.length-1){ //Середина вертикаль
        if((fieldArr[i][j] === fieldArr[i-1][j] && fieldArr[i][j] === fieldArr[i+1][j])){
            return true;
        }
    }

    if(i > 1){ //Вверх
        if((fieldArr[i][j] === fieldArr[i-1][j] && fieldArr[i][j] === fieldArr[i-2][j])){
            return true;
        }
    }

    if(i < fieldArr.length-2){ //Вниз
        if((fieldArr[i][j] === fieldArr[i+1][j] && fieldArr[i][j] === fieldArr[i+2][j])){
            return true;
        }
    }

    if(j < fieldArr[0].length-2){//Вправо
        if((fieldArr[i][j] === fieldArr[i][j+1] && fieldArr[i][j] === fieldArr[i][j+2])){
            return true;
        }
    }    
    return false;
}
const checkTop =  (fieldArr, i,j) =>{
    if(j >= 2){ //Влево
        if((fieldArr[i][j] === fieldArr[i][j-1] && fieldArr[i][j] === fieldArr[i][j-2])){
            return true;
        }
    }

    if(j > 0 && j < fieldArr[0].length-1){ //Середина горизонталь
        if((fieldArr[i][j] === fieldArr[i][j-1] && fieldArr[i][j] === fieldArr[i][j+1])){
            return true;
        }
    }

    if(i > 0 && i < fieldArr.length-1){ //Середина вертикаль
        if((fieldArr[i][j] === fieldArr[i-1][j] && fieldArr[i][j] === fieldArr[i+1][j])){
            return true;
        }
    }

    if(i > 1){ //Вверх
        if((fieldArr[i][j] === fieldArr[i-1][j] && fieldArr[i][j] === fieldArr[i-2][j])){
            return true;
        }
    }

    if(j < fieldArr[0].length-2){//Вправо
        if((fieldArr[i][j] === fieldArr[i][j+1] && fieldArr[i][j] === fieldArr[i][j+2])){
            return true;
        }
    }  
    return false;  
}
const checkBottom =  (fieldArr, i,j) =>{
    if(j >= 2){ //Влево
        if((fieldArr[i][j] === fieldArr[i][j-1] && fieldArr[i][j] === fieldArr[i][j-2])){
            return true;
        }
    }

    if(j > 0 && j < fieldArr[0].length-1){ //Середина горизонталь
        if((fieldArr[i][j] === fieldArr[i][j-1] && fieldArr[i][j] === fieldArr[i][j+1])){
            return true;
        }
    }

    if(i > 0 && i < fieldArr.length-1){ //Середина вертикаль
        if((fieldArr[i][j] === fieldArr[i-1][j] && fieldArr[i][j] === fieldArr[i+1][j])){
            return true;
        }
    }

    if(i < fieldArr.length-2){ //Вниз
        if((fieldArr[i][j] === fieldArr[i+1][j] && fieldArr[i][j] === fieldArr[i+2][j])){
            return true;
        }
    }

    if(j < fieldArr[0].length-2){//Вправо
        if((fieldArr[i][j] === fieldArr[i][j+1] && fieldArr[i][j] === fieldArr[i][j+2])){
            return true;
        }
    } 
    return false;
}


const solve = (field) => {
    var fieldArr = [];
    for (row of field){
        fieldArr.push(row.split("")); 
    } 

    var virtualSwap = [[-1,-1],[-1,-1]];

    //Общая итерация
    for(let i = 0; i < fieldArr.length; i++){
        for(let j = 0; j < fieldArr[0].length; j++){
            //Проверка при смещении элементов по горизонтали
            if(j < fieldArr[0].length-1){
                virtualSwap = [[i,j],[i, j+1]];

                [fieldArr[i][j], fieldArr[i][j+1]] = [fieldArr[i][j+1],fieldArr[i][j]];

                if(checkLeft(fieldArr, i,j) === true){
                    let answer1 = {
                        row: virtualSwap[0][0],
                        col: virtualSwap[0][1]
                    };
                    let answer2 = {
                        row: virtualSwap[1][0],
                        col: virtualSwap[1][1]
                    };
                    return [answer1, answer2]
                };
                if(checkRight(fieldArr, i,j+1) === true){
                    console.log(virtualSwap+"");
                    let answer1 = {
                        row: virtualSwap[0][0],
                        col: virtualSwap[0][1]
                    };
                    let answer2 = {
                        row: virtualSwap[1][0],
                        col: virtualSwap[1][1]
                    };
                    return [answer1, answer2]
                };
                [fieldArr[i][j], fieldArr[i][j+1]] = [fieldArr[i][j+1],fieldArr[i][j]];
            }
            //Проверка при смещении по элементов вертикали
            if(i < fieldArr.length-1){
                virtualSwap = [[i,j],[i+1, j]];
                [fieldArr[i][j], fieldArr[i+1][j]] = [fieldArr[i+1][j],fieldArr[i][j]];
                if(checkTop(fieldArr, i+1,j) === true){
                    let answer1 = {
                        row: virtualSwap[0][0],
                        col: virtualSwap[0][1]
                    };
                    let answer2 = {
                        row: virtualSwap[1][0],
                        col: virtualSwap[1][1]
                    };
                    return [answer1, answer2]
                };
                if(checkBottom(fieldArr, i,j) === true){
                    let answer1 = {
                        row: virtualSwap[0][0],
                        col: virtualSwap[0][1]
                    };
                    let answer2 = {
                        row: virtualSwap[1][0],
                        col: virtualSwap[1][1]
                    };
                    return [answer1, answer2]
                };
                [fieldArr[i][j], fieldArr[i+1][j]] = [fieldArr[i+1][j],fieldArr[i][j]];
            }
        }  
    }
    return -1

};

var tests = [{
    field: [
    
    "aab",
    "bba"
        
    ],
    answer: [{row: 0, col: 2}, {row: 1, col: 2}]
},
{
    field: [
        "abc",
        "def"
    ],
    answer: -1
},
{
    field: [
        "abcdefab",
        "fedcbafe",
        "abcdefab",
        "fedcbafe",
        "abcdefab",
        "fedcbafe",
        "abcdefab",
        "fedcbafe"
    ],
    answer: [{ row: 1, col: 2 }, { row: 1, col: 3 }]
}, {
    field: [
        "aabbcc",
        "ddeeff",
        "aabbcc",
        "ddeeff"
    ],
    answer: -1
}, {
    field: [
        "aabbcca",
        "ddeeffb",
        "aabbccd",
        "ddecffe"
    ],
    answer: [{ row: 2, col: 3 }, { row: 3, col: 3 }]
}
];

tests.forEach((test) => {
    assert.deepEqual(test.answer, solve(test.field));
});