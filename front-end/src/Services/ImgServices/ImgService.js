import axios from "axios";

const API_URL = "https://api.cloudinary.com/v1_1/CourseAspCore/image/upload";
class ImageService {
  async uploadImage(image) {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "kker0vet");

    try {
      const response = await axios.post(API_URL, formData);
      console.log(response.data);
      return { url: response.data.url ,height:response.data.height,width:response.data.width};
    } catch (error) {
      console.log(error.response);
    }
  }
}

export default new ImageService();
