import React, { useEffect, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

import bodyPart from "../assets/icons/bodyPart.png";

import { exercisesRequestOptions, fetchData } from "../utils/fetchData";

import HorizontalScrollbar from "./HorizontalScrollbar";

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchExercisesBodyPartsData = async () => {
      const bodyPartsData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
        exercisesRequestOptions
      );

      setBodyParts(["all", ...bodyPartsData]);
    };

    fetchExercisesBodyPartsData();
  }, []);

  const filterExercisesBasedOnSearch = (exercisesData) => {
    const searchedExercises = exercisesData.filter(
      (exercise) =>
        exercise.name.toLowerCase().includes(search) ||
        exercise.target.toLowerCase().includes(search) ||
        exercise.bodyPart.toLowerCase().includes(search) ||
        exercise.equipment.toLowerCase().includes(search)
    );

    return searchedExercises;
  };

  const handleSearch = async () => {
    const exercisesData = await fetchData(
      "https://exercisedb.p.rapidapi.com/exercises",
      exercisesRequestOptions
    );

    //Reset search value after API fetch
    setSearch("");

    //Set list of set exercises
    setExercises(filterExercisesBasedOnSearch(exercisesData));
  };

  return (
    <Stack alignItems="center" justify-content="center" mt="37px" p="20px">
      <Typography
        sx={{ fontSize: { lg: "44px", xs: "30px" } }}
        textAlign="center"
        fontWeight="700"
        mb="50px"
      >
        Awesome Exercises You <br /> Should Know
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          sx={{
            input: { fontWeight: "700", border: "none", borderRadius: "4px" },
            width: { lg: "870px", xs: "350px" },
            backgroundColor: "#fff",
            borderRadius: "40px",
          }}
          height="76px"
          value={search}
          placeholder="Search Exercises"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          type="text"
        />
        <Button
          className="search-btn"
          sx={{
            bgcolor: "#FF2625",
            color: "#fff",
            textTransform: "none",
            width: { lg: "175px", xs: "80px" },
            fontSize: { lg: "20px", xs: "14px" },
            height: "56px",
            position: "absolute",
          }}
          onClick={() => handleSearch()}
        >
          Search
        </Button>
      </Box>
      <Box sx={{ width: "100%", p: "20px", position: "relative" }}>
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
        />
      </Box>
    </Stack>
  );
};

export default SearchExercises;
