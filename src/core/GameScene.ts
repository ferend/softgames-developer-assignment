import { Container, Text } from "pixi.js";
import { gameConfig } from "../gameConfig";

// Base class that every Scene classes implement. It defines rules. Every Scene represents the task in assignment.
export class GameScene extends Container {
    constructor(sceneName: string) {
        super();
        // Since every scene has a name:
        const text = new Text(sceneName, {
            fill: 0xffffff,
            fontSize: 40,
            fontFamily: "PixelRegular",
            stroke: "#000000",
            strokeThickness: 4,
        });
        this.position.x = gameConfig.width / 2;
        this.position.y = gameConfig.height / 2;
        text.position.set(this.position.x / 2 - 120, this.position.y - 480);
        text.anchor.set(1, 0);
        text.interactive = true;
        this.sortableChildren = true;
        this.addChild(text);
    }
    public enableScene(): void {
        console.log("Enable Scene");
    }

    public disableScene(): void {
        console.log("Disable Scene");
    }
}
