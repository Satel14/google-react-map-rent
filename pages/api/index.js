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
        'X-RapidAPI-Key': '7bf45b3a46msh9fbb442825f8690p1a13cejsnab76d182cc2d',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    })
    return data
  } catch (error) {
    console.log(`Fetch data Error: ${error}`)
  }
};