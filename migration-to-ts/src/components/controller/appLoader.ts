import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '83c309dc7b1746e48a4426f990325996',
        });
    }
}

export default AppLoader;
