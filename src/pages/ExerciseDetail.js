import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Details from "../components/Details";
import { exerciseOptions, fetchData } from '../utils/fetchData';

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const { id } = useParams();
  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: 'smooth' })
    const fetchExerciseData = async () => {
      const exerciseDburl = 'https://exercisedb.p.rapidapi.com';

      const exerciseDetailData = await fetchData(`${exerciseDburl}/exercises/exercise/${id}`, exerciseOptions);

      setExerciseDetail(exerciseDetailData)
    }

    fetchExerciseData()
  },[id])

  if(!exerciseDetail) return <p>No Data</p>;

  return (
    <Box sx={{ mt: {lg: '96px', xs: '60px' } }}>
      <Details exerciseDetail={exerciseDetail} />
      
    </Box>
  )
}

export default ExerciseDetail