import { useContext, useState } from 'react';
import Button from '../../../../components/Button';
import Modal from '../../../../components/Modal';
import { ONLY_NUMBERS } from '../../../../constants/regexPatterns';
import Bet from '../../../../core/Bet';
import { NUMBERS_OPTION } from '../../../../constants/numbers';
import { GameContext } from '../../../../context/GameContext';
import './styles.css';

type ModalProps = {
  isOpen: boolean;
  handleModal: () => void;
};

interface InputValues {
  name: string;
  cpf: string;
  isLittleSurprise: boolean;
  numbers: number[];
}

interface InvalidValues {
  cpf: boolean | string;
}

const ModalAddBet: React.FC<ModalProps> = ({
  isOpen,
  handleModal,
}: ModalProps) => {
  const [inputValues, setInputValues] = useState<InputValues>({
    name: '',
    cpf: '',
    isLittleSurprise: false,
    numbers: [],
  });
  const [invalidValues, setInvalidValues] = useState<InvalidValues>({
    cpf: false,
  });

  const { game } = useContext(GameContext);

  const handleClose = () => {
    setInputValues({
      name: '',
      cpf: '',
      isLittleSurprise: false,
      numbers: [],
    });
    setInvalidValues({ cpf: false });
    handleModal();
  };

  const handleChange = ({ target }: any) => {
    const { checked, value, name } = target;

    if (name === 'numbers') {
      if (checked) {
        setInputValues((currentValues) => ({
          ...currentValues,
          numbers: [...currentValues.numbers, Number(value)],
        }));

        return;
      }

      setInputValues((currentValues) => ({
        ...currentValues,
        numbers: currentValues.numbers.filter((n) => n !== Number(value)),
      }));

      return;
    }

    if (name === 'littleSurprise') {
      if (checked) {
        setInputValues((currentValues) => ({
          ...currentValues,
          isLittleSurprise: true,
          numbers: [],
        }));

        return;
      }

      setInputValues((currentValues) => ({
        ...currentValues,
        isLittleSurprise: false,
      }));

      return;
    }

    setInputValues((currentValues) => ({ ...currentValues, [name]: value }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const { cpf, name, numbers, isLittleSurprise } = inputValues;

    if (!cpf.match(ONLY_NUMBERS)) {
      setInvalidValues((currentValues) => ({
        ...currentValues,
        cpf: 'CPF Inválido!',
      }));

      return;
    }

    const newBet = new Bet(name, cpf, numbers);

    if (isLittleSurprise) {
      newBet.littleSuprise();
    }

    game?.addNewBet({ ...inputValues });

    handleClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      title="Adicionar Aposta"
    >
      <form className="modal-bet__form" onSubmit={handleSubmit}>
        <h2>Dados do Apostador</h2>
        <fieldset className="modal-bet__player-fieldset">
          <div className="modal-bet__input-container">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={inputValues.name}
            />
          </div>
          <div className="modal-bet__input-container">
            <label htmlFor="cpf">CPF (Apenas números)</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              onChange={handleChange}
              value={inputValues.cpf}
              maxLength={11}
            />
            {invalidValues.cpf && (
              <span style={{ color: 'red' }}>{invalidValues.cpf}</span>
            )}
          </div>
        </fieldset>
        <h2>Escolha o número</h2>
        <div className="modal-bet__littleSurprise-checkbox">
          <input
            type="checkbox"
            name="littleSurprise"
            id="little-surprise"
            onChange={handleChange}
          />
          <label htmlFor="little-surprise">
            Escolha por mim (Modo surpresinha)
          </label>
        </div>
        <fieldset>
          {NUMBERS_OPTION.map((number) => {
            return (
              <div
                className="b-checkbox__container"
                key={`checkbox-number-${number}`}
              >
                <input
                  className="b-checkbox"
                  type="checkbox"
                  name="numbers"
                  id={`n-${number}`}
                  value={number}
                  key={`option-${number}`}
                  checked={inputValues.numbers.includes(number)}
                  onChange={handleChange}
                  disabled={
                    inputValues.isLittleSurprise ||
                    (inputValues.numbers.length === 5 &&
                      !inputValues.numbers.includes(number))
                  }
                />
                <label htmlFor={`n-${number}`}>{number}</label>
              </div>
            );
          })}
        </fieldset>

        <Button
          type="submit"
          variant="secondary"
          disabled={
            (!inputValues.isLittleSurprise &&
              inputValues.numbers.length !== 5) ||
            inputValues.name === '' ||
            inputValues.cpf === ''
          }
        >
          Adicionar
        </Button>
      </form>
    </Modal>
  );
};

export default ModalAddBet;
