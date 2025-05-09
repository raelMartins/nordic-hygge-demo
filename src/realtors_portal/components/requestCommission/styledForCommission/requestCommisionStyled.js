import styled from '@emotion/styled';

export const RequestWrap = styled.div`
  // position:relative;
  // opacity: 0;
  // pointer-events: none;
  z-index: 77777;
`;
export const Req_Button = styled.button`
  background: transparent;
  border-radius: 12px;
  border: solid 1px white;

  > div {
    display: flex;
    padding: 8px;
    align-items: center;

    span {
      font-size: 14px;
      margin-left: 10px;
      font-weight: 400;
      color: #ffffff;
    }
  }
`;
export const ModalWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  //   z-index: 100000;
  //   background: blue;
`;

export const Req_overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  pointer: cursor;
  background: rgba(0, 0, 0, 0.5);
`;

export const Req_content = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 80px;
  border-radius: 16px;
  max-width: 840px;
  padding: 28px 30px 25px;
  padding-right: 20px;
  padding-left: 20px;
  background: #ffffff;
  //   height: 75vh;
  height: fit-content;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  @media (max-width: 767px) {
    margin: auto 0.5rem;
  }
  //   background: red;
`;
export const Header_wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 22px;
  padding-left: 10px;

  h1 {
    font-weight: 600;
    font-size: 24px;
    color: #191919;
  }
`;
export const Req_body = styled.div`
  display: flex;
  flex-direction: column;
  //   justify-content: center;
  max-height: 65vh;
  padding-right: 10px;
  overflow: auto;
  padding-left: 10px;

  //   background: green;

  &::-webkit-scrollbar {
    width: 10px;
    border-radius: 16px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 16px;

    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 16px;

    background-color: darkgrey;
    // outline: 1px solid slategrey;
  }

  > h2 {
    font-weight: 500;
    font-size: 24px;
    color: #3d3d3d;
    text-align: start;
  }
`;
export const Req_main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  > div {
    position: relative;
  }
`;

export const Input_group = styled.div`
  display: flex;
  position: relative;
  align-items: center;

  > div {
    position: absolute;
    right: 10px;
  }

  input {
    height: 43px;

    background: #f5f5f5;
    width: 100%;
    border: 1px solid #e4e4e4;
    padding: 14px 16px;
    padding-right: 34px;
    border-radius: 12px;
    transition: 0.3s ease-in-out;
    transition-property: border-color;

    ::placeholder {
      color: #919191;
    }

    :focus {
      outline: 3px solid #187bcd;
    }
    :hover {
      border-color: #e0e0e0;
    }

    :-ms-input-placeholder {
      color: #919191;
    }

    ::-ms-input-placeholder {
      color: #919191;
    }
  }
`;

export const Req_form = styled.form`
  margin-top: 41px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 10px;

  input {
    // border-width: 3px;
  }

  input {
    transition: 0.3s ease-in-out;
    transition-property: border-color;

    :focus {
      outline: 3px solid #187bcd;
    }
    :hover {
      border-color: #e0e0e0;
    }
  }
  textarea {
    :focus {
      outline: 3px solid #187bcd;
    }
    :hover {
      border-color: #e0e0e0;
    }
  }
`;
export const Quantity_wrap = styled.div`
  display: flex;
  align-self: start;
  width: 415px;
  align-items: center;
  //   padding: 0px 21px;
  padding: 0;
  // padding-right: 21px;
  position: relative;
  margin-bottom:20px;
  
  >div{
    img{

      pointer-events:cursor;
      z-index:2;

    }

  }

  
  > input {
    padding: 23px 21px;
    // background: red;

    width: 100%;

    border: 1px solid #606060;
    padding: 14px; 21px;
    height:56px;
    border-radius: 8px;


    ::placeholder {
      color: #919191;
    }

    :-ms-input-placeholder {
      color: #919191;
    }

    ::-ms-input-placeholder {
      color: #919191;
    }
  }
  > div {
    position: absolute;
    right: 21px;
    top: 0;
    bottom: 0;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 11px;
  }
`;
export const Input_wrap = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  position:relative;
  
 
 .inputdiv{
  display:flex;
  position:relative;
 flex-direction:column;

 span{
  position:absolute;
  bottom:-17px;
  font-size:11px;
  color:red;
 } 

 .calenderDiv{
  position:absolute;
  right:10px;
  pointer-events:none;
  top:0;
  bottom:0;
  
  margin:0 auto;
  display:flex;
  align-items:center;
}
}
  >div input {
    width: 415px;
    padding: 14px; 21px;
    border-radius: 8px;
    background: transparent;
    // padding: 21px;
    border: 1px solid #606060;


    :nth-of-type(2){
      :hover~div{
        img{
          opacity:0.3;
        }
      }
    }


    ::-webkit-calendar-picker-indicator{
      // display: none;
      background:transparent;
    }
    ::placeholder {
      color: #919191;
    }

    :-ms-input-placeholder {
      color: #919191;
    }

    ::-ms-input-placeholder {
      color: #919191;
    }
  }

 
`;

export const Note_wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;

  > h2 {
    font-weight: 400;
    font-size: 18px;
    align-self: start;
    color: #000000;
  }

  textarea {
    background: transparent;
    height: 170px;
    border: 1px solid #606060;
    border-radius: 8px;
    padding: 16px 21px;
    resize: none;
  }
`;

export const Req_footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;

  button {
    width: 202px;
    height: 55px;

    font-weight: 400;
    font-size: 18px;

    background: transparent;

    border: 1px solid #ff3636;
    border-radius: 12px;

    :nth-of-type(2) {
      width: 223px;
      margin-left: 18px;
      border: none;
      height: 55px;

      background: #7255cb;
      border-radius: 12px;
    }
  }
`;

export const Select = styled.select`
border:1px solid #606060;
width: 100%;
padding: 14px; 21px;
border-radius: 8px;



:focus {
  outline: 3px solid #187bcd;
}
:hover {
  border-color: #e0e0e0;
}

`;
