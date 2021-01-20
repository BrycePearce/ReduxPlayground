import styled from "styled-components";
import Logo from "./Logo";

const Header = styled.header`
  display: flex;
  background-color: #18181b;
  color: #efeff1;
  height: 50px;
  padding: 0 0.5rem;
`;
const LogoWrapper = styled.a`
  display: flex;
  align-items: center;
`;
const Navigation = styled.nav`
  display: flex;
`;
const Categories = styled.ul`
  display: flex;
  font-family: Roobert, Inter, "Helvetica Neue", Helvetica, Arial, sans-serif;
  list-style: none;
  margin: 0;
  padding: 0;
`;
const Category = styled.li`
  padding: 0 1.3rem;
  &:hover {
    color: #9147ff;
  }
`;
const CategoryRef = styled.a`
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
`;
const CenterLi = styled.li`
  display: flex;
  align-items: center;
`;
const CategoryExpandBtn = styled.button`
  display: flex;
  all: unset;
  margin-top: 0.25rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    color: rgb(239, 239, 241);
  }
`;
const CategoryEllipsis = styled.svg``;
const Nav = () => {
  return (
    <Header>
      <LogoWrapper href="/">
        <Logo width={40} height={40} />
      </LogoWrapper>
      <Navigation>
        <Categories>
          <Category>
            <CategoryRef>Browse</CategoryRef>
          </Category>
          <Category>
            <CategoryRef>Esports</CategoryRef>
          </Category>
          <Category>
            <CategoryRef>Music</CategoryRef>
          </Category>
          <CenterLi>
            <CategoryExpandBtn>
              <CategoryEllipsis
                width="20px"
                height="20px"
                fill="white"
                version="1.1"
                viewBox="0 0 20 20"
                x="0px"
                y="0px"
                className="ScIconSVG-sc-1bgeryd-1 cMQeyU"
              >
                <g>
                  <path d="M2 10a2 2 0 114 0 2 2 0 01-4 0zM8 10a2 2 0 114 0 2 2 0 01-4 0zM16 8a2 2 0 100 4 2 2 0 000-4z"></path>
                </g>
              </CategoryEllipsis>
            </CategoryExpandBtn>
          </CenterLi>
        </Categories>
      </Navigation>
    </Header>
  );
};

export default Nav;
