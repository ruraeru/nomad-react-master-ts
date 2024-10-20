import { Droppable } from "react-beautiful-dnd";
import DragabbleCard from "./DragabbleCard";
import styled from "styled-components";

const Wrapper = styled.div`
	padding: 20px 10px;
	padding-top: 30px;
	background-color: ${props => props.theme.boardColor};
	border-radius: 5px;
	min-height: 200px;
`;

const Title = styled.div`
    text-align: center;
    font-weight: 800;
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
                    <Wrapper ref={magic.innerRef} {...magic.droppableProps}>
                        {toDos.map((toDo, index) =>
                            //Draggable의 Key랑 draggableId는 같아야한다!
                            <DragabbleCard key={toDo} index={index} toDo={toDo} />
                        )}
                        {magic.placeholder}
                    </Wrapper>
                }
            </Droppable>
        </Wrapper>
    )
}

export default Board;