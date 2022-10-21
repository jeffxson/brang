import axiosInstance from "services/config"
import * as API from "../url"

export const getTakedownChart = async () => {
  const res = await axiosInstance.get(API.FETCH_TAKEDOWN_CHART)
  const getMonths = res?.data.map(data => data.Month)
  const getUniqueMonths = _.uniqBy(getMonths).reverse()
  const groupByCaseStudy = _.groupBy(res?.data, "case_study")
  return {
    labels: getUniqueMonths,
    caseStudy: groupByCaseStudy,
  }
}

export const getTakedownChartByCategory = async () => {
  const res = await axiosInstance.get(API.FETCH_CATEGORY_TAKEDOWN_CHART)
  const getJobMonths = res?.data[0].job.map(data => data.Month)
  const getDomainMonths = res?.data[1].domain.map(data => data.Month)
  const getDataleakMonths = res?.data[2].dataleak.map(data => data.Month)
  const getJobUniqueMonths = _.uniqBy(getJobMonths).reverse()
  const getDomainUniqueMonths = _.uniqBy(getDomainMonths).reverse()
  const getDataleakUniqueMonths = _.uniqBy(getDataleakMonths).reverse()
  const groupJobByCaseStudy = _.groupBy(res?.data[0].job, "case_study")
  const groupDomainByCaseStudy = _.groupBy(res?.data[1].domain, "case_study")
  const groupDataleakByCaseStudy = _.groupBy(
    res?.data[2].dataleak,
    "case_study"
  )

  return {
    job: {
      labels: getJobUniqueMonths,
      caseStudy: groupJobByCaseStudy,
    },
    domain: {
      labels: getDomainUniqueMonths,
      caseStudy: groupDomainByCaseStudy,
    },
    dataleak: {
      labels: getDataleakUniqueMonths,
      caseStudy: groupDataleakByCaseStudy,
    },
  }
}

export const updateTakedownEmail = async body => {
  const res = await axiosInstance.post(API.UPDATE_TAKEDOWN_MAIL, body)
  return res.data
}

export const getCompanyDetails = async () => {
  const res = await axiosInstance.get(API.GET_COMPANY_DETAILS)
  return res.data
}

export const sendTakedownEmail = async payload => {
  const res = await axiosInstance.post(API.SEND_TAKEDOWN_MAIL, payload)
  return res
}

export const sendAppTakedownEmail = async payload => {
  const res = await axiosInstance.post(API.SEND_APP_TAKEDOWN_MAIL, payload)
  return res
}

export const sendDarkwebTakedownEmail = async payload => {
  const res = await axiosInstance.post(API.SEND_DARKWEB_TAKEDOWN_MAIL, payload)
  return res
}

export const sendImageTakedownEmail = async payload => {
  const res = await axiosInstance.post(API.SEND_IMAGE_TAKEDOWN_MAIL, payload)
  return res
}

export const sendYoutubeTakedownEmail = async payload => {
  const res = await axiosInstance.post(API.SEND_YOUTUBE_TAKEDOWN_MAIL, payload)
  return res
}

export const sendDataLeakTakedownEmail = async payload => {
  const res = await axiosInstance.post(
    API.SEND_DATA_LEAK_TAKEDOWN_MAIL,
    payload
  )
  return res
}

export const sendJobTakedown = async payload => {
  const res = await axiosInstance.post(API.SEND_JOB_TAKEDOWN_MAIL, payload)
  return res.data
}

export const filterTheftEmail = async payload => {
  const res = await axiosInstance.post(API.FILTER_THEFT_EMAIL, payload)
  return res.data
}
