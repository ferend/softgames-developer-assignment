import { GameScene } from "../core/GameScene";
import TextGenerator from "../utilities/TextGenerator";
import { Sprite, Text } from "pixi.js";

export class SceneTwo extends GameScene {
    private textGenerator: TextGenerator;
    private textField: Text;
    private spriteField: Sprite;

    constructor() {
        super("Text");
        this.textField = new Text("", {
            fontSize: Math.floor(Math.random()) + 40,
            fill: 0xffffff,
            fontFamily: "PixelRegular",
        });
        this.textField.position.x = this.width / 2 - 300;
        this.textField.position.y = this.height / 2;
        this.spriteField = new Sprite();
        this.textGenerator = new TextGenerator();
    }

    override enableScene(): void {
        super.enableScene();
        this.addChild(this.textField, this.spriteField);
        this.textGenerator.setupRandomTextWithImages(this.textField, this.spriteField);
    }

    override disableScene(): void {
        super.disableScene();
        this.textGenerator.stopInterval();
    }
}
