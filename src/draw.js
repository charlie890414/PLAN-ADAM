import * as THREE from 'three';
import * as Alea from 'alea';
import 'sylvester';

export default class Application {
    constructor(param, controls = false) {
        const { resolution, width, height } = param;
        this.width = width;
        this.height = height;
        this.controls = new Controls(this);
        if (controls) {
            for (const item in controls) {
                this.controls[item] = controls[item];
            }
        }
        this.planetTexture = null;
        this.planetRenderer = new PlanetRenderer();

        this.construct();
        this.update();

    }
    //#region Static
    static rgba(r, g, b, a) {
        r = Math.floor(r * 255);
        g = Math.floor(g * 255);
        b = Math.floor(b * 255);
        return "rgba(" + r + "," + g + "," + b + "," + a + ")";
    }

    static randomRGB() {
        return "#" + Math.round(Math.random() * 0xffffff).toString(16)
    }

    static randomSeed() {
        return btoa(Math.floor(Math.random() * 9999999999999)).replace("=", "").replace("=", "");
    }

    static datColor(color) {
        let s = color.replace("#", "");
        return {
            r: parseInt(s.slice(0, 2), 16) / 255,
            g: parseInt(s.slice(2, 4), 16) / 255,
            b: parseInt(s.slice(4, 6), 16) / 255
        }
    }

    static sphereMap(u, v) {
        /*  Returns the 3D cartesian coordinate of a point on
            a sphere that corresponds to the given u,v coordinate. */
        let azimuth = 2 * Math.PI * u;
        let inclination = Math.PI * v;
        let x = Math.sin(inclination) * Math.cos(azimuth);
        let y = Math.sin(inclination) * Math.sin(azimuth);
        let z = Math.cos(inclination);
        return {
            x: x,
            y: y,
            z: z
        };
    }

    static normalRGBA(x, y, z) {
        return {
            r: x / 2 + 0.5,
            g: y / 2 + 0.5,
            b: z / 2 + 0.5
        }
    }

    static smootherstep(t) {
        return 6 * Math.pow(t, 5) - 15 * Math.pow(t, 4) + 10 * Math.pow(t, 3);
    };
    //#endregion
    construct() {
        Math.random = Alea(this.controls.seed);
        let surfaceNoise = new Noise({
            iScale: this.controls.surfaceiScale,
            iOctaves: this.controls.surfaceiOctaves,
            iFalloff: this.controls.surfaceiFalloff,
            iIntensity: this.controls.surfaceiIntensity,
            iRidginess: this.controls.surfaceiRidginess,
            sScale: this.controls.surfacesScale,
            sOctaves: this.controls.surfacesOctaves,
            sFalloff: this.controls.surfacesFalloff,
            sIntensity: this.controls.surfacesIntensity,
        });
        let landNoise = new Noise({
            iScale: this.controls.landiScale,
            iOctaves: this.controls.landiOctaves,
            iFalloff: this.controls.landiFalloff,
            iIntensity: this.controls.landiIntensity,
            iRidginess: this.controls.landiRidginess,
            sScale: this.controls.landsScale,
            sOctaves: this.controls.landsOctaves,
            sFalloff: this.controls.landsFalloff,
            sIntensity: this.controls.landsIntensity,
        });
        let cloudNoise = new Noise({
            iScale: this.controls.cloudiScale,
            iOctaves: this.controls.cloudiOctaves,
            iFalloff: this.controls.cloudiFalloff,
            iIntensity: this.controls.cloudiIntensity,
            iRidginess: this.controls.cloudiRidginess,
            sScale: this.controls.cloudsScale,
            sOctaves: this.controls.cloudsOctaves,
            sFalloff: this.controls.cloudsFalloff,
            sIntensity: this.controls.cloudsIntensity,
        });

        console.log(this.controls.resolution);
        this.planetTexture = new PlanetTexture({
            width: parseInt(this.controls.resolution),
            waterDeep: Application.datColor(this.controls.waterDeep),
            waterShallow: Application.datColor(this.controls.waterShallow),
            waterLevel: this.controls.waterLevel,
            waterSpecular: this.controls.waterSpecular,
            waterFalloff: this.controls.waterFalloff,
            surfaceNoise: surfaceNoise,
            landColor1: Application.datColor(this.controls.landColor1),
            landColor2: Application.datColor(this.controls.landColor2),
            landNoise: landNoise,
            cloudColor: Application.datColor(this.controls.cloudColor),
            cloudOpacity: this.controls.cloudOpacity,
            cloudNoise: cloudNoise,
            spin: this.controls.spin,
        });
        this.planetRenderer.setTexture(this.planetTexture);
        this.planetRenderer.setNormalScale(this.controls.normalScale);
        this.planetRenderer.setSize(this.width, this.height);
        this.plane = this.planetTexture.diffuse.canvas;
        this.solid = this.planetRenderer.canvas;
        this.trackball = new Trackball(this.planetRenderer.canvas, this.planetRenderer.planet);
    }

