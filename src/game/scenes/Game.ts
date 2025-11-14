import { Scene } from "phaser";
import { EventBus } from "../EventBus";

function grassFactory(
    grassSprite: Phaser.GameObjects.Sprite,
    row: number,
    column: number,
    id: number
) {
    return {
        grassSprite,
        flowerSprite: null,
        hasFlower: false,
        row,
        column,
        id,
    };
}

export class Game extends Scene {
    constructor() {
        super("Game");
    }

    preload() {
        this.load.setBaseURL("/assets/");
        this.load.image("map", "sc.png");
        this.load.image("grass", "grass.png");
    }

    create() {
        // Initialize camera and add the background
        let cam = this.cameras.main;

        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;

        cam.setZoom(1);
        cam.centerOn(0, 0);
        cam.roundPixels = false;

        // reset camera view when window is resized
        this.scale.on('resize', () => {
            cam.centerOn(0,0);
        });


        // Pointer controller camera
        this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
            if (!pointer.isDown) return;
            cam.scrollX -= (pointer.x - pointer.prevPosition.x) / cam.zoom;
            cam.scrollY -= (pointer.y - pointer.prevPosition.y) / cam.zoom;
        });

        // Implementation of mouse-wheel zoom
        this.input.on(
            "wheel",
            (
                pointer: Phaser.Input.Pointer,
                gameObjects: Phaser.GameObjects.GameObject,
                deltaX: number,
                deltaY: number
            ) => {
                // Scroll direction:
                // deltaY > 0 => zoom OUT
                // deltaY < 0 => zoom IN
                
                cam.zoom -= -1 * deltaY * 0.003;

                // Limit zoom value
                cam.zoom = Phaser.Math.Clamp(cam.zoom, 0.25, 3);
            }
        );


        // Grass array construction
        type Tile = ReturnType<typeof grassFactory>;
        const grassArray: Tile[][] = [];

        const ROWS = 10;
        const COLUMNS = 10;

        const SPRITE_WIDTH = 80;
        const SPRITE_HEIGHT = 80;

        const gridWidth = SPRITE_WIDTH * COLUMNS;
        const gridHeight = SPRITE_HEIGHT * ROWS;

        let topLeftX = -gridWidth /2
        let topLeftY = -gridHeight / 2;

        // Building the grass and the sprites
        let id = 0;
        for (let i = 0; i < COLUMNS; i++) {
            grassArray[i] = [];
            for (let j = 0; j < ROWS; j++) {
                // we calculate the x and y for the sprite
                
                let spriteX = SPRITE_WIDTH / 2 + topLeftX + i * SPRITE_WIDTH;
                let spriteY = SPRITE_HEIGHT / 2 + topLeftY + j * SPRITE_HEIGHT;

                let sprite = this.add.sprite(spriteX, spriteY, "grass");
                sprite.setInteractive();
                sprite.on('pointerdown', () => {
                    sprite.setAlpha(0);
                });

                grassArray[i][j] = grassFactory(sprite, i, j, id);
                id++;
            }
        }
    }
}
