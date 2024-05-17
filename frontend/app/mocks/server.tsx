import { createServer } from 'miragejs';
import * as consts from '../config';
import * as json_data from './json-data/index';

export function makeServer() {
    console.log('Starting Mirage JS server...');
    consts.SERVER_TYPE === 'MOCK' &&
    createServer({
    routes() {
        this.get(`${consts.GET_PUZZLE}/:puzzleId`, () => {
        return json_data.JSON_DATA;
        });
    },
    });
}