import PropTypes from 'prop-types';
import {
  Flex,
  Text,
  Card,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { HamburgerIcon, DeleteIcon, DragHandleIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import img from '../../assets/images/folder.png';

const style = {
  padding: '15px',
};

FolderCard.propTypes = {
  folder: PropTypes.object,
  deleteEntity: PropTypes.func,
  dragOverHandler: PropTypes.func,
  dragStartHandler: PropTypes.func,
  dropHandler: PropTypes.func,
  openMoveModal: PropTypes.func,
};

export default function FolderCard({
  folder,
  deleteEntity,
  dragOverHandler,
  dragStartHandler,
  dropHandler,
  openMoveModal,
}) {
  return (
    <Card
      background="sidebarBg"
      color="fontColor"
      sx={style}
      draggable
      onDragOver={dragOverHandler}
      onDragStart={() => dragStartHandler(folder)}
      onDrop={(e) => dropHandler(e, folder)}
    >
      <Tooltip label="Move to another folder">
        <DragHandleIcon sx={{ cursor: 'grab' }} />
      </Tooltip>
      <Link to={`${folder.path_lower}`}>
        <Flex flexDirection="column" alignItems="center">
          <Image src={img} alt="Folder" h="125px" />
          <Text>{folder.name}</Text>
        </Flex>
      </Link>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          sx={{ position: 'absolute', right: '10px', top: '10px' }}
        />
        <MenuList color="black">
          <MenuItem
            onClick={() => deleteEntity(folder.path_lower)}
            icon={<DeleteIcon />}
          >
            Delete
          </MenuItem>
          <MenuItem
            onClick={() => openMoveModal(true, folder)}
            icon={<DragHandleIcon />}
          >
            Move
          </MenuItem>
        </MenuList>
      </Menu>
    </Card>
  );
}
