import { Application } from "pixi.js";
import { SceneController } from "./controllers/SceneController";

export default class Game {
    app: Application;
    private sceneController: SceneController;

    constructor(app: Application) {
        this.app = app;
        this.sceneController = new SceneController(app);
    }
}
