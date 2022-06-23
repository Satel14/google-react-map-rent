import axios from "axios";


const url = 'https://travel-advisor.p.rapidapi.com/hotels/list-in-boundary'



export const getPlacesData = async (type,sw, ne) => {
  try {
    const { data: { data }
    } = await axios.get(`https://travel-advisor.p.rapidapi.com/hotels/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'X-RapidAPI-Key': '3f84126659msh68c058a276b4293p170c10jsna7561b9e1780',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    })
    return data
  } catch (error) {
    console.log(`Fetch data Error: ${error}`)
  }
};