import { Draggable, Droppable } from "react-beautiful-dnd";
import DragabbleCard from "./DragabbleCard";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ITodo, IToDoState, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";
import React from "react";

const Wrapper = styled.div`
    width: 300px;
    padding-top: 10px;
    background-color: ${props => props.theme.boardColor};
    border-radius: 5px;
    min-height: 300px;

    display: flex;
    flex-direction: column;
`;

const Title = styled.div`
    text-align: center;
    font-weight: 800;
    margin-bottom: 10px;
    font-size: 18px;
    text-transform: uppercase;
`;

interface IAreaProps {
    isDraggingOver: boolean;
    isDraggingFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
    background-color: ${props =>
        props.isDraggingOver
            ? "#dfe6e9"
            : props.isDraggingFromThis
                ? "#b2bec3"
                : "tranparent"
    };
    flex-grow: 1;
    transition: background-color .3s ease-in-out;
    padding: 20px;
`;

const Form = styled.form`
    width: 100%;
    input {
        width: 100%;
    }
`;


interface IBaordProps {
    toDos: ITodo[],
    boardId: string;
    index: number;
}

interface IForm {
    toDo: string;
}
function Board({ toDos, boardId, index }: IBaordProps) {
    const setToDos = useSetRecoilState(toDoState);
    const { register, setValue, handleSubmit } = useForm<IForm>();
    const removeBoard = () => {
        setToDos(allBoards => {
            const newToDo = Object.keys(allBoards);

            newToDo.splice(index, 1);

            const newObj: IToDoState = {};
            newToDo.forEach(key => {
                newObj[key] = allBoards[key];
            });
            return newObj;
        })
    }
    const onValid = ({ toDo }: IForm) => {
        const newToDo = {
            id: Date.now(),
            text: toDo,
        }
        setToDos(allBoards => {
            return {
                ...allBoards,
                [boardId]: [newToDo, ...allBoards[boardId]]
            }
        });
        setValue("toDo", "");
    }
    return (
        <Draggable key={boardId} draggableId={boardId + ""} index={index}>
            {(magic, snapshot) => (
                <Wrapper
                    ref={magic.innerRef}
                    {...magic.dragHandleProps}
                    {...magic.draggableProps}
                >
                    <Header>
                        <div></div>
                        <Title>{boardId}</Title>
                        <button onClick={removeBoard}>X</button>
                    </Header>
                    <Form onSubmit={handleSubmit(onValid)}>
                        <input {...register("toDo", { required: true })} type="text" placeholder={`Add Task on ${boardId}`} />
                    </Form>
                    <Droppable droppableId={boardId}>
                        {(magic, info) =>
                            <Area
                                isDraggingOver={info.isDraggingOver}
                                isDraggingFromThis={Boolean(info.draggingFromThisWith)}
                                ref={magic.innerRef}
                                {...magic.droppableProps}
                            >
                                {toDos.map((toDo, index) =>
                                    //Draggable의 Key랑 draggableId는 같아야한다!
                                    <DragabbleCard
                                        key={toDo.id}
                                        index={index}
                                        toDoId={toDo.id}
                                        toDoText={toDo.text}
                                        boardId={boardId}
                                        info={info}
                                    />
                                )}
                                {magic.placeholder}
                            </Area>
                        }
                    </Droppable>
                </Wrapper>
            )}
        </Draggable>
    )
}

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

`;

export default Board;