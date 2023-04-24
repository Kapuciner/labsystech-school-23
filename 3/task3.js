/**
 * При разработке игры Короли и дамы программисты столкнулись с задачей определения пересечения двух карт.
 * Ширина карты 110 пикселей, высота 160 пикселей.
 * Даны координаты центра карт и угол поворота в градусах, требуется определить пересекаются ли две карты.
 * В случае пересечения вывести yes, иначе no.
 *
 * Created by andrey on 17.03.2023
 */

const assert = require("assert");
const degrees_to_radians = deg => (deg * Math.PI) / 180.0;
class Rectangle{ //Класс для инициализации и первичной обработке прямоугольников
    constructor(x, y, angle){
        this.center = [x,y];   
        //Векторы от центра карты к ее углам
        this.v1 = [55,80];
        this.v2 = [55,-80];
        this.v3 = [-55,-80];
        this.v4 = [-55,80];

        this.vectors = [this.v1,this.v2,this.v3,this.v4];
        this.angle = angle;
        this.radAngle = degrees_to_radians(angle);
        //Поворачивам векторы на заданный угол
        for (this.vector of this.vectors){
            let tempX = this.vector[0] * Math.cos(this.radAngle) - this.vector[1] * Math.sin(this.radAngle);
            let tempY = this.vector[0] * Math.sin(this.radAngle) + this.vector[1] * Math.cos(this.radAngle);
            this.vector[0] = tempX;
            this.vector[1] = tempY;    
        }
    }
    //Получаем список вершин
    getVertices(){
        let vertices = [];
        for (this.vector of this.vectors){
            vertices.push([this.center[0] + this.vector[0], this.center[1] + this.vector[1]]);
        }
        return vertices;
    }
    //Проверка на пересечение. Производится проверка на пересечение диагоналями одного прямоугольника сторон другого.
    //Затем производится обратная проверка. 
    intersectRect(otherRect) {
        this.vertices = this.getVertices();
        let otherVetrices = otherRect.getVertices();
        for(let i = 0; i < 4; i++){
            if(this.intersect(
                this.vertices[0][0], this.vertices[0][1],
                this.vertices[2][0], this.vertices[2][1],
                otherVetrices[i][0], otherVetrices[i][1],
                otherVetrices[(i+1)%4][0], otherVetrices[(i+1)%4][1]
            )) return true;
        }
        for(let i = 0; i < 4; i++){
            if(this.intersect(
                this.vertices[1][0], this.vertices[1][1],
                this.vertices[3][0], this.vertices[3][1],
                otherVetrices[i][0], otherVetrices[i][1],
                otherVetrices[(i+1)%4][0], otherVetrices[(i+1)%4][1]
            )) return true;
        }
        return false;
      };

    intersect(x1, y1, x2, y2, x3, y3, x4, y4) {

          if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
              return false;
          }
      
          let denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))
      
          if (denominator === 0) {
              return false;
          }
      
          let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
          let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

          if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
              return false;
          }
      
          let x = x1 + ua * (x2 - x1)
          let y = y1 + ua * (y2 - y1)
      
          return true;
      };
}

const solve = (card1, card2) => {
    card1Rect = new Rectangle(card1["x"], card1["y"], card1["rotation"]);
    card2Rect = new Rectangle(card2["x"], card2["y"], card2["rotation"]);

    if(card1Rect.intersectRect(card2Rect) === true) return "yes";
    if(card2Rect.intersectRect(card1Rect) === true) return "yes";
    return "no";
};

var tests = [{
    card1: { x: 0, y: 0, rotation: 0 },
    card2: { x: 500, y: 0, rotation: 0 },
    answer: "no"
},
{
    card1: { x: 0, y: 0, rotation: 90 },
    card2: { x: 100, y: 0, rotation: 0 },
    answer: "yes"
},
{
    card1: { x: -88, y: 40, rotation: 0 },
    card2: { x: 16, y: -8, rotation: 0 },
    answer: "yes"
},
{
    card1: { x: 48, y: 104, rotation: 65 },
    card2: { x: -88, y: 40, rotation: -25 },
    answer: "no"
},
{
    card1: { x: -200, y: 88, rotation: -30 },
    card2: { x: -80, y: 16, rotation: -30 },
    answer: "yes"
}
];

tests.forEach((test) => {
    console.log(test['card1'])
    assert.equal(test.answer, solve(test.card1, test.card2));
});