    deconstruct() {
        this.planetTexture.diffuse.canvas.remove();
        this.trackball.release();
    }

    update() {
        if (!this.planetTexture.done) {
            let t0 = Date.now();
            while (!this.planetTexture.done && Date.now() - t0 < 20) {
                this.planetTexture.update();
            }
            if (this.planetTexture.done) {
                this.planetRenderer.updateTexture();
            }
        }
        if (this.controls.animate) {
            this.planetRenderer.planetMesh.rotation.y += 0.001;
            this.planetRenderer.cloudMesh.rotation.y += 0.002;
        }
        this.planetRenderer.render();
        this.frameid = requestAnimationFrame(this.update.bind(this));
    }


}

class Controls {
    constructor(app) {
        this.app = app;

        this.seed = Application.randomSeed();
        this.resolution = 1024;
        this.spin = 1;

        this.surfaceiScale = 2;
        this.surfaceiOctaves = 8;
        this.surfaceiFalloff = 1;
        this.surfaceiIntensity = 1;
        this.surfaceiRidginess = 0.5;
        this.surfacesScale = 1;
        this.surfacesOctaves = 0;
        this.surfacesFalloff = 1;
        this.surfacesIntensity = 1;

        this.landColor1 = "#a37c6e";
        this.landColor2 = "#6b3024";
        this.landiScale = 2;
        this.landiOctaves = 1;
        this.landiFalloff = 1;
        this.landiIntensity = 1;
        this.landiRidginess = 0;
        this.landsScale = 2;
        this.landsOctaves = 0;
        this.landsFalloff = 1;
        this.landsIntensity = 1;

        this.waterDeep = "#000055";
        this.waterShallow = "#0000ff";
        this.waterLevel = .68;
        this.waterSpecular = 1;
        this.waterFalloff = 1;

        this.cloudColor = "#ff0000";
        this.cloudOpacity = 1;
        this.cloudiScale = 0.5;
        this.cloudiOctaves = 2;
        this.cloudiFalloff = 2;
        this.cloudiIntensity = 1.8;
        this.cloudiRidginess = 0;
        this.cloudsScale = 0.5;
        this.cloudsOctaves = 5;
        this.cloudsFalloff = 1;
        this.cloudsIntensity = 1;

        this.normalScale = 0.05;
        this.animate = true;
        this.spriteResolution = 512;
    }

    randomizeSeed() {
        this.seed = Application.randomSeed();
        this.render();
    }

    render() {
        this.app.deconstruct();
        this.app.construct();
    }

