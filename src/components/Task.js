import React, { useState } from 'react'
import styled from 'styled-components/native';
import PropTypes from 'prop-types'
import IconButton from './IconButton';
import { images } from '../images';

const Container = styled.View`
  flex-direction:row;
  align-items:center;
  background-color:${({theme}) => theme.itemBackground};
  border-radius:10px;
  padding:5px;
  margin:3px 0px;
`;

const Contents = styled.Text`
  flex:1;
  font-size:24px;
  color:${({theme}) => theme.text};
`;

const Task = ({ text }) => {
  const [okImages, setOkImages] = useState(false);

  const _onPressOut = () => {
    setOkImages(!okImages);
  }

  return (
    <Container>
      <IconButton type={okImages ? images.chk : images.chked} onPressOut={_onPressOut} />
      <Contents>{text}</Contents>
      <IconButton type={images.update} />
      <IconButton type={images.delete} />
    </Container>
  )
}

Task.propTypes = {
  text:PropTypes.string.isRequired,
}

export default Task;