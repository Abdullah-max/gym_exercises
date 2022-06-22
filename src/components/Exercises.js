import { Box, Pagination, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { exerciseOptions, fetchData } from "../utils/fetchData"
import ExerciseCard from "./ExerciseCard"

const Exercises = ({setExercises, exercises, bodyPart}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [exercisePerPage] = useState(6)

  useEffect(()=>{
    const fetchExerciseData = async () => {
      let exercisesData = []
      if(bodyPart === 'all'){
        exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions)
      }else{
        exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseOptions)
      }
      setExercises(exercisesData)
    }
    fetchExerciseData()
  },[bodyPart]);

  // Pagination
  const indexOfLastExercise = currentPage * exercisePerPage;

  const indexOfFirstExercise = indexOfLastExercise - exercisePerPage;

  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise)
  const paginate = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: 'smooth'});

  };
  if(!currentExercises.length) return <p>Loading...</p>

  return (
    <Box
      id='exercises'
      sx={{ mt: { lg: '109px' } }} 
      mt= '50px'
      p='20px'
    >
      <Typography 
        variant="h4"
        fontWeight='bold'
        sx={{ gap: {lg: '44px', xs: '30px' } }}
        mb='46px'
      >
        Showing Results
      </Typography>
      <Stack
        direction='row'
        sx={{gap: { lg: '107px', xs: '50px'} }} 
        flexWrap='wrap' 
        justifyContent='center'
      >
        {currentExercises.map((exercise, idx) => (
          <ExerciseCard key={idx} exercise={exercise} />
        ))}
      </Stack>
      <Stack 
        sx={{mt: {lg: '114px', xs: '70px' } }}
        alignItems='center'
      >
        {exercises.length > 9 &&
          <Pagination
            color='standard'
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisePerPage)}
            page={currentPage}
            onChange={paginate}
            size= 'large'
          />
        }
      </Stack>
    </Box>
  )
}

export default Exercises