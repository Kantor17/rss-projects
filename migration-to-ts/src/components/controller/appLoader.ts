import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '94548ad170e84e558cc871a48aabe065',
        });
    }
}

export default AppLoader;
