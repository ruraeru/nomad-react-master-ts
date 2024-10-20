import { atom, selector } from "recoil";

//추후 Board 추가를 위한 interface
interface IToDoState {
    [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: {
        "To Do": ["a", "b"],
        Doing: ["c", "d", "e"],
        Done: ["f"],
    }
})