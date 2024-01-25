import { GameScene } from "../core/GameScene";
import { Application } from "pixi.js";
import { FlameParticle } from "../objects/FlameParticle";

export class SceneThree extends GameScene {
    private emitter: FlameParticle;
    constructor(app: Application) {
        super("Particles");
        this.emitter = new FlameParticle();
        this.addChild(this.emitter);
        this.emitter.createEmitters();
        app.renderer.render(app.stage);
    }

    override enableScene(): void {
        super.enableScene();
        this.addChild(this.emitter);
    }

    override disableScene() {
        super.disableScene();
        this.removeChild(this.emitter);
    }
}
