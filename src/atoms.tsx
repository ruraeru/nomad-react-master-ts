import { atom } from "recoil";

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: []
});

export interface IToDo {
    text: string;
    id: number;
    category: "DONE" | "DOING" | "TO_DO";
}