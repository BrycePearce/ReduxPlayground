import { useState, useEffect } from "react";
import axiosInstance from "../../lib/axios";
import styled from "styled-components";

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
`;

const Frontpage = () => {
  const [featuredStreams, setFeaturedStreams] = useState([]);
  //   useEffect(() => {
  //     const getFeatured = async () => {
  //       const { data } = await axiosInstance.get(
  //         "https://api.twitch.tv/kraken/streams/featured",
  //         {
  //           headers: {
  //             Accept: "application/vnd.twitchtv.v5+json",
  //             "client-ID": process.env.NEXT_PUBLIC_KEY,
  //           },
  //         }
  //       );
  //       setFeaturedStreams(data.featured);
  //     };
  //     getFeatured();
  //   }, []);

  return <Button>{featuredStreams.length}</Button>;
};

export default Frontpage;
