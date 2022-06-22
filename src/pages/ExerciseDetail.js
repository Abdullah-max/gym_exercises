import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Details from "../components/Details";
import ExerciseVideos from "../components/ExerciseVideos";
import SimilarExercises from "../components/SimilarExercises";
import { exerciseOptions, fetchData, youtubeOptions } from '../utils/fetchData';

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([])
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);

  const { id } = useParams();

  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: 'smooth' })
    const fetchExerciseData = async () => {
      // root url
      const exerciseDburl = 'https://exercisedb.p.rapidapi.com';
      const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com'
      
      // exercise data by id
      const exerciseDetailData = await fetchData(`${exerciseDburl}/exercises/exercise/${id}`, exerciseOptions);
      setExerciseDetail(exerciseDetailData)

      // youtube videos search
      const exerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name} exercise`, youtubeOptions);
      setExerciseVideos(exerciseVideosData.contents);

      // target muscle exercise data
      const targetMuscleExercisesData = await fetchData(`${exerciseDburl}/exercises/target/${exerciseDetailData.target}`, exerciseOptions);
      setTargetMuscleExercises(targetMuscleExercisesData);

      // equipment muscle exercise data
      const equipmentMuscleExercisesData = await fetchData(`${exerciseDburl}/exercises/equipment/${exerciseDetailData.equipment}`, exerciseOptions);
      setEquipmentExercises(equipmentMuscleExercisesData);
    }

    // function call
    fetchExerciseData()

  },[id])
  console.log('exerciseVideos', exerciseVideos)

  if(!exerciseDetail) return <p>No Data</p>;

  return (
    <Box sx={{ mt: {lg: '96px', xs: '60px' } }}>
      <Details exerciseDetail={exerciseDetail} />
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
      <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises} />
    </Box>
  )
}

export default ExerciseDetail