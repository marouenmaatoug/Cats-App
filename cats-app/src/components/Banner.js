import React from "react";
import { GiHollowCat } from "react-icons/gi";
import styled from "styled-components";

const BannerContainer = styled.div`
    background-color: gray;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const BannerText = styled.span`
    font-size: 22px;
    font-weight: bold;
    margin-right: 10px;
    color: white;
    @media (max-width: 468px) {
        font-size: 16px;
    }
`;

const Banner = () => {
    return (
        <BannerContainer>
            <BannerText>Welcome to your Cat App! Miau!</BannerText>
            <GiHollowCat size={32} />
        </BannerContainer>
    );
};

export default Banner;
