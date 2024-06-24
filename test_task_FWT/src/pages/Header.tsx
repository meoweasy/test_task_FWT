import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import style from '../styles/header.module.scss';
import { RootState, AppDispatch } from '../app/store';
import { setTheme } from '../features/themeSlice';

function Header() {
  const dispatch: AppDispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme);
  const [btn, setBtn] = useState(0);

  const handleButtonClick = () => {
    setBtn(btn === 0 ? 1 : 0);
    dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div
      className={style.header_body}
      style={{ backgroundColor: theme === 'dark' ? '#121212' : '#FFF' }}
    >
      <div className={style.container}>
        <div className={style.logo_FWT}>
          <img
            src={btn === 1 ? './assets/logoB.svg' : './assets/logoW.svg'}
            alt=""
          />
        </div>
        <button
          type="button"
          aria-label="Save"
          className={style.theme_btn}
          onClick={handleButtonClick}
          style={{ backgroundColor: theme === 'dark' ? '#1A1818' : '#FCFCFC' }}
        >
          <img
            src={
              btn === 1 ? './assets/dark_icon.svg' : './assets/light_icon.svg'
            }
            alt=""
          />
        </button>
      </div>
    </div>
  );
}

export default Header;
