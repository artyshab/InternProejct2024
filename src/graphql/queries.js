import { gql } from '@apollo/client';

export const GET_FILMS = gql`
query Query {
  allFilms {
    films {
      episodeID
      title
      director
      releaseDate
      producers
    }
  }
}
`;
