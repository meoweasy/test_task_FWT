import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import styleHome from '../styles/home.module.scss';
import { RootState } from '../app/store';
import ProductList from '../components/productList';
import { setSearchQuery } from '../features/searchSlice';

function Home() {
  const theme = useSelector((state: RootState) => state.theme);

  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.search.query);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const searchStyle = {
    backgroundColor: theme === 'dark' ? '#1A1818' : '#FCFCFC',
    color: theme === 'dark' ? '#575757' : '#9C9C9C',
  };

  useEffect(() => {
    document.title = 'Главная';
  }, []);

  return (
    <div
      className={styleHome.home_body}
      style={{ backgroundColor: theme === 'dark' ? '#121212' : '#FFF' }}
    >
      <div className={styleHome.home_container}>
        <div
          className={styleHome.search}
          style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FCFCFC' }}
        >
          <img
            src={theme === 'dark' ? '/searchW.svg' : '/searchB.svg'}
            alt=""
            style={{ marginLeft: '16px' }}
          />
          <input
            type="text"
            name="search"
            placeholder="Painting title"
            style={searchStyle}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className={styleHome.gallery}>
          <ProductList />
        </div>
      </div>
    </div>
  );
}

export default Home;
