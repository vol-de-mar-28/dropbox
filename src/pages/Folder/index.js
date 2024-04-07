import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import {
  getFolderEntities,
  deleteChildEntity,
} from '../../redux/slices/folder';
import Breadcrumbs from '../../components/Breadcrumbs';
import EntriesList from '../../components/EntriesList';
import { fixedPathname } from '../../utils/helpers';

export default function Folder() {
  const { pathname } = useLocation();
  const { folderEntities } = useSelector((store) => store.folder);

  useEffect(() => {
    const path = pathname.includes('%20') ? fixedPathname(pathname) : pathname;
    getFolderEntities(path);
  }, [pathname]);

  return (
    <Box>
      <Breadcrumbs />
      {!!folderEntities?.entries?.length && (
        <EntriesList
          entries={folderEntities.entries}
          deleteEntity={deleteChildEntity}
        />
      )}
    </Box>
  );
}
