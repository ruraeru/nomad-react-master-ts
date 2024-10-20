import { Droppable } from "react-beautiful-dnd";
import DragabbleCard from "./DragabbleCard";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 300px;
    padding: 20px 10px;
    padding-top: 10px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    min-height: 300px;
`;

const Title = styled.div`
    text-align: center;
    font-weight: 800;
    margin-bottom: 10px;
    font-size: 18px;
    text-transform: uppercase;
`;

interface IBaordProps {
    toDos: string[],
    boardId: string;
}

function Board({ toDos, boardId }: IBaordProps) {
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Droppable droppableId={boardId}>
                {(magic) =>
                    <div style={{ backgroundColor: "red" }} ref={magic.innerRef} {...magic.droppableProps}>
                        {toDos.map((toDo, index) =>
                            //Draggable의 Key랑 draggableId는 같아야한다!
                            <DragabbleCard key={toDo} index={index} toDo={toDo} />
                        )}
                        {magic.placeholder}
                    </div>
                }
            </Droppable>
        </Wrapper>
    )
}

export default Board;