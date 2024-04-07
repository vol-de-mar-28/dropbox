import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { fixedPathname } from '../../utils/helpers';

export default function Breadcrumbs() {
  const { pathname } = useLocation();

  const getLink = (key) => {
    const breadcrunmsArr = pathname.split('/');
    breadcrunmsArr.splice(0, 1);
    const { length } = breadcrunmsArr;
    const index = breadcrunmsArr.findIndex((item) => item === key);
    breadcrunmsArr.splice(index + 1, length - index);
    return breadcrunmsArr.join('/');
  };

  const renderDynamicCrumbs = () => {
    const breadcrunmsArr = pathname.split('/');
    breadcrunmsArr.splice(0, 1);
    return breadcrunmsArr.map((b, index) => (
      <BreadcrumbItem key={b}>
        {index === breadcrunmsArr.length - 1 ? (
          <Text>{fixedPathname(b)}</Text>
        ) : (
          <BreadcrumbLink as={Link} to={`/${getLink(b)}`}>
            {fixedPathname(b)}
          </BreadcrumbLink>
        )}
      </BreadcrumbItem>
    ));
  };

  return (
    <Breadcrumb mb={5}>
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to="/">
          Dashboard
        </BreadcrumbLink>
      </BreadcrumbItem>
      {renderDynamicCrumbs()}
    </Breadcrumb>
  );
}
