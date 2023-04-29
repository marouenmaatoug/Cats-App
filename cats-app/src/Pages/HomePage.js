import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BreedContext } from "../context/context";
import { Card, Row, Col, Button, Spinner } from "react-bootstrap";
import styled from "styled-components";
import Banner from "../components/Banner";

const Select = styled.select`
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 16px;
    color: #333;
    margin: 2rem auto;
    width 50%;
    &:focus {
        outline: none;
        border: 2px solid gray;
    }
  
`;
const ViewDetailsButton = styled(Link)`
    text-decoration: none;
    padding-top: 1rem;
    color: gray;

    &:hover {
        text-shadow: 2px 2px 4px #000000;
        color: #1b1b1b;
        transition: all 0.2s ease-in-out;
    }
`;

const LoadMoreButton = styled(Button)`
    background-color: gray;
    border-color: #f5f5f5;
    color: white;
    &:hover {
        background-color: #e6e6e6;
        border-color: #e6e6e6;
        color: #333;
        transition: all 0.2s ease-in-out;
    }
`;
const Container = styled.div`
    margin: 0 auto;
`;
const SpinnerWrapper = styled.div`
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CenteredSpinner = styled(Spinner)`
    position: absolute;
    top: 50%;
    left: 50%;
`;

const HomePage = () => {
    const [breeds, setBreeds] = useState([]);
    const { selectedBreed, setSelectedBreed } = useContext(BreedContext);
    const [cats, setCats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadedCats, setLoadedCats] = useState(4);

    useEffect(() => {
        // Fetch list of breeds from API
        const fetchBreeds = async () => {
            try {
                const response = await axios.get("https://api.thecatapi.com/v1/breeds");
                setBreeds(response.data);
                console.log(response.data);
            } catch (error) {
                alert(
                    "Apologies but we could not load new cats for you at this time! Miau!"
                );
                console.error(error);
            }
        };

        fetchBreeds();
    }, []);

    useEffect(() => {
        // Fetch cats from API
        const fetchCats = async () => {
            setLoading(true);

            try {
                const response = await axios.get(
                    "https://api.thecatapi.com/v1/images/search",
                    {
                        headers: {
                            "x-api-key":
                                "live_tmj5LyKGlDaedEKiITobPIeBSlhstBvjcZ0tWloDB5xwj9lSaYV0k7JhfQEi39YE",
                        },
                        params: {
                            limit: 99,
                            breed_id: selectedBreed,
                        },
                    }
                );
                setCats(response.data);
                console.log(response.data);
                setLoading(false);
            } catch (error) {
                alert(
                    "Apologies but we could not load new cats for you at this time! Miau!"
                );
                console.error(error);
            }
        };
        if (selectedBreed) {
            fetchCats();
        }
    }, [selectedBreed]);

    const handleBreedChange = (event) => {
        setSelectedBreed(event.target.value);
    };
    const handleMoreCats = () => {
        setLoadedCats(loadedCats + 4);
    };
    useEffect(() => {
        setLoadedCats(4);
    }, [selectedBreed]);

    return (
        <Container>
            <Banner />
            <Select value={selectedBreed || ""} onChange={handleBreedChange}>
                <option value="">Select a breed</option>
                {breeds.map((breed) => (
                    <option key={breed.id} value={breed.id}>
                        {breed.name}
                    </option>
                ))}
            </Select>
            {loading ? (
                <SpinnerWrapper>
                    <CenteredSpinner animation="grow" variant="secondary" />
                </SpinnerWrapper>
            ) : (
                <Row style={{ marginBottom: "20px", padding: "1rem 4rem" }}>
                    {cats.slice(0, loadedCats).map((cat) => (
                        <Col
                            key={cat.id}
                            sm={6}
                            lg={4}
                            xl={3}
                            style={{ marginBottom: "20px" }}
                        >
                            <Card className="cat-card" style={{ height: "280px" }}>
                                <Card.Img
                                    className="top"
                                    style={{ height: "80%" }}
                                    src={cat.url}
                                    alt="Cat"
                                />
                                <ViewDetailsButton to={`/singlecat/${cat.id}`}>
                                    View Details
                                </ViewDetailsButton>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            {!loading && cats.length > loadedCats && cats.length > 0 && (
                <LoadMoreButton onClick={handleMoreCats}>Load More</LoadMoreButton>
            )}
        </Container>
    );
};

export default HomePage;
