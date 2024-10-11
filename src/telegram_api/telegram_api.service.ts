import { Injectable } from '@nestjs/common';
import { strict } from 'assert';
import { client } from 'src/main';


@Injectable()
export class TelegramApiService {
    constructor() {}
    async get_reviews() {
        return client.getMessages(2185352136,{limit: 10});
    }
    async get_news() {
        return client.getMessages("sadovolk_store",{limit: 10});
    }
}

