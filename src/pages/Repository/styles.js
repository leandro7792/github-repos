import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const Filters = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 20px;
  margin-top: 20px;
  border-top: 1px solid #eee;

  label {
    font-weight: bolder;
  }

  select {
    width: 100px;
    margin-left: 10px;
    background-color: white;
    border: 1px solid #eee;
  }
`;

export const IssueList = styled.ul`
  padding-top: 20px;
  margin-top: 20px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const Paginacao = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;

  button {
    width: 100px;
    height: 30px;
    background-color: #7159c1;
    border: 1px solid #7159c1;
    border-radius: 5%;
    color: white;
    font-weight: bolder;
  }

  span {
    width: 30px;
    height: 30px;
    font-weight: bolder;
    border-bottom: 1px solid #7159c1;
    font-size: 16px;
    color: #7159c1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
