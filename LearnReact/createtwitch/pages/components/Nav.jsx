import styled from "styled-components";
import Logo from "./Logo";

const Navigation = styled.nav`
  display: flex;
  background-color: #18181b;
  align-items: center;
  color: #efeff1;
  height: 3.1rem;
  padding: 0 0.5rem;
`;
const LogoWrapper = styled.a``;
const Categories = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;

  font-family: Roobert, Inter, "Helvetica Neue", Helvetica, Arial, sans-serif;

  li:last-child {
    align-self: flex-end;
  }
`;
const Category = styled.li`
  padding: 0 1.3rem;
`;
const CategoryRef = styled.a`
  font-size: 1.1rem;
  font-weight: 600;
`;
const Separator = styled.div`
  background-color: hsla(0, 0%, 100%, 0.1);
  width: 1px;
  margin: 1rem 0;
`;

const Nav = () => {
  return (
    <Navigation>
      <LogoWrapper href="/">
        <Logo width={40} height={40} />
      </LogoWrapper>
      <Categories>
        <Category>
          <CategoryRef>Browse</CategoryRef>
        </Category>
        <Separator />
        <Category>
          <CategoryRef>Esports</CategoryRef>
        </Category>
        <Category>
          <CategoryRef>Music</CategoryRef>
        </Category>
        <Category>
          <svg
            width="20px"
            height="20px"
            fill="white"
            version="1.1"
            viewBox="0 0 20 20"
            x="0px"
            y="0px"
            class="ScIconSVG-sc-1bgeryd-1 cMQeyU"
          >
            <g>
              <path d="M2 10a2 2 0 114 0 2 2 0 01-4 0zM8 10a2 2 0 114 0 2 2 0 01-4 0zM16 8a2 2 0 100 4 2 2 0 000-4z"></path>
            </g>
          </svg>
        </Category>
      </Categories>
    </Navigation>
  );
};

export default Nav;
