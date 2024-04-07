import { NavLink as ReactRouterLink } from 'react-router-dom';
import { Box, Image, Center, Link as ChakraLink } from '@chakra-ui/react';
import sidebarLinks from '../../routes/links';
import logo from '../../assets/images/icon.png';

const style = {
  padding: '8px 16px',
  display: 'block',
  '&:hover, &.active': {
    textDecoration: 'none',
    background: '#2d2b29',
  },
};

export default function Sidebar() {
  return (
    <Box w="300px" background="sidebarBg" pt={4} pb={3}>
      <Center mb={4}>
        <Image src={logo} alt="Dropbox" w="50px" />
      </Center>
      {sidebarLinks.map((link) => (
        <ChakraLink
          sx={style}
          as={ReactRouterLink}
          to={link.path}
          key={link.path}
        >
          {link.title}
        </ChakraLink>
      ))}
    </Box>
  );
}
