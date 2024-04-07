import PropTypes from 'prop-types';
import { useState } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import { moveEntity, openMoveModal } from '../../redux/slices/formActions';
import FileCard from '../FileCard';
import FolderCard from '../FolderCard';

EntriesList.propTypes = {
  entries: PropTypes.array.isRequired,
  deleteEntity: PropTypes.func,
};

export default function EntriesList({ entries, deleteEntity }) {
  const [entityFrom, setEntytyFrom] = useState('');

  const dragStartHandler = (entity) => {
    setEntytyFrom(entity);
  };
  const dragOverHandler = (e) => {
    e.preventDefault();
  };
  const dropHandler = (e, entity) => {
    e.preventDefault();
    const newPath = entity.path_lower.concat('/') + entityFrom.name;
    moveEntity(entityFrom.path_lower, newPath);
  };

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={6}>
      {entries.map((entry) => (
        <GridItem key={entry.id}>
          {entry['.tag'] === 'folder' ? (
            <FolderCard
              folder={entry}
              deleteEntity={deleteEntity}
              dragOverHandler={dragOverHandler}
              dragStartHandler={dragStartHandler}
              dropHandler={dropHandler}
              openMoveModal={openMoveModal}
            />
          ) : (
            <FileCard
              file={entry}
              deleteEntity={deleteEntity}
              dragStartHandler={dragStartHandler}
              openMoveModal={openMoveModal}
            />
          )}
        </GridItem>
      ))}
    </Grid>
  );
}
