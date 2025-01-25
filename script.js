var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');


var mouse =
{
    x: undefined,
    y: undefined
}
var maxRad = 50;
var colorArray = [
    'blue',
    'pink',
    'green',
    'red'
]



window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;

    }
)
window.addEventListener('resize',
    function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
)
function Circle(x, y, dx, dy, rad) {

    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.rad = rad;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.draw = function () {
        c.beginPath();
        c.fillStyle = this.color;
        c.arc(this.x, this.y, this.rad, 0, Math.PI * 2, false);
        c.fill();

    }
    this.update = function () {
        if (this.x + this.rad > innerWidth || this.x - this.rad < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.rad > innerHeight || this.y - this.rad < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        //interactivaty
        if (mouse.x - this.x < 100 && mouse.x - this.x > -100 &&
            mouse.y - this.y < 100 && mouse.y - this.y > -100
        ) {
            if (this.rad < maxRad) {
                this.rad += 1;
            }

        }

        else if (this.rad > 2) {
            this.rad -= 1
        }


        this.draw();

    }

}
var circleArray = [];
for (var i = 0; i < 900; i++) {
    var x = Math.random() * (innerWidth - rad * 2) + rad;
    var y = Math.random() * (innerHeight - rad * 2) + rad;
    var dx = Math.random() - 0.5 * 1;
    var dy = Math.random() - 0.5 * 1;
    var rad = Math.random() * 3 + 1;
    circleArray.push(new Circle(x, y, dx, dy, rad));
}


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}
animate();
