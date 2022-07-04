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
        (document.querySelector('.sources') as HTMLElement).addEventListener('click', (e: Event) => {
            const cb: CallBack<Data> = (data: Data) => this.view.drawNews(data);
            this.controller.getNews(e, cb);
        });
        this.controller.getSources((data: DataSources) => this.view.drawSources(data));
    }
}

export default App;
