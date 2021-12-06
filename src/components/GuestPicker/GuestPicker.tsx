import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from './GuestPicker.scss';

type Guest = {
	id: number;
	email: string;
};
type GuestPickerProps = {
	jumpToStep?: (step: number) => void;
};

const reorder = (list: Guest[], startIndex: number, endIndex: number): Guest[] => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

export const GuestPicker: React.FC<GuestPickerProps> = (props) => {
	const { jumpToStep } = props;
	const [guests, setGuests] = useState<Guest[]>([]);
	const [newGuestEmail, setNewGuestEmail] = useState<string>('');

	const onDragEnd = (result) => {
		if (!result.destination) {
			return;
		}

		if (result.destination.index === result.source.index) {
			return;
		}

		const newGuests = reorder(guests, result.source.index, result.destination.index);

		setGuests(newGuests);
	};

	const addNewGuest = (e) => {
		if (e.key === 'Enter') {
			setGuests([...guests, { id: guests.length + 1, email: newGuestEmail }]);
			setNewGuestEmail('');
		}
	};

	return (
		<>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="guestList">
					{(provided) => (
						<div ref={provided.innerRef} {...provided.droppableProps}>
							{guests.map((guest, index) => (
								<Draggable key={guest.id} draggableId={guest.id} index={index}>
									{(provided) => (
										<div
											className={styles.guestItem}
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}>
											{guest.email}
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
			<div>
				<input
					className={styles.addGuest}
					value={newGuestEmail}
					onChange={(e) => setNewGuestEmail(e.target.value)}
					onKeyPress={addNewGuest}
					type="text"
					placeholder="Add guest"
				/>
				<button onClick={() => jumpToStep(2)}>Continue</button>
			</div>
		</>
	);
};
