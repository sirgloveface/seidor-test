import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

export class AppService {
    private url = 'http://localhost:3000';
    private socket;    

    constructor() {
        this.socket = io(this.url);
      
    }

    public sendMessage(message) {
        this.socket.emit('new-message', message);
    }

    public getWeather(message) {
        this.socket.emit('getWeather', message);
    }

    public getMessages = () => {
        return Observable.create((observer) => {
            this.socket.on('weather', (message) => {
                observer.next(message);
            })
        })
    }
}