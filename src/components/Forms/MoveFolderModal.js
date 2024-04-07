import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Select,
  Button,
} from '@chakra-ui/react';
import {
  openMoveModal,
  moveEntity,
  getAllFolders,
} from '../../redux/slices/formActions';
import FormModal from '../FormModal';

const schema = Yup.object().shape({
  path: Yup.string().required('This field is required!'),
});

export default function MoveFolderModal() {
  const { isMoveModalOpened, allFolders, selectedEntry } = useSelector(
    (store) => store.formActions
  );

  useEffect(() => {
    getAllFolders();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const newPath = data.path.concat('/') + selectedEntry.name;
    moveEntity(selectedEntry.path_lower, newPath);
  };

  return (
    <FormModal
      isOpen={isMoveModalOpened}
      onCancel={() => openMoveModal(false)}
      title="Move entry"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {!!allFolders.length && (
          <FormControl isInvalid={errors.path}>
            <FormLabel htmlFor="path">Move {selectedEntry.name} to:</FormLabel>
            <Select
              id="path"
              {...register('path', {
                required: 'This is required',
              })}
            >
              {allFolders.map((folder) => (
                <option key={folder.id} value={folder.path_lower}>
                  {folder.name} ({folder.path_lower})
                </option>
              ))}
            </Select>
            <FormErrorMessage>
              {errors.path && errors.path.message}
            </FormErrorMessage>
          </FormControl>
        )}
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </FormModal>
  );
}
