import { atom, selector } from "recoil";

export interface ITodo {
    id: number;
    text: string;
}

//추후 Board 추가를 위한 interface
export interface IToDoState {
    [key: string]: ITodo[];
}

export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: {
        "To Do": [],
        Doing: [],
        Done: [],
    }
});