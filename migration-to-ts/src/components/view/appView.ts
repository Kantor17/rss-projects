import News from './news/news';
import Sources from './sources/sources';
import { Data } from '../controller/loader';
import { Article } from '../view/news/news';

export class AppView {
    news: News;
    sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: Data) {
        const values: Article[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: Pick<Data, 'sources'>) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
