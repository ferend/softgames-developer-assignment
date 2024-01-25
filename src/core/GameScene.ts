import { Container, Text } from "pixi.js";
import { gameConfig } from "../gameConfig";

export class GameScene extends Container {
    constructor(sceneName: string) {
        super();
        const text = new Text(sceneName, { fill: 0xffffff });
        text.position.set(gameConfig.width / 2.4, gameConfig.height / 2 - 250);
        text.interactive = true;
        this.sortableChildren = true;
        this.addChild(text);
    }
    public enableScene(): void {
        console.log("Entrypoint. Enable Scene");
    }

    public disableScene(): void {
        console.log("Entrypoint. Enable Scene");
    }
}
