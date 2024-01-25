import { Application, Container, Text } from "pixi.js";
import { SceneOne } from "../scenes/SceneOne";
import { SceneTwo } from "../scenes/SceneTwo";
import { SceneThree } from "../scenes/SceneThree";
import { gameConfig } from "../gameConfig";
import { GameScene } from "../core/GameScene";

export class SceneController {
    private scenes: Container[];
    private currentScene: Container;
    private app: Application;
    private menuContainer: Container;

    constructor(app: Application) {
        this.app = app;
        this.scenes = [new SceneOne(), new SceneTwo(), new SceneThree()];
        this.currentScene = new Container();
        this.menuContainer = new Container();

        this.createMainMenu();
    }

    private createMainMenu(): void {
        this.scenes.forEach((scene, index) => {
            const button = new Text(`Scene ${index + 1}`, { fill: 0xffffff });
            button.position.set(gameConfig.width / 2.2, 60 * index + 200);
            button.interactive = true;

            button.on("click", () => {
                this.switchScene(index);
            });

            this.menuContainer.addChild(button);
        });

        this.app.stage.addChild(this.menuContainer);
    }

    private switchScene(sceneIndex: number): void {
        this.currentScene.removeChildren();
        this.currentScene = this.scenes[sceneIndex];
        (this.currentScene as GameScene).enableScene();
        const backButton = new Text("Back to Main Menu", { fill: 0xffffff });
        backButton.position.set(gameConfig.width / 2 - 300, gameConfig.height / 2 + 200);
        backButton.interactive = true;
        backButton.on("click", () => {
            (this.currentScene as GameScene).disableScene();
            this.returnToMainMenu();
        });
        this.currentScene.addChild(backButton);
        this.app.stage.addChild(this.currentScene);
        this.app.stage.removeChild(this.menuContainer);
    }

    private returnToMainMenu(): void {
        this.app.stage.removeChild(this.currentScene);
        // Restart the process on that scene
        this.currentScene = new Container();
        this.app.stage.addChild(this.menuContainer);
    }
}
