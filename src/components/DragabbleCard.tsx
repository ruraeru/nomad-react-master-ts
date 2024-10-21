import React from "react";
import { Draggable } from "react-beautiful-dnd"
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

const Card = styled.div<{ isDragging: boolean }>`
	border-radius: 5px;
	padding: 10px 10px;
	background-color: ${props => props.isDragging ? "#74b9ff" : props.theme.cardColor};
	margin-bottom: 5px;
    box-shadow: ${props => props.isDragging ? "0px 2px 25px rgba(0, 0, 0, 0.05)" : "none"};

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

interface IDragabbleCardProps {
    toDoId: number;
    toDoText: string;
    index: number;
    boardId: string;
}

function DragabbleCard({ toDoId, toDoText, index, boardId }: IDragabbleCardProps) {
    const setTodos = useSetRecoilState(toDoState);
    const onDeleteTask = () => {
        setTodos(allBoards => {
            const modifyBoard = [...allBoards[boardId]];
            modifyBoard.splice(index, 1);
            return {
                ...allBoards,
                [boardId]: modifyBoard
            }
        })
    }
    return (
        <Draggable key={toDoId} draggableId={toDoId + ""} index={index}>
            {(magic, snapshot) =>
                <Card
                    isDragging={snapshot.isDragging}
                    ref={magic.innerRef}
                    {...magic.draggableProps}
                    {...magic.dragHandleProps}
                >
                    {toDoText}
                    <button onClick={onDeleteTask}>delete</button>
                </Card>
            }
        </Draggable>)
}

export default React.memo(DragabbleCard);