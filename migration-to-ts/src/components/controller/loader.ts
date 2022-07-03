import { Options } from '../myTypes';
import { InitOptions } from '../myTypes';
import { Endpoints } from '../myTypes';
import { CallBack } from '../myTypes';
import { Data } from '../myTypes';

enum statusCode {
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
}

class Loader {
    baseLink: string;
    options: Options;
    constructor(baseLink: string, options: InitOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options }: { endpoint: Endpoints; options?: Options },
        callback: CallBack = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === statusCode.UNAUTHORIZED || res.status === statusCode.NOT_FOUND)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(endpoint: Endpoints, options?: Options) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: 'GET' | 'POST', endpoint: Endpoints, callback: CallBack, options?: Options) {
        fetch(this.makeUrl(endpoint, options), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: Data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
