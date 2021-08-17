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
      .catch((error) => console.log(error));
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

  const addGroup = (newGroup, setIsToast) => {
    api
      .post("/groups/", newGroup, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setGroupsCardList([...groupsCardList, response.data]);
        setIsToast("success");
      })
      .catch((_) => setIsToast("error"));
  };

  const getSpecificGroup = () => {
    const idGroup = JSON.parse(localStorage.getItem("@Discipliny:idGroup"));
    console.log(idGroup);

    api
      .get(`groups/${idGroup}/`)
      .then((response) => {
        localStorage.setItem(
          "@Discipliny:groupId",
          JSON.stringify(response.data.id)
        );
        setSpecificGroup(response.data);
      })
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

  const updateGroup = (dados, setIsToast) => {
    const idGroup = JSON.parse(localStorage.getItem("@Discipliny:idGroup"));
    api
      .patch(`/groups/${idGroup}/`, dados, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        getSpecificGroup();
      })
      .catch((_) => {
        setIsToast("error");
      });
  };

  const subscribeToGroup = (setIsToast, idGroupSpec) => {
    console.log(token);
    api
      .post(`/groups/${idGroupSpec}/subscribe/`, null, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        getSpecificGroup();
        setIsToast("success");
      })
      .catch((error) => {
        if (error.response.data.message === "User already on group") {
          setIsToast("already");
        } else {
          setIsToast("error");
        }
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
        updateGroup,
        subscribeToGroup,
      }}
    >
      {children}
    </GroupsCardListContext.Provider>
  );
};

export const useGroups = () => useContext(GroupsCardListContext);
