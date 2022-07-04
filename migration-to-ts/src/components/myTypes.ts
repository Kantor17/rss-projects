import News from './view/news/news';
import Sources from './view/sources/sources';
import AppController from './controller/controller';
import { AppView } from './view/appView';

export type Options = Partial<{
    [index: string]: string;
}>;
export type InitOptions = Options & { apiKey: string };
export type Endpoints = 'everything' | 'top-headlines' | 'sources';
export type CallBack = (data: Data) => void;
export type Data = Readonly<{
    articles: Article[];
    status: string;
    totalResults: number;
    sources?: SourceType[];
}>;
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
    errorHandler(res: Response): Response;
    makeUrl(endpoint: Endpoints, options: Options): string;
    load(method: 'GET' | 'POST', endpoint: Endpoints, callback: CallBack, options?: Options): void;
}
export interface ControllerInterface {
    getSources(callback: CallBack): void;
    getNews(e: Event, callback: CallBack): void;
}
export interface NewsInterface {
    draw(data: Article[]): void;
}
export interface SourcesInterface {
    draw(data: SourceType[]): void;
}
export interface AppViewInterface {
    news: News;
    sources: Sources;
    drawNews(data: Data): void;
    drawSources(data: Pick<Data, 'sources'>): void;
}
export interface AppInterface {
    controller: AppController;
    view: AppView;
    start(): void;
}
