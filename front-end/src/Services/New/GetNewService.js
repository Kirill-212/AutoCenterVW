import axios from "axios";
import GetJwtToken from "../Jwt/GetJwtToken";

async function GetNew(pageNumber,pageSize) {
    try {
      const response = await axios.get(`https://localhost:44308/api/news/paged?PageNumber=${pageNumber}&PageSize=${pageSize}`, {
        headers: GetJwtToken(),
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
export default GetNew;



