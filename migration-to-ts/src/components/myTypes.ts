export type Options = Partial<{
    [index: string]: string;
}>;
export type InitOptions = Options & { apiKey: string };
export type Endpoints = 'everything' | 'top-headlines' | 'sources';
export interface CallBack<T> {
    (data: T): void;
}
export type Data = Readonly<{
    articles: Article[];
    status: string;
    totalResults: number;
}>;
export type DataSources = Pick<Data, 'status'> & {
    sources: SourceType[];
};
export type Article = {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: SourceType;
    title: string;
    url: string;
    urlToImage: string;
};
export type SourceType = {
    id: string;
    name: string;
};

export interface LoaderInterface {
    baseLink: string;
    options: Options;
    getResp({ endpoint, options }: { endpoint: Endpoints; options?: Options }): void;
}
export interface ControllerInterface {
    getSources(callback: CallBack<DataSources>): void;
    getNews(e: Event, callback: CallBack<Data>): void;
}
export interface NewsInterface {
    draw(data: Article[]): void;
}
export interface SourcesInterface {
    draw(data: SourceType[]): void;
}
export interface AppViewInterface {
    drawNews(data: Data): void;
    drawSources(data: DataSources): void;
}
export interface AppInterface {
    start(): void;
}
