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
    this.input.on('pointermove', ({ isDown, x, y, prevPosition }) => {
      if (!isDown) return;
      cam.scrollX -= (x - prevPosition.x) / cam.zoom;
      cam.scrollY -= (y - prevPosition.y) / cam.zoom;
    });


    // Implementation of mouse-wheel zoom
    this.input.on('wheel', (pointer, gameObjects, deltaY, deltaX) => {

        // Scroll direction:
        // deltaY > 0 => zoom OUT
        // deltaY < 0 => zoom IN
        if (deltaX !== 0) {
            cam.zoom -= -1*deltaX * 0.003
        } else {
            cam.zoom -= -1*deltaY * 0.003
        }

        // Limit zoom value
        cam.zoom = Phaser.Math.Clamp(cam.zoom, 0.25, 3);
    });
    }

    
}
