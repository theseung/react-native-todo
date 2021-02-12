import React, { useState } from 'react'
import styled from 'styled-components/native';
import PropTypes from 'prop-types'
import IconButton from './IconButton';
import { images } from '../images';
import Input from './Input';

const Container = styled.View`
  flex-direction:row;
  align-items:center;
  background-color:${({theme}) => theme.itemBackground};
  border-radius:10px;
  padding:3px;
  margin:3px 0px;
`;

const Contents = styled.Text`
  flex:1;
  font-size:20px;
  color:${({theme}) => theme.text};
`;

const StyledInput = styled.TextInput.attrs(({theme}) => ({
  placeholderTextColor:theme.main,
}))`
  flex:1;
  font-size:20px;
  color:${({theme}) => theme.text};
`;

const Task = ({ text, item, toggleTask, deleteTask }) => {
  return (
    <Container>
      <IconButton type={item.completed ? images.chked : images.chk} onPressOut={toggleTask} id={item.id} />
      <Contents>{text}</Contents>
      <IconButton type={images.edit}  id={item.id} />
      <IconButton type={images.delete} onPressOut={deleteTask} id={item.id} />
    </Container>
  )
}

Task.propTypes = {
  text:PropTypes.string.isRequired,
  deleteTask:PropTypes.func.isRequired,
  item:PropTypes.object.isRequired,
}

export default Task;