import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IToDoState, toDoState } from "./atoms";
import Board from "./components/Board";

const Wrapper = styled.div`
	display: flex;
	width: 100vw;

	height: 100vh;
	margin: 0 auto;
	justify-content: center;
	align-items: center;
`;

const Boards = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	width: 100%;
	gap: 10px;
`;

function App() {
	const [toDos, setToDos] = useRecoilState(toDoState);
	/*
	대단하다..
	const onDragEnd2 = ({ draggableId, destination, source }: DropResult) => {
		if (!destination) return;
		setToDos((allBoards) => {
			const copyToDos: IToDoState = {};
			Object.keys(allBoards).forEach((toDosKey) => {
				copyToDos[toDosKey] = [...allBoards[toDosKey]];
			});
			copyToDos[source.droppableId].splice(source.index, 1);
			copyToDos[destination.droppableId].splice(
				destination.index,
				0,
				draggableId
			);
			return copyToDos;
		});
	};
	*/
	const onDragEnd = (info: DropResult) => {
		const { destination, draggableId, source } = info;
		if (!destination) return;
		if (destination.droppableId === source.droppableId) {
			//same board movement;
			setToDos((allBoards) => {
				const boardCopy = [...allBoards[source.droppableId]];
				const taskObj = boardCopy[source.index];
				boardCopy.splice(source.index, 1);
				boardCopy.splice(destination?.index, 0, taskObj);
				return {
					...allBoards,
					[source.droppableId]: boardCopy
				}
			});
		}
		if (destination.droppableId !== source.droppableId) {
			//cross board movement;
			setToDos((allBoards) => {
				const sourceBoardCopy = [...allBoards[source.droppableId]];
				const taskObj = sourceBoardCopy[source.index];
				const destinationBoard = [...allBoards[destination.droppableId]];

				sourceBoardCopy.splice(source.index, 1);
				destinationBoard.splice(destination.index, 0, taskObj);

				return {
					...allBoards,
					[source.droppableId]: sourceBoardCopy,
					[destination.droppableId]: destinationBoard
				};
			})
		}
	}
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<input />
			<Wrapper>
				<Boards>
					{Object.keys(toDos).map((boardId) =>
						<Board
							boardId={boardId}
							key={boardId}
							toDos={toDos[boardId]}
						/>
					)}
				</Boards>
			</Wrapper>
		</DragDropContext>
	)
}

export default App;