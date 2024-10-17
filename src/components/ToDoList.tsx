import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";

const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: []
})

interface IToDo {
    text: string;
    id: number;
    category: "DONE" | "DOING" | "TO_DO";
}

interface IForm {
    toDo: string;
}

function ToDoList() {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const {
        register,
        handleSubmit,
        setValue
    } = useForm<IForm>();
    const handleValid = ({ toDo }: IForm) => {
        console.log("add todo", toDo);
        setToDos(prev => [{
            text: toDo,
            id: Date.now(),
            category: "TO_DO"
        }, ...prev]);
        setValue("toDo", "");
    }
    console.log(toDos)
    return (
        <div>
            <h1>To Dos</h1>
            <hr />
            <form onSubmit={handleSubmit(handleValid)}>
                <input {...register("toDo", {
                    required: "plz write a to Do"
                })} placeholder="Write a to do " />
                <button>Add</button>
            </form>
            <ul>
                {toDos.map((toDo) => (
                    <li key={toDo.id}>{toDo.text}</li>
                ))}
            </ul>
        </div>
    );
}

export default ToDoList;