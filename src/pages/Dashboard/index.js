import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAllEntities, deleteEntity } from '../../redux/slices/dashboard';
import EntriesList from '../../components/EntriesList';

export default function Dashboard() {
  const { allEntities } = useSelector((store) => store.dashboard);

  useEffect(() => {
    getAllEntities();
  }, []);

  return (
    !!allEntities?.entries?.length && (
      <EntriesList entries={allEntities.entries} deleteEntity={deleteEntity} />
    )
  );
}
