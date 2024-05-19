import { createServer, Response } from 'miragejs';
import * as consts from '../config';
import * as json_data from './json-data/index';

const CORRECT_SOLUTION = [
  ".",
  "P",
  "O",
  "O",
  ".",
  "D",
  "A",
  "N",
  "C",
  "E",
  "M",
  "R",
  ".",
  "E",
  "A",
  "S",
  "T",
  "R",
  "A",
  "T",
  ".",
  "Y",
  "I",
  "N",
  ".",
];

export function makeServer() {
  console.log('Starting Mirage JS server...');

  consts.SERVER_TYPE === 'MOCK' &&
    createServer({
      routes() {
        this.get(`${consts.GET_PUZZLE}/:puzzleId`, () => {
          return json_data.JSON_DATA;
        });

        this.post(`${consts.VALIDATE_PUZZLE}/:puzzleId`, (schema, request) => {
          const { puzzleId } = request.params;
          const { solution } = JSON.parse(request.requestBody);

          // Check if the solution matches the correct solution
          const isCorrect = JSON.stringify(solution) === JSON.stringify(CORRECT_SOLUTION);

          return new Response(200, {}, { isCorrect });
        });
      },
    });
}