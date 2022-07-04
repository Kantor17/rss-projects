import { CallBack, Endpoints, InitOptions, Options, LoaderInterface } from '../myTypes';

enum statusCode {
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
}

class Loader implements LoaderInterface {
    constructor(public baseLink: string, public options: InitOptions) {}

    getResp<T>(
        { endpoint, options }: { endpoint: Endpoints; options?: Options },
        callback: CallBack<T> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === statusCode.UNAUTHORIZED || res.status === statusCode.NOT_FOUND)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(endpoint: Endpoints, options?: Options): string {
        const urlOptions: {
            [x: string]: string | undefined;
            apiKey: string;
        } = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(method: 'GET' | 'POST', endpoint: Endpoints, callback: CallBack<T>, options?: Options): void {
        fetch(this.makeUrl(endpoint, options), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: T) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
