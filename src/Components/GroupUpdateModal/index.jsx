import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import {
  ContainerCategory,
  ModalCategory,
  ModalInput,
  ModalTextArea,
  ModalTitle,
} from "../HabitCreateModal/style";

const GroupUpdateModal = () => {
  //"receber como prop o grupa tal"
  const initialRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [name, setName] = useState("nome do grupo pela  prop");
  const [category, setCategory] = useState("Saúde");
  const [description, setDescription] = useState("descricao daora");
  const [categoryChose, setCategoryChose] = useState("healthy");

  const handleSubmit = () => {
    const updateGroup = {
      name: name,
      category: category,
      description: description,
    };
    //chamar funca do provider paara atualizar
  };

  const handleClick = (e, value) => {
    setCategory(e.target.value);
    setCategoryChose(value);
  };
  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalTitle>
          <ModalHeader>Editar Grupo</ModalHeader>
        </ModalTitle>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form>
            <ModalInput
              ref={initialRef}
              placeholder="Digite um novo Grupo"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
            <ModalCategory>
              <p>Em qual categoria se enquadra:</p>
              <ContainerCategory categoryChose={categoryChose}>
                <div className="healthy">
                  <input
                    type="radio"
                    name="category"
                    value="Saúde"
                    id="healthy"
                    onClick={(e) => handleClick(e, e.target.id)}
                  />
                  <label for="healthy">Saúde</label>
                </div>
                <div className="organization">
                  <input
                    type="radio"
                    name="category"
                    value="Organização"
                    id="organization"
                    onClick={(e) => handleClick(e, e.target.id)}
                  />
                  <label for="organization">Organização</label>
                </div>
                <div className="cleaning">
                  <input
                    type="radio"
                    name="category"
                    value="Limpeza"
                    id="cleaning"
                    onClick={(e) => handleClick(e, e.target.id)}
                  />
                  <label for="cleaning">Limpeza</label>
                </div>
                <div className="food">
                  <input
                    type="radio"
                    name="category"
                    value="Alimentação"
                    id="food"
                    onClick={(e) => handleClick(e, e.target.id)}
                  />
                  <label for="food">Alimentação</label>
                </div>
                <div className="education">
                  <input
                    type="radio"
                    name="category"
                    value="Educação"
                    id="education"
                    onClick={(e) => handleClick(e, e.target.id)}
                  />
                  <label for="education">Educação</label>
                </div>
                <div className="finances">
                  <input
                    type="radio"
                    name="category"
                    value="Finanças"
                    id="finances"
                    onClick={(e) => handleClick(e, e.target.id)}
                  />
                  <label for="finances">Finanças</label>
                </div>
                <div className="recreation">
                  <input
                    type="radio"
                    name="category"
                    value="Lazer"
                    id="recreation"
                    onClick={(e) => handleClick(e, e.target.id)}
                  />
                  <label for="recreation">Lazer</label>
                </div>
                <div className="mind">
                  <input
                    type="radio"
                    name="category"
                    value="Mente"
                    id="mind"
                    onClick={(e) => handleClick(e, e.target.id)}
                  />
                  <label for="mind">Mente</label>
                </div>
              </ContainerCategory>
            </ModalCategory>
            <ModalTextArea>
              div{" "}
              <div>
                <label>Uma breve descrição sobre seu grupo:</label>
                <textarea
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  required
                />
              </div>
            </ModalTextArea>
          </form>
        </ModalBody>

        <ModalFooter>
          <button onClick={handleSubmit}>Criar</button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GroupUpdateModal;