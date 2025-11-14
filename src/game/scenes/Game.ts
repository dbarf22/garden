import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    preload ()
    {
        this.load.setBaseURL('/assets/')
        this.load.image('map', 'sc.png');
    }

    create ()
    {
        // Initialize camera and add the background
     let cam = this.cameras.main;

     
     this.add.grid(640,360,800,600,32,32,0xff0000,0,0xff0000,1);

     cam.setZoom(2)
     cam.roundPixels = false;

    // Pointer controller camera 
    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (!pointer.isDown) return;
      cam.scrollX -= (pointer.x - pointer.prevPosition.x) / cam.zoom;
      cam.scrollY -= (pointer.y - pointer.prevPosition.y) / cam.zoom;
    });


    // Implementation of mouse-wheel zoom
    this.input.on('wheel', 
        (
            pointer : Phaser.Input.Pointer,
            gameObjects : Phaser.GameObjects.GameObject, 
            deltaX: number, 
            deltaY: number
        ) => {

        // Scroll direction:
        // deltaY > 0 => zoom OUT
        // deltaY < 0 => zoom IN
        
        cam.zoom -= -1*deltaY * 0.003
        
        // Limit zoom value
        cam.zoom = Phaser.Math.Clamp(cam.zoom, 0.25, 3);
    });
    }

    
}
