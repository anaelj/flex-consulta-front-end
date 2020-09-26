import styled from 'styled-components';

import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;

  > header {
    height: 144px;
    background: #28262e;

    display: flex;
    align-items: center;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;
    }

    svg {
      color: #999591;
      width: 24px;
      height: 24px;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;
  width: 100%;
  margin: -170px auto 0;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
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
`;

export const Lista = styled.div`
  .items-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    list-style: none;
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