    randomizeAll() {
        this.seed = Application.randomSeed();
        this.spin = 1;
        if (Math.random() < 0.5) {
            this.spin = Math.random() * 7 + 1;
        }

        this.surfaceiScale = Math.random() * 2;
        this.surfaceiOctaves = Math.floor(Math.random() * 8 + 1);
        this.surfaceiFalloff = Math.random() * 3;
        this.surfaceiIntensity = Math.random() * 3;
        this.surfaceiRidginess = Math.random();
        this.surfacesScale = Math.random() * 2;
        this.surfacesOctaves = Math.floor(Math.random() * 8);
        this.surfacesFalloff = Math.random() * 3;
        this.surfacesIntensity = Math.random() * 3;

        this.landColor1 = Application.randomRGB();
        this.landColor2 = Application.randomRGB();
        this.landiScale = Math.random() * 2;
        this.landiOctaves = Math.floor(Math.random() * 8 + 1);
        this.landiFalloff = Math.random() * 3;
        this.landiIntensity = Math.random() * 3;
        this.landiRidginess = Math.random();
        this.landsScale = Math.random() * 2;
        this.landsOctaves = Math.floor(Math.random() * 8);
        this.landsFalloff = Math.random() * 3;
        this.landsIntensity = Math.random() * 3;

        this.waterDeep = Application.randomRGB();
        this.waterShallow = Application.randomRGB();
        this.waterLevel = 0;
        if (Math.random() < 0.5) {
            this.waterLevel = Math.random();
        }
        this.waterSpecular = Math.random();
        this.waterFalloff = Math.random() * 3;

        this.cloudColor = Application.randomRGB();
        this.cloudOpacity = Math.random();
        this.cloudiScale = Math.random() * 2;
        this.cloudiOctaves = Math.floor(Math.random() * 8 + 1);;
        this.cloudiFalloff = Math.random() * 3;
        this.cloudiIntensity = Math.random() * 3;
        this.cloudiRidginess = Math.random();
        this.cloudsScale = Math.random() * 2;
        this.cloudsOctaves = Math.floor(Math.random() * 8);;
        this.cloudsFalloff = Math.random() * 3;
        this.cloudsIntensity = Math.random() * 3;
        this.normalScale = Math.random() * 0.3;
        this.render();
    }

}

class PlanetRenderer {
    constructor(planetTexture) {
        this.planetTexture = planetTexture;
        this.renderer = null;
        this.camera = null;
        this.scene = null;
        this.planet = null;
        this.planetMesh = null;
        this.cloudMesh = null;
        this.canvas = null;
        this.diffuse = null
        this.specular = null;
        this.normal = null;
        this.cloud = null;

        this.canvas = document.createElement('canvas');

        this.camera = new THREE.PerspectiveCamera(61, 1, 0.1, 10);
        this.camera.position.set(0, 0, 2);
        this.scene = new THREE.Scene();
        this.planet = new THREE.Object3D();
        this.scene.add(this.planet);

        let material = new THREE.MeshPhongMaterial({
            color: 0xffffff
        });

        this.planetMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1, 5), material);
        this.planet.add(this.planetMesh);

        this.cloudMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1.001, 5), material);
        this.planet.add(this.cloudMesh);

        let light = new THREE.DirectionalLight(0xffffff);
        light.position.set(1, 0, 1);
        this.scene.add(light);

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            preserveDrawingBuffer: true,
            antialias: true,
            alpha: true
        });
    }

    setTexture(planetTexture) {
        this.diffuse = new THREE.Texture(planetTexture.diffuse.canvas);
        this.diffuse.wrapS = THREE.RepeatWrapping;
        this.normal = new THREE.Texture(planetTexture.normal.canvas);
        this.normal.wrapS = THREE.RepeatWrapping;
        this.specular = new THREE.Texture(planetTexture.specular.canvas);
        this.specular.wrapS = THREE.RepeatWrapping;
        let material = new THREE.MeshPhongMaterial({
            map: this.diffuse,
            normalMap: this.normal,
            specularMap: this.specular,
            normalScale: new THREE.Vector2(8, 8),
            specular: 0x777777,
            shininess: 16,
            metal: false
        });
        this.planetMesh.material = material;

        this.cloud = new THREE.Texture(planetTexture.cloud.canvas);
        this.cloud.wrapS = THREE.RepeatWrapping;
        material = new THREE.MeshPhongMaterial({
            map: this.cloud,
            transparent: true,
            specular: 0x000000,
        });
        this.cloudMesh.material = material;
    }

    updateTexture(planetTexture) {
        this.diffuse.needsUpdate = true;
        this.normal.needsUpdate = true;
        this.specular.needsUpdate = true;
        this.cloud.needsUpdate = true;
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    setSize(width, height) {
        this.renderer.setSize(width, height);
    }

    setNormalScale(s) {
        this.planetMesh.material.normalScale = new THREE.Vector2(s, s);
    }

    toDataURL(width, height) {
        let oldWidth = this.canvas.width;
        let oldHeight = this.canvas.height;
        this.setSize(width, height);
        this.render();
        let data = this.canvas.toDataURL();
        this.setSize(oldWidth, oldHeight);
        return data;
    }
}

