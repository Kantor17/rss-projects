import AppLoader from './appLoader';
import { Data, DataSources, CallBack, ControllerInterface } from '../myTypes';

class AppController extends AppLoader implements ControllerInterface {
    getSources(callback: CallBack<DataSources>): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: CallBack<Data>): void {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id') as string;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }

    getHotNews(country: string, callback: CallBack<Data>): void {
        super.getResp(
            {
                endpoint: 'top-headlines',
                options: {
                    country: country,
                },
            },
            callback
        );
    }
}

export default AppController;
