import { GameScene } from "../core/GameScene";
import { Application } from "pixi.js";
import { FlameParticle } from "../objects/FlameParticle";

export class SceneThree extends GameScene {
    private app: Application;

    constructor(app: Application) {
        super("Particles");
        this.app = app;
        const emitter = new FlameParticle();
        this.addChild(emitter);
        emitter.createEmitters();
        app.renderer.render(app.stage);
    }
}
