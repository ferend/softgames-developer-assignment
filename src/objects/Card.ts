import { Sprite, Text, TextStyle, Texture } from "pixi.js";

export class Card extends Sprite {
    constructor(spriteName: string, label: number) {
        super();
        this.texture = Texture.from(spriteName);
        const labelText = new Text(
            label,
            new TextStyle({
                fill: "purple",
                fontSize: 24,
            }),
        );
        labelText.anchor.set(0.5);
        labelText.position.set(this.width / 2, this.height / 2);
        this.addChild(labelText);
    }
}
