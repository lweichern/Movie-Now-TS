import React from "react";
import { LoadMore, LoadMoreContainer } from "./LoadMoreButton.styled";

type IProps = {
  handlePageIncrement: React.MouseEventHandler<HTMLButtonElement>;
};

const LoadMoreButton: React.FC<IProps> = ({ handlePageIncrement }) => {
  return (
    <LoadMoreContainer>
      <LoadMore
        onClick={handlePageIncrement}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
      >
        Load More
      </LoadMore>
    </LoadMoreContainer>
  );
};

export default LoadMoreButton;
