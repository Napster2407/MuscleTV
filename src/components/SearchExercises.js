import React, {useEffect, useState} from 'react'
import {Box, Button, Stack, TextField,Typography} from '@mui/material';
import {exerciseOptions,fetchData}from '../utility/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';

const SearchExercises = ({setExercises,bodyPart,setBodyPart}) => {
  const [search, setSearch] = useState('');
  // const [exercises, setExercises] = useState([]);
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);

      setBodyParts(['all', ...bodyPartsData]);
    };

    fetchExercisesData();
  }, []); 


  const handleSearch=async()=>{
    if(search){
      // const exercisesData=await fetchData();  //see this function will basically being used to fetch the data
      const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
      const searchedExercises = exercisesData.filter(
        (item) => item.name.toLowerCase().includes(search)
               || item.target.toLowerCase().includes(search)  // these all are for applying on search box
               || item.equipment.toLowerCase().includes(search)
               || item.bodyPart.toLowerCase().includes(search),
      );
      setSearch('');
      setExercises(searchedExercises);

    }
  }
  return (
    // <Stack alignItems="centre" mt="37px" justifyContent="center" p="20px">
    //     <Typography fontWeight={700} sx={{fontSize:{lg:'44px',xs:'30px'}}}
    //     mb="50px" textAlign="center"
    //     >
    //          Some Amazing Exercises to Start With
    //     </Typography>
    //     <Box position="relative" mb="72px">
    //       <TextField
    //       sx={{
    //         input:{fontweight:'700', border:'none',borderRadius:'4px'}
    //       }}
    //          height="76px" value="" onChange={(e)=>{}} placeholder="Search Exercises" type="text"/>
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
    <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="49px" textAlign="center">
    Amazing Exercises You can <br/> start with
    </Typography>
    <Box position="relative" mb="72px">
      <TextField
        height="76px"
        sx={{ input: { fontWeight: '700', border: 'none', borderRadius: '4px' }, width: { lg: '800px', xs: '350px' }, backgroundColor: '#fff', borderRadius: '40px' }}
        value={search}
        onChange={(e)=> setSearch(e.target.value.toLowerCase())}
        placeholder="Search Exercises"
        type="text"
      />
      <Button className="search-btn" sx={{ bgcolor: '#FF2625', color: '#fff', textTransform: 'none', width: { lg: '175px', xs: '80px' }, height: '56px', position: 'absolute', right: '0px', fontSize: { lg: '20px', xs: '14px' } }} onClick={handleSearch}>
          Search
        </Button>
        </Box>
        <Box sx={{position:'relative', width: '100%', p: '20px'}}>
        <HorizontalScrollbar data={bodyParts} bodyPart={bodyPart} setBodyPart={setBodyPart} isBodyParts/>
        </Box>
    </Stack>
  )
}

export default SearchExercises