import { useLocation } from 'react-router';
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
import { openUploadModal, uploadFile } from '../../redux/slices/formActions';
import FormModal from '../FormModal';

const schema = Yup.object().shape({
  file: Yup.mixed().required('File is required'),
});

export default function UploadFileModal() {
  const { isUploadModalOpened } = useSelector((store) => store.formActions);
  const { pathname } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const { name } = data.file[0];
    let path;
    if (pathname === '/') {
      path = pathname + name;
    } else {
      path = pathname.concat('/') + name;
    }
    uploadFile(path, data.file[0]);
  };

  return (
    <FormModal
      isOpen={isUploadModalOpened}
      onCancel={() => openUploadModal(false)}
      title="Upload file
      "
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.path}>
          <FormLabel htmlFor="file">File</FormLabel>
          <Input
            id="path"
            type="file"
            {...register('file', {
              required: 'This is required',
            })}
            sx={{ border: 'none' }}
          />
          <FormErrorMessage>
            {errors.file && errors.file.message}
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
