import { GameScene } from "../core/GameScene";
import { Card } from "../objects/Card";
import { Constants } from "../utilities/Constants";
import { Graphics } from "pixi.js";

export class SceneOne extends GameScene {
    private cardStack1: Card[] = [];
    private cardStack2: Card[] = [];
    private interval: NodeJS.Timeout | null = null;
    private destinationMarker: Graphics;

    constructor() {
        super("Cards");
        this.destinationMarker = new Graphics();
        this.addChild(this.destinationMarker);
    }

    override enableScene(): void {
        super.enableScene();
        this.clearStacks();

        this.cardStack1 = this.createCardStack(144);
        this.cardStack2 = this.createCardStack(0);
        this.moveCards();
    }

    override disableScene(): void {
        super.disableScene();
        if (this.interval !== null) {
            clearInterval(this.interval);
        }
        this.clearStacks();
    }

    private clearStacks() {
        this.cardStack1.forEach((card) => this.removeChild(card));
        this.cardStack2.forEach((card) => this.removeChild(card));

        this.cardStack1 = [];
        this.cardStack2 = [];
    }

    private createCardStack(count: number): Card[] {
        const stack: Card[] = [];
        for (let i = 1; i <= count; i++) {
            const card = new Card("card", i);
            card.x = this.position.x - 650 + i;
            card.y = i - 150;
            card.zIndex = i;
            stack.push(card);
            this.addChild(card);
        }
        return stack;
    }

    private moveCards(): void {
        console.log("Moving cards...");
        const interval = setInterval(() => {
            if (this.cardStack1.length > 0) {
                const movingCard = this.cardStack1.pop()!;
                this.animateCardMovement(movingCard, this.cardStack2, Constants.cardAnimSpeed, () => {
                    if (this.cardStack1.length === 0) {
                        clearInterval(interval);
                        this.cardStack1 = this.cardStack2.reverse();
                        this.cardStack2 = [];
                    }
                });
            }
        }, Constants.cardIntervalDuration);
        this.interval = interval;
    }

    private animateCardMovement(card: Card, destinationStack: Card[], duration: number, onComplete: () => void): void {
        destinationStack.push(card);

        const startPosition = { x: card.x, y: card.y };
        const endPosition = { x: this.position.x - 200, y: this.position.y - 450 };

        if (this.destinationMarker) {
            this.destinationMarker.clear();
        }

        this.destinationMarker.lineStyle(2, 0x800080);
        this.destinationMarker.drawRect(endPosition.x - 20, endPosition.y - 30, 130, 200);

        const startTime = Date.now();
        const animate = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            card.x = startPosition.x + (endPosition.x - startPosition.x) * progress;
            card.y = startPosition.y + (endPosition.y - startPosition.y) * progress;
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                card.zIndex = destinationStack.length;
                onComplete();
            }
        };

        animate();
    }
}