class PlanetTexture {
    constructor(params) {
        this.params = params;
        this.width = params.width;
        this.height = params.width / 2;
        this.iterator = new XYIterator(this.width, this.height);
        this.diffuse = new PixelSurface(this.width, this.height);
        this.normal = new PixelSurface(this.width, this.height);
        this.specular = new PixelSurface(this.width, this.height);
        this.cloud = new PixelSurface(this.width, this.height);
        this.done = false;
    }
    surfaceHeight(x, y, z) {
        return this.params.surfaceNoise.sample(x / this.params.spin, y / this.params.spin, z);
    }

    surfaceColor(x, y, z) {
        let c = this.params.landNoise.sample(
            x / this.params.spin,
            y / this.params.spin,
            z
        );
        let q0 = c;
        let q1 = 1 - c;
        let r = this.params.landColor1.r * q0 + this.params.landColor2.r * q1;
        let g = this.params.landColor1.g * q0 + this.params.landColor2.g * q1;
        let b = this.params.landColor1.b * q0 + this.params.landColor2.b * q1;
        return {
            r: r,
            g: g,
            b: b
        };
    }

    update() {
        if (this.done) {
            return;
        }
        let next = this.iterator.next();
        let p0 = Application.sphereMap(next.x / (this.width - 1), next.y / (this.height - 1));
        let c0 = this.surfaceHeight(p0.x, p0.y, p0.z);
        let dr = 0.01;
        if (c0 > this.params.waterLevel) {
            let c = this.surfaceColor(p0.x, p0.y, p0.z);
            this.diffuse.setPixel(next.x, next.y, c.r, c.g, c.b, 1);
            this.specular.setPixel(next.x, next.y, 0, 0, 0, 1);
            let px = Application.sphereMap((next.x + dr) / (this.width - 1), next.y / (this.height - 1));
            let py = Application.sphereMap(next.x / (this.width - 1), (next.y + dr) / (this.height - 1));
            let cx = this.surfaceHeight(px.x, px.y, px.z);
            let cy = this.surfaceHeight(py.x, py.y, py.z);
            let n = $V([dr / (this.width - 1), 0, (cx - c0)]).cross($V([0, dr / (this.height - 1), (cy - c0)])).toUnitVector();
            let rgb = Application.normalRGBA(n.elements[0], -n.elements[1], n.elements[2]);
            this.normal.setPixel(next.x, next.y, rgb.r, rgb.g, rgb.b, 1);
        } else {
            let q1 = Application.smootherstep(Math.pow(c0 / this.params.waterLevel, this.params.waterFalloff));
            let q0 = 1 - q1;
            let rgb = {
                r: this.params.waterDeep.r * q0 + this.params.waterShallow.r * q1,
                g: this.params.waterDeep.g * q0 + this.params.waterShallow.g * q1,
                b: this.params.waterDeep.b * q0 + this.params.waterShallow.b * q1
            }
            this.diffuse.setPixel(next.x, next.y, rgb.r, rgb.g, rgb.b, 1);
            this.specular.setPixel(
                next.x, next.y,
                this.params.waterSpecular,
                this.params.waterSpecular,
                this.params.waterSpecular,
                1);
            rgb = Application.normalRGBA(0, 0, 1);
            this.normal.setPixel(next.x, next.y, rgb.r, rgb.g, rgb.b, 1);
        }
        let i = this.params.cloudNoise.sample(p0.x / this.params.spin, p0.y / this.params.spin, p0.z) * this.params.cloudOpacity;
        this.cloud.setPixel(
            next.x, next.y,
            this.params.cloudColor.r,
            this.params.cloudColor.g,
            this.params.cloudColor.b, i);
        if ((next.x == this.width - 1 && next.y % 32 == 0) || next.done == 1) {
            this.diffuse.update();
            this.normal.update();
            this.specular.update();
            this.cloud.update();
        }
        this.done = next.done == 1;
    }
}

