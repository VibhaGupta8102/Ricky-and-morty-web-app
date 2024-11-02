import axios from "axios";

const BASE_URL= 'https://rickandmortyapi.com/api';
export const fetchEp= async ()=>{
   const response= await axios.get(`${BASE_URL}/episode`)
   return response.data.results;
}

export const fetchCh = async (episodeId: number) => {
   const response = await axios.get(`${BASE_URL}/episode/${episodeId}`);
   // console.log(response.data.characters)
   return response.data.characters;
 };

//  https://rickandmortyapi.com/api/character/1
