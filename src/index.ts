// @ts-ignore

import "./style.css";
import { Application } from "pixi.js";
import { gameConfig } from "./gameConfig";
import Game from "./Game";

declare const VERSION: string;
console.log(`Welcome Pixi version:  ${VERSION}`);

const app = new Application(gameConfig);

window.onload = async (): Promise<void> => {
    await loadGameAssets();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    document.body.appendChild(app.view);

    app.stage.interactive = true;

    window.addEventListener("orientationchange", () => {
        resizeCanvas();
    });

    window.addEventListener("resize", () => {
        resizeCanvas();
    });

    resizeCanvas();

    new Game(app);
};

async function loadGameAssets(): Promise<void> {}

function resizeCanvas(): void {
    const resize = () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        app.stage.scale.x = window.innerWidth / gameConfig.width;
        app.stage.scale.y = window.innerHeight / gameConfig.height;
    };

    resize();
}
