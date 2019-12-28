import styled from 'styled-components'

export default styled.div`
  font-family: sans-serif;
  border-bottom: 1px solid grey;

  h1 {
    text-align: center;
    color: #222;
    cursor: pointer;
  }

  & > div {
    text-align: center;
  }

  a {
    display: block;
    text-align: center;
    color: #222;
  }

  p {
    width: 500px;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
  }

  form {
    max-width: 500px;
    margin: 10px auto;
    border: 1px solid #ccc;
    padding: 20px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    border-radius: 3px;

    pre {
      border: 1px solid #ccc;
      background: rgba(0, 0, 0, 0.1);
      box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.2);
      padding: 20px;
    }
  }
`
