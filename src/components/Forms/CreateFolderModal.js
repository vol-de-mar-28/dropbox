import { useLocation } from 'react-router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react';
import { openFolderModal, createFolder } from '../../redux/slices/formActions';
import FormModal from '../FormModal';
import { fixedPathname } from '../../utils/helpers';

const schema = Yup.object().shape({
  path: Yup.string().required('This field is required!'),
  name: Yup.string().required('This field is required!'),
});

export default function CreateFolderModal() {
  const { isFolderModalOpened } = useSelector((store) => store.formActions);
  const { pathname } = useLocation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setValue('path', fixedPathname(pathname));
  }, [setValue, pathname]);

  const handleChange = (event) => {
    const { value } = event.target;
    setValue('name', value);
    if (pathname === '/') {
      setValue('path', pathname + value);
      return;
    }
    setValue('path', fixedPathname(pathname).concat('/') + value);
  };

  const onSubmit = (data) => {
    createFolder(data.path);
  };

  return (
    <FormModal
      isOpen={isFolderModalOpened}
      onCancel={() => openFolderModal(false)}
      title="Create a folder"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.path}>
          <FormLabel htmlFor="path">Path</FormLabel>
          <Input
            id="path"
            {...register('path', {
              required: 'This is required',
            })}
          />
          <FormErrorMessage>
            {errors.path && errors.path.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            {...register('name', {
              required: 'This is required',
            })}
            onChange={handleChange}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
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
