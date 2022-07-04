import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: '94548ad170e84e558cc871a48aabe065',
        });
    }
}

export default AppLoader;
