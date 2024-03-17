import ReactModal from 'react-modal';
import Button from '../Button';
import './styles.css';

type ModalProps = {
  isOpen: boolean;
  title?: string;
  maxWidth?: string;
  children: React.ReactNode;
  onRequestClose: () => void;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  children,
  onRequestClose,
  maxWidth,
  title,
}: ModalProps) => {
  return (
    <ReactModal
      isOpen={isOpen}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={false}
      ariaHideApp={false}
      style={{
        content: { maxWidth: maxWidth },
      }}
    >
      <div className="modalBody">
        <div className="modalHeader">
          {title && <h1>{title}</h1>}
          <Button
            className="modal-close-button"
            onClick={onRequestClose}
            variant="icon"
          >
            <span aria-hidden>X</span>
          </Button>
        </div>
        {children}
      </div>
    </ReactModal>
  );
};

export default Modal;
