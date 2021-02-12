import React, { useState } from 'react'
import { Dimensions, StatusBar } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import Input from './components/Input';
import Task from './components/Task';

const Container = styled.SafeAreaView`
  flex:1;
  background-color:${({theme}) => theme.background};
  align-items:center;
  justify-content:flex-start
`;

const Title = styled.Text`
  font-size:36px;
  font-weight:800;
  color:${({theme}) => theme.main};
  align-self:flex-start;
  margin:10px 20px;
`;

const List = styled.ScrollView`
  flex: 1;
  width:${({width }) => width - 40}px;
`;

export default function App(){
  const width = Dimensions.get('window').width;

  const [newTask, setNewTask] = useState('');

  const [tasks, setTasks] = useState({
    "1":{ id:1, text: "hanbit", completed: false, change: false},
    "2":{ id:2, text: "React Native", completed: false, change: false},
    "3":{ id:3, text: "React Native Sample", completed: false, change: false},
    "4":{ id:4, text: "Edit TODO Item", completed: false, change: false},
  })
  
  const _addTask = () => {
    const ID = Date.now().toString();
    const newTaskObject = {
      [ID]: {id:ID, text:newTask, completed:false},
    };
    setNewTask('');
    setTasks({...tasks,...newTaskObject});
  }

  const _handleTextChnage = text => {
    setNewTask(text);
  }

  const _deleteTask = idx => {
    const deleteTasks = Object.assign({}, tasks);
    delete deleteTasks[idx];
    setTasks(deleteTasks);
  }

  const _toggleTask = idx => {
    const changeTasks = Object.assign({}, tasks);
    changeTasks[idx].completed = changeTasks[idx].completed ? false : true;
    setTasks(changeTasks);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.background}
        />
        <Title>TODO List</Title>
        <Input 
          placeholder="+ Add a Task"
          value={newTask}
          onChangeText={_handleTextChnage}
          onSubmitEditing={_addTask}
        />
        <List width={width}>
          {Object
            .values(tasks)
            .reverse()
            .filter(item => {
              return !item.completed ? true : false;
            })
            .map(function (item){
              return <Task 
                key={item.id} 
                item={item} 
                text={item.text} 
                deleteTask={_deleteTask} 
                toggleTask={_toggleTask} 
              />
            })
          }
        </List>
        <Title>OK List {tasks.length}</Title>
        <List width={width}>
          {Object
            .values(tasks)
            .reverse()
            .filter(item => {
              return item.completed ? true : false;
            })
            .map(function (item){
              return <Task 
                key={item.id} 
                item={item} 
                text={item.text} 
                deleteTask={_deleteTask} 
                toggleTask={_toggleTask} 
              />
            })
          }
        </List>
      </Container>
    </ThemeProvider>
  )
}