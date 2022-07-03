export type Options = Partial<{
    [index: string]: string;
}>;
export type InitOptions = Options & { apiKey: string };
export type Endpoints = 'everything' | 'top-headlines' | 'sources';
export type CallBack = (data: Data) => void;
export interface Data {
    articles: Article[];
    status: string;
    totalResults: number;
    sources?: SourceType[];
}

export interface Article {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: SourceType;
    title: string;
    url: string;
    urlToImage: string;
}
export type SourceType = {
    id: string;
    name: string;
};
