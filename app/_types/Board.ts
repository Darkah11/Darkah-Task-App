export interface Board {
    title: string;
    createdAt: number;
    updatedAt: number;
}


export type BoardWithId = Board & {
  id: string;
};
