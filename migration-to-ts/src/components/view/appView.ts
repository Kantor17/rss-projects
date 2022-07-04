import News from './news/news';
import Sources from './sources/sources';
import { Article, AppViewInterface, Data, SourceType } from '../myTypes';

export class AppView implements AppViewInterface {
    private news: News;
    private sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: Data): void {
        const values: Article[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: Pick<Data, 'sources'>): void {
        const values: SourceType[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
