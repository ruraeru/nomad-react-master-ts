import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

interface IForm {
    toDo: string;
}

function CreateToDo() {
    const setToDos = useSetRecoilState(toDoState);
    const { register, handleSubmit, setValue } = useForm<IForm>();
    const handleValid = ({ toDo }: IForm) => {
        console.log("add todo", toDo);
        setToDos(prev => [{
            text: toDo,
            id: Date.now(),
            category: "TO_DO"
        }, ...prev]);
        setValue("toDo", "");
    }
    return (
        <form onSubmit={handleSubmit(handleValid)}>
            <input {...register("toDo", {
                required: "plz write a to Do"
            })} placeholder="Write a to do " />
            <button>Add</button>
        </form>
    )
}

export default CreateToDo;