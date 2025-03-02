import targetsJson from "./target.json"

export interface Target {
    title:string;
    cssKey: string; // check css-variants.ts for available keys
    url: string;
    urlPatterns: string[];
    selector: string;
}

const targets: Target[] = targetsJson;

export default targets;
