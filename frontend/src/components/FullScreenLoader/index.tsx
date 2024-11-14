import React from "react";
import * as Styled from "./styles";

interface FullScreenLoaderProps {
  isLoading: boolean;
}

const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <Styled.Overlay>
      <Styled.Loader />
    </Styled.Overlay>
  );
};

export default FullScreenLoader;
