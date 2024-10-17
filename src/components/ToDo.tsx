import { IToDo } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
    return (
        <li>
            {text}
            <button>Done</button>
            <button>To Do</button>
            <button>Doing</button>
        </li>
    )
}

export default ToDo;