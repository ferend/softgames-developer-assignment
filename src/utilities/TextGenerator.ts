import { Sprite, Text, Texture } from "pixi.js";

export default class TextGenerator {
    private emojis: string[] = ["LinkedIn", "Pinterest", "Twitter", "WhatsApp", "YouTube"];
    public intervalId: NodeJS.Timeout | null = null;
    public setupRandomTextWithImages(textField: Text, spriteField: Sprite): void {
        this.intervalId = setInterval(() => {
            const randomEmoji = this.pickRandomEmoji();
            textField.text = randomEmoji;
            spriteField.texture = Texture.from(randomEmoji);
            spriteField.position.set(textField.width - 150, textField.height - 240);
        }, 2000);
    }

    private pickRandomEmoji(): string {
        // Pick a random emoji from the array
        return this.emojis[Math.floor(Math.random() * this.emojis.length)];
    }

    public stopInterval(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}
