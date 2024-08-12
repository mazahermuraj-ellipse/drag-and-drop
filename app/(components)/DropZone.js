import React from 'react';
import { useDrop } from 'react-dnd';

const DropZone = ({ onDrop }) => {
    const [, drop] = useDrop({
        accept: 'item',
        drop: (item) => {
            onDrop(item);
        },
    });

    return (
        <div
            ref={drop}
            style={{
                padding: '20px',
                border: '3px dashed gray',
                borderRadius: '5px',
            }}
        >
            <p>Drop items here</p>
        </div>
    );
};

export default DropZone;
