import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

export default function ConfirmationModal() {
  const { isOpen, title, content, onSubmit, onCancel } = useSelector(
    (state) => state.confirmation
  );
  return (
    <Modal isOpen={isOpen || false} onClose={onCancel}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{content}</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="ghost" onClick={onSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
