import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IToDoState, toDoState } from "./atoms";
import Board from "./components/Board";
import React from "react";
import AddBoard from "./components/AddBoard";

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
	const onDragEnd = (info: DropResult) => {
		const { destination, draggableId, source } = info;

		if (!destination) return;
		//board movement
		if (
			source.droppableId === "board"
			&& destination.droppableId === "board"
		) {
			setToDos((prev): IToDoState => {
				const newToDo = Object.keys(prev); //[todo, doing, done]
				const taskObj = String(newToDo[source.index]); //doing index = 1

				newToDo.splice(source.index, 1); //newTodo = [todo, done]
				newToDo.splice(destination.index, 0, taskObj); //destin index = 2 [todo done doing]

				const newObj: IToDoState = {}; //newObj = {}

				newToDo.forEach((key) => { //key = todo,done, doing
					newObj[key] = prev[key]; //newObj todo: [12,3,21,3]
				});
				return newObj;
			})
			return;
		}



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
			<AddBoard />
			<Droppable droppableId="board" type="active" direction="horizontal">
				{(magic) => (
					<Wrapper>
						<Boards ref={magic.innerRef} {...magic.droppableProps}>
							{Object.keys(toDos).map((boardId, index) =>
								<Board
									boardId={boardId}
									key={boardId}
									toDos={toDos[boardId]}
									index={index}
								/>
							)}
							{magic.placeholder}
						</Boards>
					</Wrapper>
				)}
			</Droppable>
		</DragDropContext>
	)
}

export default App;