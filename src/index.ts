// @ts-ignore

import "./style.css";
import { Application, Text } from "pixi.js";
import { gameConfig } from "./gameConfig";
import Game from "./Game";

declare const VERSION: string;
console.log(`Welcome Pixi version:  ${VERSION}`);

const app = new Application(gameConfig);

const fpsCounter = new Text("FPS: 0", { fill: "0xFFFFFF", fontSize: 20 });
const timeValues: number[] = [];
let lastTime: number = 0;

const fullScreenButton = new Text("Full Screen", { fill: "0xFFFFFF", fontSize: 20 });
fullScreenButton.position.set(10, 40);
fullScreenButton.interactive = true;
fullScreenButton.on("pointerdown", toggleFullScreen);
app.stage.addChild(fullScreenButton);

fpsCounter.position.set(10, 10);

app.stage.addChild(fpsCounter);

app.ticker.add(() => {
    const currentTime = new Date().getTime();
    timeValues.push(1000 / (currentTime - lastTime));

    if (timeValues.length === 30) {
        let total = 0;
        for (let i = 0; i < 30; i++) {
            total += timeValues[i];
        }

        fpsCounter.text = (total / 30).toFixed(2);

        timeValues.length = 0;
    }

    lastTime = currentTime;
});

function toggleFullScreen(): void {
    window.addEventListener("resize", () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    });
}

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
