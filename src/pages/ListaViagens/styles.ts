import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: stretch;
`;

export const ListaViagens = styled.div`
  margin-left: -210px;
  margin-bottom: 20px;
  font-size: 14px;

  h1 {
    font-size: 16px;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    margin-left: 10px;
    margin-bottom: 10px;
    margin-top: 10px;
    padding-right: 5px;
    border: 0px;
    border: 2px solid #ff9000;
    border-radius: 8px;
    div {
      border: 0px;
      margin-bottom: 1px;
      margin-top: 1px;
      display: flex;
      flex-direction: row;
      span {
        font-weight: bold;
        margin-right: 5px;
        margin-left: 5px;
      }
    }
  }
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
