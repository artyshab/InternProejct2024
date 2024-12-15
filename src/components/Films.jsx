import { useQuery } from "@apollo/client";
import { GET_FILMS } from "../graphql/queries";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Films() {
  const { loading, error, data } = useQuery(GET_FILMS);
  const { t } = useTranslation(); 

  const [filterDirector, setDirector] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [sortOption, setSortOption] = useState('releaseDate');
  const [currentPage, setCurrentPage] = useState(1); 
  const filmsPerPage = 3; 

  if (loading) return <div className="loader"><div className="spinner"></div></div>;
  if (error) return <p className="error">Error: {error.message}</p>;

  const uniqueYears = Array.from(
    new Set(data.allFilms.films.map((film) => new Date(film.releaseDate).getFullYear()))
  ).sort((a, b) => a - b);

  const filteredData = data.allFilms.films
    .filter((film) => {
      return (
        (filterDirector === "" || film.director.toLowerCase().includes(filterDirector.toLowerCase())) &&
        (filterYear === "" || new Date(film.releaseDate).getFullYear().toString() === filterYear)
      );
    })
    .sort((a, b) => {
      if (sortOption === 'title') return a.title.localeCompare(b.title);
      if (sortOption === 'releaseDate') return new Date(a.releaseDate) - new Date(b.releaseDate);
      return 0;
    });

  const totalFilms = filteredData.length;
  const totalPages = Math.ceil(totalFilms / filmsPerPage);
  const startIndex = (currentPage - 1) * filmsPerPage;
  const endIndex = startIndex + filmsPerPage;
  const filmsToDisplay = filteredData.slice(startIndex, endIndex);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const dateFormat = (releaseDate) => {
    const date = new Date(releaseDate);
    return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(date);
  };

  const handleDirectorChange = (event) => setDirector(event.target.value);
  const handleYearChange = (event) => setFilterYear(event.target.value);
  const handleSortChange = (event) => setSortOption(event.target.value);

  return (
    <div className="container">
      <div className="filter-container">
        <div className="filter-directors">
          <select name="Directors" onChange={handleDirectorChange}>
            <option value="">{t('directors')}</option>
            <option value="George Lucas">{t('georgeLucas')}</option>
            <option value="Irvin Kershner">{t('irvinKershner')}</option>
            <option value="Richard Marquand">{t('richardMarquand')}</option>
          </select>
        </div>

        <div className="filter-date">
          <select name="Releases" onChange={handleYearChange}>
            <option value="">{t('allYears')}</option>
            {uniqueYears.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="sort-container">
          <select name="Sort" onChange={handleSortChange}>
            <option value="releaseDate">{t('releaseDate')}</option>
            <option value="title">{t('title')}</option>
          </select>
        </div>
      </div>

      <div className="films-container">
        {filmsToDisplay.map((film) => (
          <div key={film.episodeID} className="film">
            <img src={`/covers/${film.episodeID}.webp`} alt="Cover-Img" />
            <p>{film.title}</p>
            <p>{film.director}</p>
            <p>{dateFormat(film.releaseDate)}</p>
            <button>{t('readMore')}</button>
          </div>
        ))}
      </div>

      <div className="pagination-container">
        <button onClick={prevPage} disabled={currentPage === 1}>
          {t('previous')}
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          {t('next')}
        </button>
      </div>
    </div>
  );
}
