import { Application, ICanvas, Sprite, Text, Texture } from "pixi.js";
import { SceneController } from "./controllers/SceneController";
import { gameConfig } from "./gameConfig";

// Entry point of project. Creates scene controller, adds title, FPS counter etc.
export default class Game {
    app: Application;
    private sceneController: SceneController;

    private fpsCounter = new Text("FPS: 0", { fill: "0xFFFFFF", fontSize: 20 });

    constructor(app: Application) {
        this.app = app;
        const background = this.createBackground(app);
        app.stage.addChild(background);
        this.createHeader(app);

        this.sceneController = new SceneController(app);
        app.ticker.add(() => {
            this.fpsCounter.text = `FPS: ${Math.round(app.ticker.FPS)}`;
        });

        this.fpsCounter.position.set(10, 10);

        app.stage.addChild(this.fpsCounter);
    }

    private createHeader(app: Application<ICanvas>) {
        const headerText = new Text("Welcome To My Assignment", {
            fill: ["#FFD700", "#FFA500"],
            fontSize: 40,
            fontFamily: "PixelRegular",
            stroke: "#000000",
            strokeThickness: 4,
        });

        headerText.position.set(gameConfig.width / 2 - 220, gameConfig.height / 2 - 240);
        app.stage.addChild(headerText);
    }

    private createBackground(app: Application<ICanvas>) {
        const backgroundTexture = Texture.from("bg");
        const background = new Sprite(backgroundTexture);
        background.width = app.screen.width;
        background.height = app.screen.height;
        return background;
    }
}
