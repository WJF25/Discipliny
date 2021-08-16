import { createContext, useContext, useEffect, useState } from "react";
import api from "../../Services/api";
import { useToast } from "@chakra-ui/react";

const GroupsCardListContext = createContext();

export const GroupsCardsProvider = ({ children }) => {
  const toast = useToast();
  const [groupsCardList, setGroupsCardList] = useState([]);
  const [specificGroup, setSpecificGroup] = useState();
  const [url, setUrl] = useState("https://kabit-api.herokuapp.com/groups/");
  const [prev, setPrev] = useState("");
  const [next, setNext] = useState("");

  const token = JSON.parse(localStorage.getItem("@Discipliny:accessToken"));

  useEffect(() => {
    api
      .get(url)
      .then((res) => {
        setGroupsCardList(res.data.results);
        setPrev(res.data.previous);
        setNext(res.data.next);
      })
      .catch((_) =>
        toast({
          title: "falha ao carregar grupos",
          description: "Não possível encontrar nenhum grupo",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      );
  }, [url]);

  const prevPage = () => {
    if (prev !== null) {
      setUrl(prev);
    }
  };
  const nextPage = () => {
    if (next !== null) {
      setUrl(next);
    }
  };

  const addGroup = (newGroup) => {
    api
      .post("/groups/", newGroup, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setGroupsCardList([...groupsCardList, response.data]);
      })
      .catch((err) => console.log(err));
  };

  const getSpecificGroup = () => {
    const idGroup = JSON.parse(localStorage.getItem("@Discipliny:idGroup"));

    api
      .get(`groups/${idGroup}/`)
      .then((response) => setSpecificGroup(response.data))
      .catch((error) => {
        toast({
          title: "Erro",
          description: "Não possível encontrar este grupo",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

    

  return (
    <GroupsCardListContext.Provider
      value={{
        groupsCardList,
        addGroup,
        prevPage,
        nextPage,
        getSpecificGroup,
        specificGroup,
      }}
    >
      {children}
    </GroupsCardListContext.Provider>
  );
};

export const useGroups = () => useContext(GroupsCardListContext);