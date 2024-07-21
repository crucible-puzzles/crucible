
export interface Puzzle {
    id: number;
    title: string;
    createdOn: string;
    createdBy: string;
    boardHeight: number;
    boardWidth: number;
    initialStructure: number[];
    hints: Hint[];
}

export interface Hint {
    number: string;
    direction: 'down' | 'across';
    text: string;
  }