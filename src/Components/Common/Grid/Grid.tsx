import React from "react";
import MovieCards from "../../MoviesPage/MovieCards/MovieCards";
import { GridContainer, HeaderTitle } from "./Grid.styled";
import { Flex } from "../../../Styles/CommonStyles/Flex.styled";
import { CreditsState, MovieState } from "../../../Pages/Home";
import ActorCards from "../../MoviesPage/ActorCards/ActorCards";
// import ActorCards from "../../components/MovieDetails/ActorCards/ActorCards";

type IProps = {
  headerTitle?: string;
  movieList?: MovieState[];
  castList?: CreditsState;
};

const Grid: React.FC<IProps> = ({ headerTitle, movieList, castList }) => {
  console.log(movieList);
  return (
    <div>
      {movieList && (
        <>
          <HeaderTitle>{headerTitle}</HeaderTitle>
          <Flex style={{ alignItems: "stretch" }} layout>
            {movieList.length !== 0 &&
              movieList.map((item) => {
                return <MovieCards key={item.id} movie={item} />;
              })}
          </Flex>
        </>
      )}

      {castList && (
        <>
          <HeaderTitle>{headerTitle}</HeaderTitle>
          <GridContainer>
            {castList &&
              castList.cast.map((cast) => {
                return <ActorCards key={cast.id} profile={cast} />;
              })}
          </GridContainer>
        </>
      )}
    </div>
  );
};

export default Grid;
