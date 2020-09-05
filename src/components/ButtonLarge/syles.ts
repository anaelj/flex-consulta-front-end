import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #28262e;
  height: 106px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #03b0ef;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  font-size: 24px;
  transition: background-color 0.2s;

  @media (max-width: 800px) {
    flex-direction: line;
    position: relative;
  }

  &:hover {
    background: ${shade(0.2, '#28262e')};
  }
`;
