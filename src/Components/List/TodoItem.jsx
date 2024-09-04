import React from 'react'

function TodoItem(props) {
    return (
        <div className='todo-item'>
            <h2>{props.item.name}</h2>
            {/* <p>{props.item.desc}</p> */}
            <button onClick={()=>{props.deleteItemCb(props.item.id)}}>Delete</button>
        </div>
    )
}

export default TodoItem
