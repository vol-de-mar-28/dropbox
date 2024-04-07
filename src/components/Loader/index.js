import { Flex, Spinner } from '@chakra-ui/react';

const style = {
  position: 'absolute',
  height: 'calc(100% - 70px)',
  width: '100%',
  left: 0,
  top: '70px',
  justifyContent: 'center',
  alignItems: 'center',
};

export default function Loader() {
  return (
    <Flex sx={style} background="dashboardBg">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  );
}
