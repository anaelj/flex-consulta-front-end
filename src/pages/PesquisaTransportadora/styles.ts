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
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    list-style: none;
    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }
  }

  .items-grid li {
    background: #f5f5f5;
    border: 2px solid #f5f5f5;
    height: 180px;
    border-radius: 8px;
    padding: 32px 24px 16px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    text-align: center;

    cursor: pointer;

    transition: background-color 0.2s;
    transition: border-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#28262e')};
      border-color: #03b0ef;
    }
  }

  .items-grid li span {
    flex: 1;
    margin-top: 12px;

    display: flex;
    align-items: center;
    color: var(--title-color);
  }

  .items-grid li.selected {
    background: #e1faec;
    border: 2px solid #34cb79;
  }
  .items-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    list-style: none;
  }

  .items-grid li {
    background: #232129;
    border: 2px solid #ff9000;
    height: 180px;
    border-radius: 8px;
    padding: 32px 24px 16px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    text-align: center;

    cursor: pointer;
  }

  .items-grid li span {
    flex: 1;
    margin-top: 12px;

    display: flex;
    align-items: center;
    color: var(--title-color);
  }

  .items-grid li.selected {
    background: #e1faec;
    border: 2px solid #34cb79;
  }
`;
