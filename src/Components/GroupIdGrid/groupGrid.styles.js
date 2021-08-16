import styled from "styled-components";

export const Container = styled.div`
  padding-top: 10px;
  max-height: 70%;
  width: 100%;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: var(--blue-dark);
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: var(--blue-light);
    border-radius: 5px;
  }
`;
export const Title = styled.h1`
  width: 100%;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  height: 80px;
  margin: 0 auto;
  text-align: center;
  font-size: 2.5rem;
  color: white;
  font-family: Sansita;
  background-image: linear-gradient(var(--blue-light), var(--blue-dark));
`;
export const GroupTitle = styled.h1`
  font-size: 2rem;
  text-align: center;
  color: white;
  font-family: Sansita;
  background-image: linear-gradient(var(--blue-light), var(--blue-dark));
  border-radius: 40px;
  line-height: 90px;
`;
export const ContainerGoal = styled.div`
  padding-top: 10px;
  max-height: 80%;
  width: 100%;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 10px;
    height: 300px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: var(--blue-dark);
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: var(--blue-light);
    border-radius: 5px;
  }
`;