"use client";

import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragItem from './(components)/DragItem';
import DropZone from './(components)/DropZone';

const Home = () => {
    const initialItems = [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
        { id: 3, name: "Item 3" }
    ];

    const [dragItems, setDragItems] = useState(initialItems);
    const [droppedItems, setDroppedItems] = useState([]);

    const handleDrop = (item) => {
        // Remove the item from dragItems
        setDragItems((prevItems) => prevItems.filter(dragItem => dragItem.name !== item.name));
        
        // Add the item to droppedItems
        setDroppedItems((prevItems) => [...prevItems, item]);
    };

    const handleRemoveItem = (index) => {
        // Get the item to be removed from the droppedItems list
        const removedItem = droppedItems[index];
        
        // Remove the item from droppedItems
        const updatedDroppedItems = [...droppedItems];
        updatedDroppedItems.splice(index, 1);
        setDroppedItems(updatedDroppedItems);

        // Find the original index of the item in initialItems
        const originalIndex = initialItems.findIndex(item => item.name === removedItem.name);
        
        // Add the removed item back to dragItems at its original index
        setDragItems((prevItems) => {
            const updatedDragItems = [...prevItems];
            updatedDragItems.splice(originalIndex, 0, removedItem);
            return updatedDragItems;
        });
    };

    const handleClearDropZone = () => {
        // Move all items from the drop zone back to the drag zone
        const updatedDragItems = [...dragItems, ...droppedItems];
        setDragItems(updatedDragItems);
        setDroppedItems([]);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '30%'
                }}>
                    <div style={{
                        border: '1px solid #ccc',
                        padding: '10px',
                        borderRadius: '5px'
                    }}>
                        <h2 style={{ marginBottom: '10px' }}>Drag Items</h2>
                        {dragItems.map((item) => (
                            <DragItem key={item.id} name={item.name} />
                        ))}
                        {dragItems.length === 0 && <p style={{ marginBottom: '10px' }}>No items to drag</p>}
                    </div>
                    <div style={{
                        border: '1px solid #ccc',
                        padding: '10px',
                        borderRadius: '5px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <h2 style={{ marginBottom: '10px' }}>Drop Zone</h2>
                        <DropZone onDrop={handleDrop} />
                        {droppedItems.map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    border: '1px solid #ccc',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    marginTop: '10px',
                                    backgroundColor: 'lightblue',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: '100%',
                                }}>
                                <p style={{ marginRight: '10px' }}>{item.name}</p>
                                <button
                                  style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: 'red', fontSize: '16px', padding: '0 10px' }}
                                  onClick={() => handleRemoveItem(index)}>
                                    X
                                </button>
                            </div>
                        ))}
                        {droppedItems.length > 1 && (
                            <button
                                style={{
                                    marginTop: '20px',
                                    padding: '5px 10px',
                                    backgroundColor: 'red',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer'
                                }}
                                onClick={handleClearDropZone}
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </DndProvider>
    );
};

export default Home;
