import axios from "axios";
//import { getToken } from "./auth";

const instance = axios.create({
  baseURL: "http://localhost:3000/"
});

// instance.interceptors.request.use(async config => {
//   const token = getToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

const apis ={
  index:(endpoint:string)=>instance.get(endpoint),
  store:(endpoint:string,data: any)=>instance.post(endpoint, data),
  show:(endpoint:string, id:string)=>instance.get(`/${endpoint}/${id}`),
  update:(endpoint:string,  id:string, data:object)=>instance.put(`/${endpoint}/${id}`, data),
  delete:(endpoint:string, id:string)=>instance.delete(`/${endpoint}/${id}`),
}

export default apis
