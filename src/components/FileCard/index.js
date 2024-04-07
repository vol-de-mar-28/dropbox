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
import {
  HamburgerIcon,
  DeleteIcon,
  DragHandleIcon,
  DownloadIcon,
} from '@chakra-ui/icons';
import { downloadFile } from '../../redux/slices/dashboard';
import img from '../../assets/images/img.png';
import folder from '../../assets/images/folder.png';

const style = {
  padding: '15px',
};

FileCard.propTypes = {
  file: PropTypes.object,
  deleteEntity: PropTypes.func,
  dragStartHandler: PropTypes.func,
  openMoveModal: PropTypes.func,
};

export default function FileCard({
  file,
  deleteEntity,
  dragStartHandler,
  openMoveModal,
}) {
  return (
    <Card
      background="sidebarBg"
      color="fontColor"
      sx={style}
      draggable
      onDragStart={() => dragStartHandler(file)}
    >
      <Tooltip label="Move to another folder">
        <DragHandleIcon sx={{ cursor: 'grab' }} />
      </Tooltip>
      <Flex flexDirection="column" alignItems="center">
        <Image
          src={file['.tag'] === 'folder' ? folder : img}
          alt="Folder"
          h="125px"
        />
        <Text>{file.name}</Text>
      </Flex>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          sx={{ position: 'absolute', right: '10px', top: '10px' }}
        />
        <MenuList color="black">
          <MenuItem
            onClick={() => deleteEntity(file.path_lower)}
            icon={<DeleteIcon />}
          >
            Delete
          </MenuItem>
          <MenuItem
            onClick={() => openMoveModal(true, file)}
            icon={<DragHandleIcon />}
          >
            Move
          </MenuItem>
          <MenuItem
            onClick={() => downloadFile(file.path_lower)}
            icon={<DownloadIcon />}
          >
            Download
          </MenuItem>
        </MenuList>
      </Menu>
    </Card>
  );
}
