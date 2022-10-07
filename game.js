
var bootScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:

        function bootScene() {
            Phaser.Scene.call(this, { key: 'bootScene' });
        },

    preload: function () {
        this.load.image('box', 'pic/box.png');
    },

    create: function () {
        this.scene.run('fruitScene');

    }

});

//сцена, которая отображает выбор компьютера, выводит выбранные им кубы на экран
var computerScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:

        function computerScene() {
            Phaser.Scene.call(this, { key: 'computerScene' }); //ключевое название сцены
        },

    //инициализация элементов сцены, h - расстояние по вертикали до фрукта, w - расстоялние по горизонтали до фрукта
    init: function (data) {
        this.sceneA = this.scene.get('fruitScene');
        this.h = data.h;
        this.w = data.w;
    },

    //загрузка картинок для спрайтов
    preload: function () {
        this.load.image('box', 'pic/box.png');
    },

    //элементы внутри этой функции отрисовываются один раз после загрузки сцены (статические)
    create: function () {

        //меню кубов пользователя (он должен оставаться на экране всегда)
        this.box1 = this.physics.add.sprite(window.innerWidth / 14, window.innerHeight - window.innerHeight / 6, 'box');
        this.box1.setScale(0.3);

        this.box2 = this.physics.add.sprite(window.innerWidth / 14, window.innerHeight - window.innerHeight / 2.5, 'box');
        this.box2.setScale(0.25);

        this.box3 = this.physics.add.sprite(window.innerWidth / 14, window.innerHeight - window.innerHeight / 1.69, 'box');
        this.box3.setScale(0.2);

        this.box4 = this.physics.add.sprite(window.innerWidth / 14, window.innerHeight - window.innerHeight / 1.34, 'box');
        this.box4.setScale(0.15);

        this.box5 = this.physics.add.sprite(window.innerWidth / 14, window.innerHeight - window.innerHeight / 1.14, 'box');
        this.box5.setScale(0.1);


        //пример отрисовки
        this.box = this.physics.add.sprite(750, 390, 'box');
        this.box.setScale(0.2);
    },

    strategy: function () {
        //.... выбор компьютера

        
    },

    update: function () {
        

    }
});


// сцена отрисовки фрукта
var fruitScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:

        function fruitScene() {
            Phaser.Scene.call(this, { key: 'fruitScene' });
        },

    preload: function () {
        this.load.image('banana', 'pic/banana.png');
    },

    create: function () {

        //случайный выбор положения фрукта

        //Пример отрисовки
        this.fruit = this.physics.add.sprite(700, 200, 'banana');
        this.fruit.setScale(0.15);

        //загрузка следующей сцены, при этом текущая продолжает работать
        this.scene.run('userScene', { h: Math.round(this.fruit.y), w: Math.round(this.fruit.x) });
    },

});

// сцена, отрисовывающая действия пользователя
var userScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:

        function userScene() {
            Phaser.Scene.call(this, { key: 'userScene' });
        },

    init: function (hh, ww) {
        //получение данных из сцены fruitScene о положении фрукта
        this.sceneA = this.scene.get('fruitScene');
    },

    create: function () {

        //константы для управления кубами с клавиатуры, ключевые слова из библиотеки Phaser
        const { LEFT, RIGHT, ONE, ENTER, DOWN } = Phaser.Input.Keyboard.KeyCodes;
        this.keys = this.input.keyboard.addKeys({
            left: LEFT,
            right: RIGHT,
            enter: ENTER,
            down: DOWN,
            one: ONE
        });

        this.box1 = this.physics.add.sprite(window.innerWidth / 14, window.innerHeight - window.innerHeight / 6, 'box');
        this.box1.setScale(0.3);
        console.log(this.box1.x, this.box1.y);

        this.box2 = this.physics.add.sprite(window.innerWidth / 14, window.innerHeight - window.innerHeight / 2.5, 'box');
        this.box2.setScale(0.25);

        this.box3 = this.physics.add.sprite(window.innerWidth / 14, window.innerHeight - window.innerHeight / 1.69, 'box');
        this.box3.setScale(0.2);

        this.box4 = this.physics.add.sprite(window.innerWidth / 14, window.innerHeight - window.innerHeight / 1.34, 'box');
        this.box4.setScale(0.15);

        this.box5 = this.physics.add.sprite(window.innerWidth / 14, window.innerHeight - window.innerHeight / 1.14, 'box');
        this.box5.setScale(0.1);

    },
    update: function () {
        //console.log(this.box1.x, this.box1.y);
        //нажатие на цифру, пока только одной из 5, размещение первого куба по центру экрана сверху
        if (this.keys.one.isDown) {
            console.log(this.box1.x, this.box1.y);
            this.box1.x = window.innerWidth / 2;
            this.box1.y = window.innerHeight / 100 * 15;
            
        }
        else if ((this.keys.one.isUp) && (this.box1.x != window.innerWidth / 14) && (this.box1.y != window.innerHeight - window.innerHeight / 6)) {
            // передвижение куба вправо и влево
            if (this.box1.y = window.innerHeight / 100 * 15) {
                if (this.keys.right.isDown) {
                    this.box1.x += 4;
                }
                else if (this.keys.left.isDown) {
                    this.box1.x -= 4;
                };
                if (this.keys.enter.isDown) {
                    //console.log('change');
                    this.scene.sleep('userScene').start('computerScene');
                }
            }

        }
    
    } 
});

/*
var choiceScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:

        function choiceScene() {
            Phaser.Scene.call(this, { key: 'choiceScene' });
        },
    preload: function () {
        this.load.image('box', 'pic/box.png');
    },

    init: function (hh, ww) {

    },

    create: function () {
        
    },

});
*/

//конфигурация игры
var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: window.innerWidth, 
    height: window.innerHeight,
    transparent: true,
    
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    
    scene: [
        bootScene, //загрузочная сцена, которая загружает первую сцену
        fruitScene,
        userScene,
        computerScene,
        //choiceScene
    ]
};
var game = new Phaser.Game(config); //создание игры