class XYIterator {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.x = -1;
        this.y = 0;
    }

    next() {
        if (this.y == this.height) {
            return {
                x: this.width - 1,
                y: this.width - 1,
                done: 1
            };
        }
        this.x++;
        if (this.x == this.width) {
            this.x = 0;
            this.y++;
        }
        if (this.y == this.height) {
            return {
                x: this.width - 1,
                y: this.width - 1,
                done: 1
            };
        }
        return {
            x: this.x,
            y: this.y,
            done: (this.y * this.width + this.x) / (this.width * this.height)
        };
    }
}

class Noise {
    constructor(params) {
        this.seed = params.seed || this.randomSeed();
        this.iScale = params.iScale || 1;
        this.iOctaves = params.iOctaves || 1;
        this.iFalloff = params.iFalloff || 1;
        this.iIntensity = params.iIntensity || 1;
        this.iRidginess = params.iRidginess || 0;
        this.sScale = params.sScale || 1;
        this.sOctaves = params.sOctaves || 0;
        this.sFalloff = params.sFalloff || 1;
        this.sIntensity = params.sIntensity || 1;
        this.perlin = new Perlin(this.seed);
        this.noise = this.perlin.noise;
    }

    randomSeed() {
        return btoa(Math.floor(Math.random() * 9999999999999)).replace("=", "").replace("=", "");
    }

    octave(x, y, z, octaves) {
        let val = 0;
        let scale = 1;
        for (let i = 0; i < octaves; i++) {
            val += this.noise(x * scale, y * scale, z * scale) / scale;
            scale *= 2;
        }
        return val;
    }

    normalizedOctave(x, y, z, octaves) {
        let q = 2 - 1 / Math.pow(2, octaves - 1);
        return this.octave(x, y, z, octaves) / q;
    }

    ridgify(val) {
        return 1 - 2 * Math.abs(val - 0.5);
    }

    sample(x, y, z, params) {
        let offset = 0;
        if (this.sOctaves > 0) {
            offset = this.octave(x / this.sScale,
                y / this.sScale,
                z / this.sScale,
                this.sOctaves);
            offset = Math.pow(offset, this.sFalloff);
            offset = offset * this.sIntensity;
        }
        let val = this.normalizedOctave(x / this.iScale + offset,
            y / this.iScale + offset,
            z / this.iScale + offset,
            this.iOctaves);
        if (this.iRidginess > 0) {
            let ridge = this.normalizedOctave(x / this.iScale + offset,
                y / this.iScale + offset,
                z / this.iScale + offset + 11,
                this.iOctaves);
            val = this.iRidginess * this.ridgify(ridge) + (1 - this.iRidginess) * val;
        }
        val = Math.pow(val, this.iFalloff);
        val = Math.max(0, Math.min(1, val * this.iIntensity));
        return val;
    }
}

class Trackball {
    constructor(element, mesh) {
        this.element = element;
        this.buttonDown = false;
        this.mesh = mesh;
        this.lastX = 0;
        this.lastY = 0;
        this.element.addEventListener("mousedown", this.onMousedown.bind(this));
        window.addEventListener("mouseup", this.onMouseup.bind(this));
        window.addEventListener("mousemove", this.onMousemove.bind(this));
    }

    onMousedown(e) {
        this.buttonDown = true;
        this.lastX = e.clientX;
        this.lastY = e.clientY;
    };

    onMouseup(e) {
        this.buttonDown = false;
    }

    onMousemove(e) {
        if (!this.buttonDown) {
            return;
        }
        let dx = e.clientX - this.lastX;
        let dy = e.clientY - this.lastY;
        this.lastX = e.clientX;
        this.lastY = e.clientY;
        this.track(dx, dy);
    }

    track(dx, dy) {
        let tempMat = new THREE.Matrix4();
        // base this on the size of the canvas
        tempMat.makeRotationAxis(new THREE.Vector3(0, 1, 0), dx * 0.005);
        tempMat.multiply(this.mesh.matrix);
        let tempMat2 = new THREE.Matrix4();
        // base this on the size of the canvas
        tempMat2.makeRotationAxis(new THREE.Vector3(1, 0, 0), dy * 0.005);
        tempMat2.multiply(tempMat);
        this.mesh.rotation.setFromRotationMatrix(tempMat2);
    }

