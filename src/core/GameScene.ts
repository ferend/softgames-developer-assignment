import { Container, Text } from "pixi.js";
import { gameConfig } from "../gameConfig";

export class GameScene extends Container {
    constructor(sceneName: string) {
        super();
        const text = new Text(sceneName, { fill: 0xffffff });
        this.position.x = gameConfig.width / 2;
        this.position.y = gameConfig.height / 2;
        text.position.set(this.position.x / 2 - 250, this.position.y - 500);
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
