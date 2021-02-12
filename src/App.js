import React, { useState } from 'react'
import { Dimensions, StatusBar } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import Input from './components/Input';
import Task from './components/Task';
import AsyncStorage from '@react-native-community/async-storage';
import AppLoading from 'expo-app-loading';

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
  
  const [isReady, setIsReady] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState({});

  const _saveTasks = async tasks => {
    try{
      await AsyncStorage.setItem('tasks',JSON.stringify(tasks));
      setTasks(tasks);
    }catch (e){
      console.log(e);
    }
  }

  const _loadTasks = async tasks => {
    const loadedTasks = await AsyncStorage.getItem('tasks');
    setTasks(JSON.parse(loadedTasks || '{}'));
  }
  
  const _addTask = () => {
    const ID = Date.now().toString();
    const newTaskObject = {
      [ID]: {id:ID, text:newTask, completed:false},
    };
    setNewTask('');
    _saveTasks({...tasks,...newTaskObject});
  }

  const _handleTextChnage = text => {
    setNewTask(text);
  }

  const _deleteTask = idx => {
    const deleteTasks = Object.assign({}, tasks);
    delete deleteTasks[idx];
    _saveTasks(deleteTasks);
  }

  const _toggleTask = idx => {
    const changeTasks = Object.assign({}, tasks);
    changeTasks[idx].completed = changeTasks[idx].completed ? false : true;
    _saveTasks(changeTasks);
  }

  return isReady ? (
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
  ) : (
    <AppLoading
      startAsync={_loadTasks}
      onFinish={() => setIsReady(true)}
      onError={console.error}
    />
  )
}