    release() {
        this.element.removeEventListener("mousedown", this.onMousedown.bind(this));
        window.removeEventListener("mouseup", this.onMouseup.bind(this));
        window.removeEventListener("mousemove", this.onMousemove.bind(this));
    }
}

class PixelSurface {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext('2d');
        this.imageData = this.context.getImageData(0, 0, this.width, this.height);
        this.pixels = this.imageData.data;
    }

    setPixel(x, y, r, g, b, a) {
        let i = 4 * (y * this.width + x);
        this.pixels[i + 0] = r * 256 << 0;
        this.pixels[i + 1] = g * 256 << 0;
        this.pixels[i + 2] = b * 256 << 0;
        this.pixels[i + 3] = a * 256 << 0;
    }
    update() {
        this.context.putImageData(this.imageData, 0, 0);
    }
}

class Perlin {
    constructor(seed) {
        let noise = new ClassicalNoise({ random: Alea(seed) });
        this.noise = (x, y, z) => {
            return 0.5 * noise.noise(x, y, z) + 0.5;
        }
    }
}

class ClassicalNoise {
    constructor(r) {
        if (!r)
            r = Math;
        this.grad3 = [
            [1, 1, 0],
            [-1, 1, 0],
            [1, -1, 0],
            [-1, -1, 0],
            [1, 0, 1],
            [-1, 0, 1],
            [1, 0, -1],
            [-1, 0, -1],
            [0, 1, 1],
            [0, -1, 1],
            [0, 1, -1],
            [0, -1, -1]
        ];
        this.p = [];
        for (let i = 0; i < 256; i++) {
            this.p[i] = Math.floor(r.random() * 256);
        }
        this.perm = [];
        for (let i = 0; i < 512; i++) {
            this.perm[i] = this.p[i & 255];
        }
    }

    dot(g, x, y, z) {
        return g[0] * x + g[1] * y + g[2] * z;
    }

    mix(a, b, t) {
        return (1.0 - t) * a + t * b;
    }

    fade(t) {
        return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
    }

    noise(x, y, z) {
        let X = Math.floor(x);
        let Y = Math.floor(y);
        let Z = Math.floor(z);
        x = x - X;
        y = y - Y;
        z = z - Z;
        X = X & 255;
        Y = Y & 255;
        Z = Z & 255;
        let gi000 = this.perm[X + this.perm[Y + this.perm[Z]]] % 12;
        let gi001 = this.perm[X + this.perm[Y + this.perm[Z + 1]]] % 12;
        let gi010 = this.perm[X + this.perm[Y + 1 + this.perm[Z]]] % 12;
        let gi011 = this.perm[X + this.perm[Y + 1 + this.perm[Z + 1]]] % 12;
        let gi100 = this.perm[X + 1 + this.perm[Y + this.perm[Z]]] % 12;
        let gi101 = this.perm[X + 1 + this.perm[Y + this.perm[Z + 1]]] % 12;
        let gi110 = this.perm[X + 1 + this.perm[Y + 1 + this.perm[Z]]] % 12;
        let gi111 = this.perm[X + 1 + this.perm[Y + 1 + this.perm[Z + 1]]] % 12;
        let n000 = this.dot(this.grad3[gi000], x, y, z);
        let n100 = this.dot(this.grad3[gi100], x - 1, y, z);
        let n010 = this.dot(this.grad3[gi010], x, y - 1, z);
        let n110 = this.dot(this.grad3[gi110], x - 1, y - 1, z);
        let n001 = this.dot(this.grad3[gi001], x, y, z - 1);
        let n101 = this.dot(this.grad3[gi101], x - 1, y, z - 1);
        let n011 = this.dot(this.grad3[gi011], x, y - 1, z - 1);
        let n111 = this.dot(this.grad3[gi111], x - 1, y - 1, z - 1);
        let u = this.fade(x);
        let v = this.fade(y);
        let w = this.fade(z);
        let nx00 = this.mix(n000, n100, u);
        let nx01 = this.mix(n001, n101, u);
        let nx10 = this.mix(n010, n110, u);
        let nx11 = this.mix(n011, n111, u);
        let nxy0 = this.mix(nx00, nx10, v);
        let nxy1 = this.mix(nx01, nx11, v);
        let nxyz = this.mix(nxy0, nxy1, w);
        return nxyz;
    }
}
