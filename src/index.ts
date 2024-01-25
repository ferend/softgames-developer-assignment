// @ts-ignore

import "./style.css";
import { Application, Assets, Text } from "pixi.js";
import { gameConfig } from "./gameConfig";
import Game from "./Game";

declare const VERSION: string;
console.log(`Welcome Pixi version:  ${VERSION}`);

const app = new Application(gameConfig);

const fullScreenButton = new Text("Full Screen", { fill: "0xFFFFFF", fontSize: 20 });
fullScreenButton.position.set(10, 40);
fullScreenButton.interactive = true;
fullScreenButton.on("pointerdown", toggleFullScreen);
app.stage.addChild(fullScreenButton);

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

async function loadGameAssets(): Promise<void> {
    const manifest = {
        bundles: [
            {
                name: "card",
                assets: [
                    {
                        name: "card",
                        srcs: "./assets/simpleCard.png",
                    },
                ],
            },
            {
                name: "particle",
                assets: [
                    {
                        name: "particle",
                        srcs: "./assets/particle.png",
                    },
                ],
            },
            {
                name: "fire",
                assets: [
                    {
                        name: "fire",
                        srcs: "./assets/fire.png",
                    },
                ],
            },
            {
                name: "social",
                assets: [
                    {
                        name: "LinkedIn",
                        srcs: "./assets/linkedin.png",
                    },
                    {
                        name: "Pinterest",
                        srcs: "./assets/pinterest.png",
                    },
                    {
                        name: "Twitter",
                        srcs: "./assets/twitter.png",
                    },
                    {
                        name: "WhatsApp",
                        srcs: "./assets/wp.png",
                    },
                    {
                        name: "YouTube",
                        srcs: "./assets/yt.png",
                    },
                ],
            },
        ],
    };

    await Assets.init({ manifest });
    await Assets.loadBundle(["card", "particle", "fire", "social"]);
}

function resizeCanvas(): void {
    const resize = () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        app.stage.scale.x = window.innerWidth / gameConfig.width;
        app.stage.scale.y = window.innerHeight / gameConfig.height;
    };

    resize();
}
