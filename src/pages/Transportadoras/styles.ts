import styled, { keyframes } from 'styled-components';

import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  margin-top: -50px;
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;
  width: 100%;
  max-width: 700px;
`;

export const DivRadio = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: row;
  place-content: center;
  align-items: center;
  width: 100%;
  max-width: 700px;
  span {
    margin-right: 20px;
    margin-left: 5px;
  }
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromRight} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f3ede8')};
      }
    }
  }
  > a {
    color: #03b0ef;
    display: block;
    margin-top: 0px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#03b0ef')};
    }
  }
`;
