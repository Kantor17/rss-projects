import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { Data, DataSources, AppInterface, CallBack } from '../myTypes';

class App implements AppInterface {
    private controller: AppController;
    private view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const cb: CallBack<Data> = (data: Data) => this.view.drawNews(data);
        (document.querySelector('.sources') as HTMLElement).addEventListener('click', (e: Event) => {
            this.controller.getNews(e, cb);
        });
        this.controller.getSources((data: DataSources) => this.view.drawSources(data));

        this.controller.getHotNews('ua', cb);
    }
}

export default App;
