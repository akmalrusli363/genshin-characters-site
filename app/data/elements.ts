export default interface Element {
    name: string;
    type: string;
    color: string;
    region: string;
    imageBase64: string;
    imageWiki: string;
}

export interface ElementResponse {
    name: string;
    type: string;
    color: string;
    emoji: string;
    region: string;
    archon: string;
    theme: string;
    images: {
        base64: string;
        wikia: string;
    };
    version: string;
}

export function mapElementResponseToElement(response: ElementResponse): Element {
    return {
        name: response.name,
        type: response.type,
        color: response.color,
        region: response.region,
        imageBase64: response.images.base64,
        imageWiki: response.images.wikia,
    };
}