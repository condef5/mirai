import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

const Wrap = styled.div`
  max-width: 1000px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
`;

const Box = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 6px rgba(47, 83, 151, 0.1);
  border-radius: 6px;
  padding: 16px;
  margin: 1em;
  width: calc(33.3% - 2em);
  box-sizing: border-box;
`;

const Image = styled.img`
  max-width: 100%;
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
`;

export const QUERY_SERIES = gql`
  {
    series {
      id
      image
      name
      tags {
        name
      }
    }
  }
`;

function Series() {
  const { loading, error, data } = useQuery(QUERY_SERIES);

  if (error) return <div>Error</div>;

  if (loading) return <div>Loading...</div>;

  const { series } = data;

  return (
    <Wrap>
      {series.map(serie => (
        <Box key={serie.id}>
          <Image src={serie.image} style={{ maxWidth: "100%" }} alt="" />
          <h2>{serie.name}</h2>
          <div>
            {serie.tags.map(({ name }) => (
              <span key={name}>#{name} </span>
            ))}
          </div>
        </Box>
      ))}
    </Wrap>
  );
}

export default Series;
