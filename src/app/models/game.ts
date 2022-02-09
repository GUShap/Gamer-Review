export interface Game {
    id: string;
    background_image: string;
    name: string;
    released: string;
    metacritic_url: string;
    description: string;
    metacritic: number;
    genres: Genre[];
    parent_platforms: ParentPlatform[];
    publishers: Publishers[];
    ratings: Rating[];
    screenshots: Screenshots[];
    trailers: Trailer[];
    website: string;
}

interface Genre {
    name: string
}

interface ParentPlatform {
    platform: {
        name: string;
        slug: string
    }
}

interface Publishers {
    name: string;
}

interface Rating {
    id: number;
    count: number;
    title: string
}

interface Screenshots {
    image: string;
}

interface Trailer {
    data: {
        max: string
    }
}