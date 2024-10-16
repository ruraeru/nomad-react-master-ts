import { useState } from "react";
import { useForm } from "react-hook-form";

// function ToDoList() {
//     const [toDo, setToDo] = useState("");
//     const [toDoErr, setToDoErr] = useState("");
//     const onChange = (e: React.FormEvent<HTMLInputElement>) => {
//         const { currentTarget: { value } } = e;
//         setToDoErr("");
//         setToDo(value);
//     }

//     const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         if (toDo.length < 10) {
//             return setToDoErr("To do should be llonger")
//         }
//         console.log("submit");
//     }
//     return (
//         <div>
//             <form onSubmit={onSubmit}>
//                 <input onChange={onChange} value={toDo} placeholder="Write a to do " />
//                 <button>Add</button>
//                 {toDoErr !== "" ? toDoErr : null}
//             </form>
//         </div>
//     );
// }

interface IForm {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    password1: string;
    extraError?: string;
}

function ToDoList() {
    const { register, handleSubmit, formState: { errors }, setError } = useForm<IForm>({
        defaultValues: {
            email: "@naver.com"
        }
    });
    const onValid = (data: IForm) => {
        if (data.password !== data.password1) {
            setError("password1", { message: "password are not the same" }, { shouldFocus: true })
        }
        //setError("extraError", { message: "Server offline" })
    }
    console.log(errors)
    return (
        <div>
            <form style={{
                display: "flex",
                flexDirection: "column"
            }} onSubmit={handleSubmit(onValid)}>
                <input
                    {...register("email",
                        {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                                message: "Only naver.com emails allowed"
                            }
                        })}
                    placeholder="Email"
                />
                <span>{errors.email?.message}</span>
                <input
                    {...register("firstName",
                        {
                            required: true,
                            validate: {
                                noNico: (value) => !value.includes("nico") || "no nico allowed"
                            }
                        })} placeholder="First Name"
                />
                <span>{errors.firstName?.message}</span>
                <input {...register("lastName", { required: true })} placeholder="Last Name" />
                <span>{errors.lastName?.message}</span>
                <input {...register("username", { required: true, minLength: 10 })} placeholder="Username" />
                <span>{errors.username?.message}</span>
                <input {...register("password", { required: true, minLength: 5 })} placeholder="Password" />
                <span>{errors.password?.message}</span>
                <input {...register("password1", {
                    required: "Password is Required", minLength: {
                        value: 5,
                        message: "Your password is too short"
                    }
                })} placeholder="Password1" />
                <span>{errors.password1?.message}</span>
                <button>Add</button>
                <span>{errors.extraError?.message}</span>
            </form>
        </div>
    )
}

export default ToDoList;