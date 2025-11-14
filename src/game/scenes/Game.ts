import { Scene } from "phaser";
import { EventBus } from "../EventBus";

function tileFactory(
    sprite: Phaser.GameObjects.Sprite,
    row: number,
    column: number,
    id: number
) {
    return {
        sprite,
        hasFlower: false,
        row,
        column,
        id,
    };
}

enum TileType {
    grass = "grass",
    water = "water",
    dirt = "dirt",
    flower = "flower"
}

export class Game extends Scene {
    constructor() {
        super("Game");
    }

    preload() {
        this.load.setBaseURL("/assets/");
        this.load.image("grass", "grass.png");
    }

    create() {
        // Initialize camera and add the background
        let cam = this.cameras.main;

        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;

        cam.setZoom(.70);
        cam.centerOn(0, 0);
        cam.roundPixels = false;

        // reset camera view when window is resized
        this.scale.on('resize', () => {
            cam.centerOn(0,0);
        });

        // ground array construction
        type Tile = ReturnType<typeof tileFactory>;
        const groundArray: Tile[][] = [];

        const ROWS = 10;
        const COLUMNS = 18;

        const SPRITE_WIDTH = 80;
        const SPRITE_HEIGHT = 80;

        const gridWidth = SPRITE_WIDTH * COLUMNS;
        const gridHeight = SPRITE_HEIGHT * ROWS;

        let topLeftX = -gridWidth /2
        let topLeftY = -gridHeight / 2;

        // Building the grass and the sprites
        let id = 0;
        for (let i = 0; i < COLUMNS; i++) {
            groundArray[i] = [];
            for (let j = 0; j < ROWS; j++) {
                // we calculate the x and y for the sprite
                
                let spriteX = SPRITE_WIDTH / 2 + topLeftX + i * SPRITE_WIDTH;
                let spriteY = SPRITE_HEIGHT / 2 + topLeftY + j * SPRITE_HEIGHT;

                let sprite = this.add.sprite(spriteX, spriteY, "grass");
                sprite.setInteractive();
                sprite.on('pointerdown', () => {
                    sprite.setAlpha(0);
                });

                groundArray[i][j] = tileFactory(sprite, i, j, id);
                id++;
            }
        }
    }
}
