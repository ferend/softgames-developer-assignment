import { Application, Text } from "pixi.js";
import { SceneController } from "./controllers/SceneController";

export default class Game {
    app: Application;
    private sceneController: SceneController;

    private fpsCounter = new Text("FPS: 0", { fill: "0xFFFFFF", fontSize: 20 });
    private timeValues: number[] = [];
    private lastTime: number = 0;

    constructor(app: Application) {
        this.app = app;
        this.sceneController = new SceneController(app);
        app.ticker.add(() => {
            const currentTime = new Date().getTime();
            this.timeValues.push(1000 / (currentTime - this.lastTime));

            if (this.timeValues.length === 30) {
                let total = 0;
                for (let i = 0; i < 30; i++) {
                    total += this.timeValues[i];
                }

                this.fpsCounter.text = "FPS: " + (total / 30).toFixed(2);

                this.timeValues.length = 0;
            }

            this.lastTime = currentTime;
        });

        this.fpsCounter.position.set(10, 10);

        app.stage.addChild(this.fpsCounter);
    }
}
