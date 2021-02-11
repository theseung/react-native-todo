import React from 'react'
import PropTypes from 'prop-types'
import { Dimensions } from 'react-native'
import styled from 'styled-components/native';

const StyledInput = styled.TextInput.attrs(({theme}) => ({
  placeholderTextColor:theme.main,
}))`
  width:${({width}) => width - 40}px;
  height:60px;
  margin:3px 0;
  padding:15px 20px;
  border-radius:10px;
  background-color:${({theme}) => theme.itemBackground};
  font-size:25px;
  color:${({theme}) => theme.text};
`;

const Input = ({placeholder, value, onChangeText, onSubmitEditing}) => {
  const width = Dimensions.get('window').width;

  return (
    <StyledInput 
      width={width} 
      placeholder={placeholder}
      maxLength={50}
      autoCapitlize="none"
      autoCorrent={false}
      returnKeyType="done"
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
    />
  );
}

Input.propTypes = {
  placeholder:PropTypes.string,
  value:PropTypes.string.isRequired,
  onChangeText:PropTypes.func.isRequired,
  onSubmitEditing:PropTypes.func.isRequired
}

export default Input;