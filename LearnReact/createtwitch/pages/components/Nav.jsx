import styled from "styled-components";
import Logo from "./Logo";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  background-color: #18181b;
  color: #efeff1;
  height: 50px;
  padding: 0 0.5rem;
  width: 100%;
`;
const Left = styled.div`
  display: flex;
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
  font-size: 0.8rem;
  height: 100%;
  font-weight: 600;
  cursor: pointer;

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;
const RemainingCategories = styled.li`
  display: flex;
  align-items: center;
  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;
const CategoryExpandBtn = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  margin-top: 0.5rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    color: rgb(239, 239, 241);
    border-radius: 5px;
  }
`;
const CategoryEllipsis = styled.svg`
  /* margin-top: 0.5rem; */
`;
const SearchbarWrapper = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    width: 20rem;
    margin: 0 1.3rem;
  }
`;
const Searchbar = styled.input`
  min-width: 10rem;
  width: 100%;
  outline: none;
  box-shadow: none;
  border: none;
  padding: 0.39rem;
  border-radius: 0.5rem 0 0 0.5rem;
  border: 2px solid transparent;
  background-color: #464649;
  color: #efeff1;
  &:focus {
    outline: none;
    border: 2px solid #9147ff;
  }

  &::placeholder {
    color: #c4c4c5;
    font-weight: 500;
  }
`;
const SearchButton = styled.button`
  border: none;
  outline: none;
  border-radius: 0 0.5rem 0.5rem 0;
  background-color: #3a3a3d;
  border-left: 1px solid black;
`;
const SearchSvg = styled.svg``;

const PrimeLoot = styled.div`
  display: flex;
  align-items: center;
`;
const Nav = () => {
  return (
    <Header>
      <Left>
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
            <RemainingCategories>
              <CategoryExpandBtn>
                <CategoryEllipsis
                  width="20px"
                  height="20px"
                  fill="white"
                  version="1.1"
                  viewBox="0 0 20 20"
                  x="0px"
                  y="0px"
                >
                  <g>
                    <path d="M2 10a2 2 0 114 0 2 2 0 01-4 0zM8 10a2 2 0 114 0 2 2 0 01-4 0zM16 8a2 2 0 100 4 2 2 0 000-4z"></path>
                  </g>
                </CategoryEllipsis>
              </CategoryExpandBtn>
            </RemainingCategories>
          </Categories>
        </Navigation>
      </Left>
      <SearchbarWrapper>
        <Searchbar placeholder="Search"></Searchbar>
        <SearchButton>
          <SearchSvg
            width="1.85rem"
            version="1.1"
            viewBox="0 0 20 20"
            fill="#5a5a5c"
            x="0px"
            y="0px"
          >
            <g>
              <path
                fill-rule="evenodd"
                d="M13.192 14.606a7 7 0 111.414-1.414l3.101 3.1-1.414 1.415-3.1-3.1zM14 9A5 5 0 114 9a5 5 0 0110 0z"
                clip-rule="evenodd"
              ></path>
            </g>
          </SearchSvg>
        </SearchButton>
      </SearchbarWrapper>
      <PrimeLoot>
        <svg
          height="2rem"
          version="1.1"
          viewBox="0 0 20 20"
          fill="#efeff1"
          x="0px"
          y="0px"
        >
          <g>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.798 10.456L10 6.657l-3.798 3.799L4 8.805V13h12V8.805l-2.202 1.65zM18 5v8a2 2 0 0 1-2 2H4a2.002 2.002 0 0 1-2-2V5l4 3 4-4 4 4 4-3z"
            ></path>
          </g>
        </svg>
      </PrimeLoot>
    </Header>
  );
};

export default Nav;
