import React from 'react';
import { List } from 'antd';

const TodoItem = ({ item }) => {
  return (
    <List.Item style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <strong 
        style={{ 
          textDecoration: item.status === '완료' ? 'line-through' : 'none',
          color: item.status === '완료' ? '#999' :'#000', 
          flex: 1
        }}
      >
       {item.title}
      </strong>
      
      {/* 상태 사각형 박스 */}
      <div
        style={{
          display: 'inline-block',
          padding: '5px 10px',
          borderRadius: '4px',
          backgroundColor: 
            item.status === '대기' ? '#f0ad4e' :                                                                                                                              
            item.status === '진행중' ? '#28a745' : 
            item.status === '완료' ? '#5bc0de' : '#ccc',
          color: '#fff',
          fontWeight: 'bold',
          textAlign: 'center',
          textTransform: 'capitalize'
        }}
      >
        {item.status}
      </div>
    </List.Item>
  );
};

export default TodoItem;
