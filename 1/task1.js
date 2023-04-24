/**
 * Предлагается сыграть в игру со словами.
 * Нужно отгадать все слова, которые можно составить из заданного набора букв путем их перестановки.
 * Дан набор букв, словарь популярных слов английского языка, минимальная длина слова.
 * Нужно вывести все возможные варианты слов, упорядоченные по длине, если длины совпадают, то по алфавиту.
 *
 * Created by andrey on 16.03.2023
 */

const assert = require("assert");
const fs = require("fs");

let words = fs.readFileSync("en.txt").toString().split("\n");

const solve = (word, minLength) => {
    var alphabetDict = {}
    //Список словарей с различной длиной слова для упрощения вывода и сортировки
    var dictsByLen = [[],[],[],[],[],[],[],[]] 
    
    //Создание заготовки для хранения слов в виде словаря вида "Буква": "Кол-во таких букв в слове"
    for(let a = 97;a <= 122;a++){ 
        let char = String.fromCharCode(a);
        alphabetDict[char] = 0; 
    }

    /*
    Создание словаря для каждого слова в представленном словаре и распределение их по длине.
    Это очевидно неоптимально для данной задачи в рамках одной функции, но эта операция может быть выполнена
    при загрузке/храниться в уже готовом виде
    */
    var wordID = 0;
    for (wordIn of words){ 
        let alphabetDictLocal = {...alphabetDict}
        let wordLetters = wordIn.split("")
        for (letter of wordLetters){
            alphabetDictLocal[letter]++
        }
        alphabetDictLocal["id"] = wordID
        wordID++
        dictsByLen[wordIn.length-2].push(alphabetDictLocal)
    }

    /*
    Аналогично создаем словарь для слова из входного значения
    */
    var wordDict = {...alphabetDict}
    let wordLetters = word.split("")
    for (letter of wordLetters){
        wordDict[letter]++
    }

    /*
    Сравниванием побуквенно слово из входного значения со словами из словаря. 
    За счет того, что словарь изначально был отсортирован по алфавиту, а при обработке в программе были отсортированы по длине
    дополнительная сортировка не требуется
    */
    var goodWords = []
    for(dictsArr of dictsByLen.slice(minLength-2)){
        for(dict of dictsArr){
            var isGoodWord = true;
            for(key of Object.keys(alphabetDict))
            {               
                if(wordDict[key] < dict[key]){
                    isGoodWord = false;
                    break;
                }
            }
            if(isGoodWord){
                goodWords.push(words[dict['id']])
            }
        }
    }

    return goodWords
};

var tests = [{
    word: "neo",
    minLength: 2,
    answer: ["no", "on", "one"]
},
{
    word: "ucrsh",
    minLength: 4,
    answer: ["rush", "such", "crush"]
},
{
    word: "rfyia",
    minLength: 3,
    answer: ["air", "far", "fry", "ray", "airy", "fair", "fairy"]
}, {
    word: "dpuno",
    minLength: 3,
    answer: ["duo", "nod", "pond", "undo", "upon", "pound"]
}, {
    word: "moilcpse",
    minLength: 6,
    answer: ["copies", "impose", "police", "simple", "compile", "complies"]
}];

tests.forEach((test) => {
    assert.deepEqual(solve(test.word, test.minLength), test.answer);
});
