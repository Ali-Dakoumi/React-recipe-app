import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const Recipe = () => {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=41d6cc3acf59499391f484e40fde05b5`
    );
    const detailData = await data.json();
    console.log(detailData);
    setDetails(detailData);
    console.log(
      detailData.extendedIngredients.map((ingredient) => ingredient.original)
    );
  };

  useEffect(() => {
    fetchDetails(params.name);
  }, []);

  return (
    <DetailWrapper>
      <div>
        <h2> {details.title} </h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <Button
          onClick={() => {
            setActiveTab("instructions");
          }}
          className={activeTab === "instructions" ? "active" : ""}
        >
          Instructions
        </Button>
        <Button
          onClick={() => {
            setActiveTab("ingredients");
          }}
          className={activeTab === "ingredients" ? "active" : ""}
        >
          Ingredients
        </Button>
        {activeTab === "instructions" && (
          <div>
            <Par dangerouslySetInnerHTML={{ __html: `${details.summary} ` }} />
            <Par
              dangerouslySetInnerHTML={{ __html: `${details.instructions} ` }}
            />
          </div>
        )}
        {activeTab === "ingredients" && (
          <ul>
            {details.extendedIngredients.map((ingredient) => {
              return <li key={ingredient.id}> {ingredient.original} </li>;
            })}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
};

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  .active {
    background: gray;
    color: white;
  }
  h2 {
    margn-botoom: 2rem;
  }
  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: gray;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  cursor: pointer;
  width: 8rem;
`;

const Info = styled.div`
  margin-left: 10rem;
`;

const Par = styled.p`
  margin-top: 1rem;
`;

export default Recipe;
