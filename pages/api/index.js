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
        'X-RapidAPI-Key': 'c2e6916714msh112ff5aa88df021p1f0a69jsn5f585dc04e69',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    })
    return data
  } catch (error) {
    console.log(`Fetch data Error: ${error}`)
  }
};