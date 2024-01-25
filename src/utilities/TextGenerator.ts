import { Sprite, Text, Texture } from "pixi.js";
import { Constants } from "./Constants";

// Utility class for text generation with given parameters.
export default class TextGenerator {
    public intervalId: NodeJS.Timeout | null = null;
    public setupRandomTextWithImages(textField: Text, spriteField: Sprite): void {
        this.intervalId = setInterval(() => {
            const randomEmoji = this.pickRandomEmoji();
            textField.text = randomEmoji;
            spriteField.texture = Texture.from(randomEmoji);
            spriteField.position.set(textField.width - 300, textField.height - 240);
        }, 2000);
    }

    private pickRandomEmoji(): string {
        // Pick a random emoji from the array
        return Constants.spriteNames[Math.floor(Math.random() * Constants.spriteNames.length)];
    }

    public stopInterval(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}
