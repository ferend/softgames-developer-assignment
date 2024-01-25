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
        this.scenes = [new SceneOne(), new SceneTwo(), new SceneThree(app)];
        this.currentScene = new Container();
        this.menuContainer = new Container();

        this.createMainMenu();
    }

    private createMainMenu(): void {
        this.scenes.forEach((scene, index) => {
            const button = new Text(`Scene ${index + 1}`, {
                fill: ["#FFD700", "#FFA500"],
                fontSize: 40,
                fontFamily: "PixelRegular",
            });
            button.position.set(gameConfig.width / 2.2, 60 * index + 200);
            button.interactive = true;

            button.on("pointertap", () => {
                this.switchScene(index);
            });

            button.on("touchend", () => {
                this.switchScene(index);
            });

            button.on("mouseover", () => {
                button.style.fill = ["#FFA500", "#FFD700"];
            });

            button.on("mouseout", () => {
                button.style.fill = ["#FFD700", "#FFA500"];
            });

            this.menuContainer.addChild(button);
        });

        this.app.stage.addChild(this.menuContainer);
    }

    private switchScene(sceneIndex: number): void {
        this.currentScene.removeChildren();
        this.currentScene = this.scenes[sceneIndex];
        (this.currentScene as GameScene).enableScene();
        const backButton = new Text("Back to Main Menu", {
            fill: ["#FFD700", "#FFA500"],
            fontFamily: "PixelRegular",
            stroke: "#000000",
            strokeThickness: 4,
        });
        backButton.position.set(this.currentScene.x / 2 - 500, this.currentScene.y / 2);
        backButton.interactive = true;
        // Add color change effect
        backButton.on("mouseover", () => {
            backButton.style.fill = ["#FFA500", "#FFD700"];
        });

        backButton.on("mouseout", () => {
            backButton.style.fill = ["#FFD700", "#FFA500"];
        });

        backButton.on("pointertap", () => {
            (this.currentScene as GameScene).disableScene();
            this.returnToMainMenu();
        });

        backButton.on("touchend", () => {
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
