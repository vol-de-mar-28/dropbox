import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Flex,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Text,
} from '@chakra-ui/react';
import {
  AddIcon,
  InfoIcon,
  QuestionOutlineIcon,
  ChevronDownIcon,
  CopyIcon,
  HamburgerIcon,
  AttachmentIcon,
} from '@chakra-ui/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import { getUser, isTokenExist } from '../../redux/slices/user';
import {
  openFolderModal,
  openUploadModal,
} from '../../redux/slices/formActions';

export default function Header() {
  const { user } = useSelector((store) => store.user);

  useEffect(() => {
    getUser();
  }, []);

  const noFinish = () => {
    toast.warning('Functionality is not yet complete.');
  };

  return (
    <Flex justify="space-between" alignItems="center" mb={5}>
      <Flex>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
          />
          <MenuList color="black">
            <MenuItem onClick={() => openFolderModal(true)} icon={<AddIcon />}>
              Create folder
            </MenuItem>
            <MenuItem
              onClick={() => openUploadModal(true)}
              icon={<AttachmentIcon />}
            >
              Upload file
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      {isTokenExist() ? (
        <Flex justify="space-between" alignItems="center">
          <IconButton
            colorScheme="blue"
            icon={<InfoIcon />}
            mr={2}
            onClick={noFinish}
          />
          <IconButton
            colorScheme="blue"
            icon={<QuestionOutlineIcon />}
            mr={2}
            onClick={noFinish}
          />
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {user?.name.abbreviated_name}
            </MenuButton>
            <MenuList color="black">
              <MenuGroup
                title={
                  <>
                    {user?.name.display_name}
                    <br />
                    {user?.email}
                  </>
                }
              >
                <MenuDivider />
                <MenuItem>
                  <Text mr={3}>Referral link</Text>
                  <CopyToClipboard text={user?.referral_link}>
                    <CopyIcon />
                  </CopyToClipboard>
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </Flex>
      ) : (
        <a href="https://www.dropbox.com/oauth2/authorize?client_id=80kv6b8gx7arko4&redirect_uri=http://localhost:3000/&response_type=token">
          <Button size="sm">Login</Button>
        </a>
      )}
    </Flex>
  );
}
