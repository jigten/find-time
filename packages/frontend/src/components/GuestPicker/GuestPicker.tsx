import React, {useState} from 'react';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import styles from './GuestPicker.scss';

export type Guest = {
  id: string;
  email: string;
};

type GuestPickerProps = {
  finalGuests: Guest[];
  setFinalGuests: (guests: Guest[]) => void;
  jumpToStep?: (step: number) => void;
};

const reorder = (list: Guest[], startIndex: number, endIndex: number): Guest[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const GuestPicker: React.FC<GuestPickerProps> = (props) => {
  const {finalGuests, setFinalGuests, jumpToStep} = props;
  const [guests, setGuests] = useState<Guest[]>(finalGuests);
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
    e.preventDefault();
    setGuests([...guests, {id: `guest-${guests.length + 1}`, email: newGuestEmail}]);
    setNewGuestEmail('');
  };

  const handleContinue = () => {
    setFinalGuests(guests);
    jumpToStep(2);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='guestList'>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {guests.map((guest, index) => (
                <Draggable key={guest.id} draggableId={guest.id} index={index}>
                  {(provided) => (
                    <div
                      className={styles.guestItem}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
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
        <form onSubmit={addNewGuest}>
          <input
            className={styles.addGuest}
            value={newGuestEmail}
            onChange={(e) => setNewGuestEmail(e.target.value)}
            type='text'
            placeholder='Add guest'
          />
          <input type='submit' value='Add Guest' />
        </form>
        <button
          onClick={() => {
            jumpToStep(0);
          }}
        >
          Edit schedule
        </button>
        <button className={styles.continue} onClick={handleContinue}>
          Continue
        </button>
      </div>
    </>
  );
};
