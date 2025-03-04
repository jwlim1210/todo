import React from 'react';
import { List } from 'antd';
import TodoItem from './TodoItem';

const TodoList = ({ todos }) => {
  return (
    
    <div style={{ marginTop: "20px" }}>
      
      <List
        bordered
        dataSource={todos}
        renderItem={item => <TodoItem item={item} />}
      />
    </div>
  );
};

export default TodoList;
