import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const QUERY_TAGS = gql`
  {
    tags {
      id
      name
    }
  }
`;

const SidebarStyle = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 6px rgba(47, 83, 151, 0.1);
  border-radius: 6px;
  padding: 16px;
  width: 200px;
  margin: 1em 24px;
  align-self: flex-start;
  position: sticky;
  top: 1em;
`;

function Sidebar() {
  const { loading, error, data } = useQuery(QUERY_TAGS);

  if (error) return <div>Error</div>;

  if (loading) return <div>Loading...</div>;

  return (
    <SidebarStyle>
      <h2>Tags</h2>
      <div>
        {data.tags.map(tag => (
          <div key={tag.id}>* {tag.name}</div>
        ))}
      </div>
    </SidebarStyle>
  );
}

export default Sidebar;
