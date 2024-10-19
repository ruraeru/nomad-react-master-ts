import { atom, selector } from "recoil";

export const minutsState = atom({
    key: "minutes",
    default: 0
})

export const hourSelctor = selector({
    key: "hours",
    get: ({ get }) => {
        const minutes = get(minutsState);
        return minutes / 60;
    },
    set: ({ set }, newValue) => {
        const minutes = Number(newValue) * 60;
        set(minutsState, minutes);
    }
})