import styled from 'styled-components';

import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  align-items: stretch;
`;
export const InputPesquisa = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: -10px;

  div {
    margin: 10px;
  }
  button {
    margin-top: 0px;
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

export const Lista = styled.div`
  .items-grid {
    gap: 16px;
    list-style: none;
    flex: 1;
  }

  .items-grid li {
      
    margin-bottom: 12px;
    cursor: pointer;

    transition: background-color 0.2s;
    transition: border-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#28262e')};
      border-color: #03b0ef;
    }

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      left: 0px;
    }    

    background: #232129;
    border: 2px solid #ff9000;
    height: 90px;
    border-radius: 8px;
    padding: 0px 10px 10px;

    display: flex;
    flex-direction: row;
    align-items: center;

    text-align: left;

    span {
      margin-left: 10px;
      
    }

    cursor: pointer;

  }



  .items-grid li span {

    flex: 1;
    flex-direction: row;
    align-items: left;
    grid-template-columns: repeat(2, 2fr);
    color: var(--title-color);
  }

 
  .items-grid li span {
    flex: 1;
    margin-top: 12px;

    display: flex;
    flex-direction: row;
    align-items: left;
    color: var(--title-color);
  }


`;
