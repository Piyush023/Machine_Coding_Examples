import React, { useState } from 'react';
import TodoItem from './TodoItem';

function TodoList() {
  const initTodo = [
    { id: 0, name: 'Todo-1' },
    { id: 1, name: 'Todo-1' },
  ];
  const [listItems, setListItems] = useState(initTodo);
  const [addItem, setAddItem] = useState();

  const deleteItemCb = (index) => {
    setListItems(listItems.filter((item) => item.id !== index));
  };

  return (
    <div className=''>
      <h1>Todo-List</h1>
      <input
        type='text'
        onChange={(e) => {
          setAddItem({ id: Date.now(), name: e.target.value });
        }}
      />
      <button
        onClick={() => {
          setListItems([...listItems, { ...addItem }]);
        }}
      >
        Add Todo
      </button>
      {listItems.map((item, index) => {
        return <TodoItem item={item} deleteItemCb={deleteItemCb} key={index} />;
      })}
    </div>
  );
}

export default TodoList;
