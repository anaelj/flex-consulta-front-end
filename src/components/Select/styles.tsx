import styled, { css } from 'styled-components';
import ReactSelect from 'react-select';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  display: flex;
  align-items: center;

  border: 2px solid #232129;
  color: #666360;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #ff9000;
      color: #ff9000;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}

    div {
      background: #232129;
      border: 0px;
      color: #f4ede8;
    }

  & + div {
    margin-top: 8px;

  }

 svg {
    margin-right: 16px;
  }
`;
export const CustomSelect = styled(ReactSelect)`
  width: 100%;
  color: #f4ede8;
  border: 0px;

  .control {
    background: 'green';
  }

  input {
    background: #0000ff;
    background-color: #0000ff;
  }

  & .Select__indicator Select__dropdown-indicator {
    border-color: transparent transparent red;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
