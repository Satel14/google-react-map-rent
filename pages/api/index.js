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
        'X-RapidAPI-Key': '8ee672dec3msha3db64016e5eb95p1278b0jsnf662340f2934',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    })
    return data
  } catch (error) {
    console.log(`Fetch data Error: ${error}`)
  }
};