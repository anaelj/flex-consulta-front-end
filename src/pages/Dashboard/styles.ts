import styled from 'styled-components';

export const Container = styled.div`
  overflow-x: hidden;
  @media (max-width: 800px) {
    max-width: 375px;
  }
`;

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
  @media (max-width: 800px) {
    max-width: 375px;
  }
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }
  @media (max-width: 800px) {
    max-width: 375px;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;
  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }
  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ede8;
    }

    a {
      text-decoration: none;
      color: #ff9000;
      &:hover {
        opacity: 0.8;
      }
    }
  }

  @media (max-width: 800px) {
    max-width: 375px;
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 5px auto;
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 800px) {
    max-width: 375px;
  }
`;
export const ContentLeft = styled.main`
  max-width: 300px;
  margin: 5px -50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 800px) {
    flex-direction: row;
    position: relative;
    max-width: 150px;
    justify-content: space-between;
    margin: 5px 5px;
  }
`;
export const ContentRight = styled.main`
  margin: 5px auto;
  display: flex;
`;
