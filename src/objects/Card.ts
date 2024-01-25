import { Sprite, Text, TextStyle, Texture } from "pixi.js";

// Card object class for first task
export class Card extends Sprite {
    constructor(spriteName: string, label: number) {
        super();
        this.texture = Texture.from(spriteName);
        const labelText = new Text(
            label,
            new TextStyle({
                fill: "purple",
                fontFamily: "PixelRegular",
                fontSize: 24,
            }),
        );
        labelText.anchor.set(0.5);
        labelText.position.set(this.width / 2, this.height / 2);
        this.addChild(labelText);
    }
}
