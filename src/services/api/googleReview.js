import axiosInstance from "services/config"
import axios from "axios"
import { UPDATE_GOOGLE_ID } from "services/url"

let baseURL = "https://api.reviewsmaker.com/gmb/"
const review = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
  },
})

export const getReview = async ({ queryKey }) => {
  const [, placeId] = queryKey
  const res = await review.get(`?placeid=${placeId}`)
  return res.data
}

export const updateGoogleId = async body => {
  const res = await axiosInstance.patch(`${UPDATE_GOOGLE_ID}`, body)
  return res.data
}
