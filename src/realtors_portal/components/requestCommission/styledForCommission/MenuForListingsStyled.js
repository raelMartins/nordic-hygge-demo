import styled from '@emotion/styled';

export const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  p {
    font-size: 12px;
    font-weight: 400;
  }
`;

export const MenuList = styled.div`
  padding: 15px 5px 15px 10px;
  z-index: 1;
  background: #ffffff;
  border-radius: 16px;
  position: absolute;
  top: 50px;
  box-shadow:
    13px 13px 44px #e8e8e8,
    -13px -13px 44px #ffffff;
  width: 100%;
  height: 300px;
`;

export const Scrolled = styled.ul`
  width: 100%;
  height: 275px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 7px;
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
`;

export const ListingComponent = styled.li`
  display: flex;
  align-items: center;
  padding: 7px 0px;
  cursor: pointer;
  transition: ease-in-out 0.4s;
  border-bottom: 2px solid;
  border-image-slice: 1;
  border-bottom-width: 1px;
  border-image-source: linear-gradient(to right, rgba(0, 0, 0, 0), #e9e9e9, rgba(0, 0, 0, 0));

  span {
    font-size: 12px;
    font-weight: 400;
  }
  :hover {
    background: #f5f5f5;
  }
`;
