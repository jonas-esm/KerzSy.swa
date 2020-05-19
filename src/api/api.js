
import axios from "axios";

export async function fetchData(res) {
  // res = await axios("http://127.0.0.1:8000/products");
  res = await axios("https://kerz-sy-api.herokuapp.com/products");

  return res;
}
export async function fetchDat2a(result, error ) {
  
  // axios.get("http://127.0.0.1:8000/products")
  axios.get("https://kerz-sy-api.herokuapp.com/products")

  .then(function (response) {
    // handle success
    result = response
  })
  .catch(function (error) {
    // handle error
    error = error
    console.log(error);
  })}
