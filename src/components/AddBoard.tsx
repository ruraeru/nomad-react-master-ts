import { useSetRecoilState } from "recoil"
import { toDoState } from "../atoms"
import { useForm } from "react-hook-form";

interface IBoardForm {
    board: string;
}


export default function AddBoard() {
    const addBoard = useSetRecoilState(toDoState);
    const { register, handleSubmit, setValue, setError, formState } = useForm<IBoardForm>();
    const onSubmit = (info: IBoardForm) => {
        const { board } = info;
        addBoard(prev => {
            const newBoard = {
                ...prev,
                [board + ""]: [],
            };
            return newBoard;
        });
        setValue("board", "");
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                type="text"
                placeholder="add board name"
                {...register("board", {
                    required: "board name is required",
                    pattern: {
                        value: /[A-Za-z0-9]+$/,
                        message: "Only string and number"
                    }
                })}
            />
            {formState.errors.board?.message}
        </form>
    )
}