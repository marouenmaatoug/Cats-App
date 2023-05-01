import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import styled from "styled-components";

interface Cat {
    url: string;
    breeds: {
        name: string;
        origin: string;
        temperament: string;
        description: string;
    }[];
}

const StyledCard = styled(Card)`
    width: 25rem;
    text-align: center;
    margin-top: 4rem;
    margin-bottom: 2rem;
    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
`;

const GoBackButton = styled(Link)`
    text-decoration: none;
    background-color: gray;
    border-color: #f5f5f5;
    color: white;
    position: absolute;
    top: 20px;
    left: 20px;
    padding: 0.3rem 1rem;
    border-radius: 0.3rem;
    &:hover {
        background-color: #e6e6e6;
        border-color: #e6e6e6;
        color: #333;
        transition: all 0.2s ease-in-out;
    }
`;

const SingleCatPage: React.FC = () => {
    const [cat, setCat] = useState<Cat>({
        url: "",
        breeds: [],
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch cats from API
        const fetchCat = async () => {
            if (id) {
                try {
                    const response = await axios.get(
                        `https://api.thecatapi.com/v1/images/${id}`,
                        {
                            headers: {
                                "x-api-key":
                                    "live_tmj5LyKGlDaedEKiITobPIeBSlhstBvjcZ0tWloDB5xwj9lSaYV0k7JhfQEi39YE",
                            },
                        }
                    );
                    setCat(response.data);
                    console.log(response.data);
                } catch (error) {
                    alert(
                        "Apologies but we could not load new cats for you at this time! Miau!"
                    );
                    console.error(error);
                }
            }
        };
        fetchCat();
    }, [id]);

    return (
        <div className="d-flex justify-content-center align-items-center h-100">
            <GoBackButton to={"/"} onClick={() => navigate("/")}>
                Go Back
            </GoBackButton>
            <StyledCard>
                <Card.Img variant="top" src={cat.url} style={{ height: "280px" }} />
                <Card.Body>
                    {cat.breeds && cat.breeds.length > 0 && (
                        <>
                            <Card.Title>Breed name: {cat.breeds[0].name}</Card.Title>
                            <Card.Text className="text-muted">
                                Origin: {cat.breeds[0].origin}
                            </Card.Text>
                            <Card.Text>
                                Temperament: {cat.breeds[0].temperament}
                            </Card.Text>
                            <Card.Text>
                                Description: {cat.breeds[0].description}
                            </Card.Text>
                        </>
                    )}
                </Card.Body>
            </StyledCard>
        </div>
    );
};

export default SingleCatPage;
