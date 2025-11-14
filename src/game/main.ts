import { Game as MainGame } from './scenes/Game';
import { AUTO, Game, type Types } from 'phaser';

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Types.Core.GameConfig = {
    type: AUTO,
    width: 1280,
    height: 720,

    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        min: {
          width: 800,
          height: 600  
        },

        max: {
            width:1920,
            height:1080
        },
    },

    parent: 'game-container',
    backgroundColor: '#252525ff',
    scene: [
        MainGame
    ]
};

const StartGame = (parent: string) => {
    return new Game({ ...config, parent });
}

export default StartGame;
