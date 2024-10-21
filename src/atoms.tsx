import { atom } from "recoil";

const localStoageEffet = (key: string) => ({ setSelf, onSet }: any) => {
    console.log(key, setSelf, onSet)
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: string[], _: any, isReset: boolean) => {
        isReset
            ? localStorage.removeItem(key)
            : localStorage.setItem(key, JSON.stringify(newValue));
    });
};

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
    },
    effects: [
        localStoageEffet("Taks")
    ]
});

