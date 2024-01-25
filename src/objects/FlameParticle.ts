import { Emitter } from "@pixi/particle-emitter";
import { ParticleContainer, Texture } from "pixi.js";

export class FlameParticle extends ParticleContainer {
    constructor() {
        super();
    }

    public createEmitters(): void {
        const emitter1 = new Emitter(this, this.emitterConfig);
        const emitter2 = new Emitter(this, this.emitterConfig2);

        let elapsed = Date.now();

        const update = function () {
            requestAnimationFrame(update);

            const now = Date.now();

            emitter2.update((now - elapsed) * 0.001);
            emitter1.update((now - elapsed) * 0.001);

            elapsed = now;
        };

        update();
    }

    private emitterConfig = {
        lifetime: {
            min: 0.4,
            max: 0.7,
        },
        frequency: 0.001,
        emitterLifetime: 0,
        maxParticles: 1000,
        addAtBack: false,
        pos: {
            x: 0,
            y: 120,
        },
        behaviors: [
            {
                type: "alpha",
                config: {
                    alpha: {
                        list: [
                            {
                                value: 0.62,
                                time: 0,
                            },
                            {
                                value: 0,
                                time: 0.6,
                            },
                            {
                                value: 0,
                                time: 0.7,
                            },
                            {
                                value: 0.8,
                                time: 0.71,
                            },
                            {
                                value: 0,
                                time: 1,
                            },
                        ],
                        isStepped: false,
                    },
                },
            },
            {
                type: "moveSpeed",
                config: {
                    speed: {
                        list: [
                            {
                                value: 450,
                                time: 0,
                            },
                            {
                                value: 450,
                                time: 0.7,
                            },
                            {
                                value: 450,
                                time: 1,
                            },
                        ],
                        isStepped: true,
                    },
                    minMult: 1,
                },
            },
            {
                type: "scale",
                config: {
                    scale: {
                        list: [
                            {
                                value: 0.35,
                                time: 0,
                            },
                            {
                                value: 0.65,
                                time: 1,
                            },
                        ],
                        isStepped: false,
                    },
                    minMult: 2,
                },
            },
            {
                type: "color",
                config: {
                    color: {
                        list: [
                            {
                                value: "fff191",
                                time: 0,
                            },
                            {
                                value: "ff622c",
                                time: 0.6,
                            },
                            {
                                value: "111111",
                                time: 0.7,
                            },
                            {
                                value: "333333",
                                time: 1,
                            },
                        ],
                        isStepped: false,
                    },
                },
            },
            {
                type: "rotation",
                config: {
                    accel: 0,
                    minSpeed: 50,
                    maxSpeed: 50,
                    minStart: 265,
                    maxStart: 275,
                },
            },
            {
                type: "textureRandom",
                config: {
                    textures: [Texture.from("fire")],
                },
            },
            {
                type: "spawnShape",
                config: {
                    type: "torus",
                    data: {
                        x: 0,
                        y: 0,
                        radius: 10,
                        innerRadius: 0,
                        affectRotation: false,
                    },
                },
            },
        ],
    };

    private emitterConfig2 = {
        lifetime: {
            min: 0.5,
            max: 0.5,
        },
        frequency: 0.008,
        emitterLifetime: 0,
        maxParticles: 1000,
        addAtBack: false,
        pos: {
            x: 0,
            y: 100,
        },
        behaviors: [
            {
                type: "alpha",
                config: {
                    alpha: {
                        list: [
                            {
                                time: 0,
                                value: 0.6,
                            },
                            {
                                time: 1,
                                value: 0.1,
                            },
                        ],
                    },
                },
            },
            {
                type: "moveSpeed",
                config: {
                    speed: {
                        list: [
                            {
                                time: 0,
                                value: 200,
                            },
                            {
                                time: 1,
                                value: 100,
                            },
                        ],
                    },
                },
            },
            {
                type: "scale",
                config: {
                    scale: {
                        list: [
                            {
                                time: 0,
                                value: 1,
                            },
                            {
                                time: 1,
                                value: 0.3,
                            },
                        ],
                    },
                    minMult: 1,
                },
            },
            {
                type: "color",
                config: {
                    color: {
                        list: [
                            {
                                time: 0,
                                value: "fb1010",
                            },
                            {
                                time: 1,
                                value: "f5b830",
                            },
                        ],
                    },
                },
            },
            {
                type: "textureRandom",
                config: {
                    textures: [Texture.from("particle")],
                },
            },
            {
                type: "spawnShape",
                config: {
                    type: "torus",
                    data: {
                        x: 0,
                        y: 0,
                        radius: 30,
                        innerRadius: -20,
                        affectRotation: true,
                    },
                },
            },
        ],
    };
}
