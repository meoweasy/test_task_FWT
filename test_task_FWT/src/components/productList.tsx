import { useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { useQuery } from 'react-query';
import { RootState } from '../app/store';
import styleList from '../styles/productList.module.scss';
import pagStyle from '../styles/pagination.module.scss';
import {
  fetchPaintings,
  fetchPaintingsAll,
  fetchAuthors,
  fetchLocations,
  Painting,
  Author,
  Location,
} from '../app/api';

function ProductList() {
  const theme = useSelector((state: RootState) => state.theme);
  const searchQuery = useSelector((state: RootState) => state.search.query);

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const { data: paintings } = useQuery<Painting[]>(
    ['paintings', currentPage, searchQuery],
    () => fetchPaintings(currentPage, pageSize, searchQuery),
    { keepPreviousData: true },
  );
  const { data: authors } = useQuery<Author[]>('authors', fetchAuthors);
  const { data: locations } = useQuery<Location[]>('locations', fetchLocations);

  const [imageSrcList, setImageSrcList] = useState<(string | undefined)[]>([]);

  const [isSmallFont, setIsSmallFont] = useState<boolean[]>([]);

  const workerRef = useRef<Worker | null>(null);

  // Установка атрибута для использования в scss
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Загрузка изображений через веб-воркер в отдельном потоке, чтобы не нагружать интерфейс
  useEffect(() => {
    if (!paintings) return undefined;

    if (workerRef.current) {
      workerRef.current.terminate();
    }

    setImageSrcList([]);

    const loadImageWorker = () => {
      const worker = new Worker(
        new URL('../workers/imageLoader.worker.ts', import.meta.url),
      );
      workerRef.current = worker;

      worker.onmessage = (e) => {
        const { result } = e.data;
        setImageSrcList((prevImageSrcList) => [
          ...prevImageSrcList,
          result.blobUrl,
        ]);
      };

      paintings.forEach((painting) => {
        const imageUrl = `https://test-front.framework.team${painting.imageUrl}`;
        worker.postMessage({ src: imageUrl });
      });
    };

    loadImageWorker();

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, [paintings, currentPage]);

  // Подсчет кол-ва страниц на основе кол-ва сущностей картин
  useEffect(() => {
    async function fetchData() {
      try {
        const paintingsData = await fetchPaintingsAll();
        const totalPaintings = paintingsData.length;
        const totalPages1 = Math.ceil(totalPaintings / pageSize);
        setTotalPages(totalPages1);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error fetching paintings:', error);
      }
    }

    fetchData();
  }, []);

  // Установка доп. класса для уменьшения шрифта, если текст выходит больше 3х строк
  useEffect(() => {
    if (paintings) {
      setIsSmallFont(
        paintings.map((_, index) => {
          const titleElement = document.getElementById(`title-${index}`);
          return (
            (titleElement &&
              titleElement.scrollHeight > titleElement.clientHeight) ||
            false
          );
        }),
      );
    }
  }, [paintings]);

  const getAuthorName = (authorId: number) =>
    authors?.find((author) => author.id === authorId)?.name || 'Unknown Author';

  const getLocationName = (locationId: number) =>
    locations?.find((location) => location.id === locationId)?.location ||
    'Unknown Location';

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div>
      {paintings?.length === 0 ? (
        <div className={styleList.placeholder}>
          <div className={styleList.placeholder_title}>
            No matches for {searchQuery}
          </div>
          <div className={styleList.placeholder_subtitle}>
            Please try again with a different spelling or keywords
          </div>
        </div>
      ) : (
        <>
          <div className={styleList.list_container}>
            {paintings?.map((painting, index) => (
              <div className={styleList.wrapper} key={painting.id}>
                <div className={styleList.card}>
                  <img
                    src={imageSrcList[index]}
                    alt={painting.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <div className={styleList.card_desc}>
                  <div className={styleList.border_left}>
                    <div className={styleList.info_one}>
                      <div
                        id={`title-${index}`}
                        className={`${styleList.title_name_card} ${isSmallFont[index] ? styleList.small_font : ''}`}
                      >
                        {painting.name}
                      </div>
                      <div className={styleList.title_year_card}>
                        {painting.created}
                      </div>
                    </div>
                    <div className={styleList.info_two}>
                      <div
                        className={`${styleList.title_author_card} ${isSmallFont[index] ? styleList.small_font : ''}`}
                      >
                        {getAuthorName(painting.authorId)}
                      </div>
                      <div className={styleList.title_local_card}>
                        {getLocationName(painting.locationId)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={pagStyle.pagination}>
            <button
              onClick={handlePreviousPage}
              className={pagStyle.arrow}
              aria-label="Previous Page"
              type="button"
            >
              <img
                src={
                  theme === 'dark' ? '/arrow_icon_W.svg' : '/arrow_icon_B.svg'
                }
                alt=""
                className={pagStyle.arrowIcon}
              />
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                onClick={() => handlePageChange(index + 1)}
                className={`${pagStyle.pag_nav} ${currentPage === index + 1 ? pagStyle.active : ''}`}
                aria-label={`Page ${index + 1}`}
                type="button"
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              className={pagStyle.arrow}
              aria-label="Next Page"
              type="button"
            >
              <img
                src={
                  theme === 'dark' ? '/arrow_icon_W.svg' : '/arrow_icon_B.svg'
                }
                alt=""
                className={pagStyle.arrowIcon}
              />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductList;
