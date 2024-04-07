import PropTypes from 'prop-types';
import { Flex, Box } from '@chakra-ui/react';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  return (
    <Flex
      background="dashboardBg"
      color="fontColor"
      sx={{ minHeight: '100vh' }}
    >
      <Sidebar />
      <Box
        padding={4}
        sx={{ width: 'calc(100% - 300px)', position: 'relative' }}
      >
        <Header />
        {children}
      </Box>
    </Flex>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
