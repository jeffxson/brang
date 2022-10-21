import { useEffect, useState } from "react"
import { BRAND_PROTECTION_TOKEN_STORAGE_KEY } from "../config"

const allCapsAlpha = ["ABCDEFGHIJKLMNOPQRSTUVWXYZ"]
const allLowerAlpha = ["abcdefghijklmnopqrstuvwxyz"]
const allUniqueChars = ["~!@#$%^&*()_+-=[]}|<>?"]
const allNumbers = ["0123456789"]

const base = [
  ...allCapsAlpha,
  ...allNumbers,
  ...allLowerAlpha,
  ...allUniqueChars,
]

export const generateUserTokenRaw = len => {
  return [...Array(len)]
    .map(() => base[(Math.random() * base.length) | 0])
    .join("")
}

export const setLocalStorage = (key, payload) => {
  localStorage.setItem(key, JSON.stringify(payload))
}

export const setUserDetails = (key, payload) => {
  localStorage.setItem(key, JSON.stringify(payload))
}

export const getLocalStorage = key => {
  const res = localStorage.getItem(key)
  return res && JSON.parse(res)
}

export const keyy = getLocalStorage(BRAND_PROTECTION_TOKEN_STORAGE_KEY)

export const saveTokenLocalstorage = (key, payload) => {
  // const expiresIn = new Date().getTime() + 60 * 60 * 1000 * 12;
  setLocalStorage(key, payload)
}

export const saveDataLocalstorage = (key, payload) => {
  // const expiresIn = new Date().getTime() + 60 * 60 * 1000 * 12;
  setLocalStorage(key, payload)
}

export const isTokenValid = () => {
  try {
    const token = getLocalStorage(BRAND_PROTECTION_TOKEN_STORAGE_KEY)
    if (!token) {
      return false
    }
    if (!checkTokenExpiry(token)) {
      return false
    }
    return true
  } catch (error) {
    return false
  }
}

export const checkTokenExpiry = token => {
  try {
    const { expiresIn } = token
    const dateInMilliSeconds = new Date().getTime()
    const expiresInMilliseconds = new Date(expiresIn).getTime()

    if (dateInMilliSeconds < expiresInMilliseconds) {
      return true
    }

    return false
  } catch (error) {
    return false
  }
}

export const token =
  getLocalStorage(BRAND_PROTECTION_TOKEN_STORAGE_KEY)?.token || ""

export const formatError = err => {
  let result = Object.entries(err).map(([k, v]) => ({ [k]: v }))
  return result
}

export const handleResponseError = (
  err,
  reporter,
  toast,
  fallbackErrorMessage = "Something went wrong"
) => {
  reporter && reporter()
  let message = ""
  let inputError = ""
  let description = ""
  if (err?.response && err?.response.status < 500) {
    message = err?.response?.data?.details || err?.response?.data?.message
    let non_field_errors = err?.response?.data?.errors?.non_field_errors
    description = Array.isArray(non_field_errors)
      ? non_field_errors?.join(",")
      : non_field_errors?.toString() || ""
  }

  inputError = Object.values(err?.response?.data)[0][0]

  toast({
    title: `${message || inputError || fallbackErrorMessage}`, //wrapped in template string to ensure errors are stringified
    description: description,
    position: "top-right",
    status: "error",
    duration: 2000,
    isClosable: true,
  })
}

//error wrapper for all async function,
//USAGE let catchedFunc = CatchAsyncResponseError(async (args)=>{ ... })
//TODO:-> see how to integrate this with redux handler  ( i.e accounting for dispatch )
export const catchAsyncResponseError =
  (handler, toast, reporter, fallbackErrorMessage = "Something went wrong") =>
  (...args) =>
    handler(...args).catch(err =>
      handleResponseError(err, reporter, toast, fallbackErrorMessage)
    )

export const categoryListOptions = [
  "accomodation & food services",
  "administration",
  "business support",
  "waste management",
  "agriculture",
  "forestry",
  "fishing & hunting",
  "arts",
  "entertainment",
  "construction",
  "education",
  "finance",
  "insurance",
  "healthcare",
  "social assistance",
  "information technology",
  "cybersecurity",
  "manufacturing",
  "mining",
  "scientific & technical services",
  "real estate",
  "rental & leasing",
  "retail trade",
  "transportation",
  "warehousing",
  "utilities",
  "wholesale trade",
  "marketing",
]

export const caseStudyOptions = [
  { name: "Phishing", value: "phishing" },
  { name: "Brand abuse", value: "brand-abuse" },
  { name: "Counterfeit", value: "counterfeit" },
  { name: "Suspicious", value: "suspicious" },
]

export const types = [
  { name: "URL", value: "URL" },
  { name: "DNS_NAME", value: "DNS_NAME" },
  { name: "IP_ADDRESS", value: "IP_ADDRESS" },
  { name: "OPEN_TCP_PORT", value: "OPEN_TCP_PORT" },
  { name: "EMAIL_ADDRESS", value: "EMAIL_ADDRESS" },
]

export const getCaseStudyCounts = arr => {
  return arr?.map(data => data.count).reverse() || []
}

export const formatNews = str => {
  return str?.length > 75 ? str.substring(0, 75) + "..." : str
}
export const trim = str => {
  return str?.length > 45 ? str.substring(0, 45) + "..." : str
}
export const trimID = str => {
  return str?.length > 25 ? str.substring(0, 25) + "..." : str
}

/**
 * we could have extended this to all box components, but then we want to be selective of
 * the box component that takes this scroll bar style
 */
export const scrollBarStyle = {
  "&::-webkit-scrollbar": {
    width: "6px",
    height: "6px",
    borderRadius: "8px",
    backgroundColor: `rgba(0, 0, 0, 0.05)`,
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: `rgba(0, 0, 0, 0.05)`,
  },
}

export const formatDate = (date, fallback = "") => {
  if (!date) return fallback

  return new Date(date).toLocaleString()
}

export const colorComboArray = [
  { id: 1, darkBg: "rgb(130, 0, 8)", whiteBg: "#FEB2B2" },
  { id: 2, darkBg: "rgb(43, 63, 150)", whiteBg: "#90cdf4" },
  { id: 3, darkBg: "rgb(99, 122, 6)", whiteBg: "#9AE6B4" },
  { id: 4, darkBg: "rgb(71, 71, 71)", whiteBg: "rgb(193, 193, 193)" },
  { id: 5, darkBg: "rgb(99, 36, 147)", whiteBg: "rgb(219, 204, 255)" },
]

export const useDebounce = (value, delay) => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(
    () => {
      // Set debouncedValue to value (passed in) after the specified delay
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      // Return a cleanup function that will be called every time ...
      // ... useEffect is re-called. useEffect will only be re-called ...
      // ... if value changes (see the inputs array below).
      // This is how we prevent debouncedValue from changing if value is ...
      // ... changed within the delay period. Timeout gets cleared and restarted.
      // To put it in context, if the user is typing within our app's ...
      // ... search box, we don't want the debouncedValue to update until ...
      // ... they've stopped typing for more than 500ms.
      return () => {
        clearTimeout(handler)
      }
    },
    // Only re-call effect if value changes
    // You could also add the "delay" var to inputs array if you ...
    // ... need to be able to change that dynamically.
    [value]
  )

  return debouncedValue
}

export function isItArabic(string) {
  return !/[^\u0600-\u06FF\u0020-\u0040\u005B-\u0060\u007B-\u007E]/.test(string)
}

export const imageTakedownArray = [
  { id: 1, img: "https://bit.ly/dan-abramov" },
  {
    id: 2,
    img: "https://i.picsum.photos/id/1040/800/800.jpg?hmac=F1loJGIYc_9AvPgYczJdF0_q3KwXFp9u4LbAjDHhZ5Q",
  },
  {
    id: 3,
    img: "https://i.picsum.photos/id/631/900/900.jpg?hmac=alU-1O1bJB8NGxfTr9eGzzCRQ1oIMGnqpXL5shI-Ko0",
  },
]

export function formatTableDate(date) {
  if (!date) return ""
  date = new Date(date)
  let hours = date.getHours()
  let minutes = date.getMinutes()
  const ampm = hours >= 12 ? "pm" : "am"
  hours = hours % 12
  hours = hours ? hours : 12
  minutes = minutes < 10 ? "0" + minutes : minutes
  const strTime = `${hours}:${minutes} ${ampm}`
  return (
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear() +
    "  " +
    strTime
  )
}

export const defaultValues = {
  case_study: "",
  status: "",
  priority: "",
  from_date: "",
  to_date: "",
}

export const priorityOptions = [
  {
    label: "Choose a priority",
    value: "",
  },
  {
    label: "High",
    value: "high",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "Low",
    value: "low",
  },
]

export const fields = [
  // {
  //   label: "ID",
  //   value: "id",
  // },
  {
    label: "Email",
    value: "email",
  },
  // {
  //   label: "IP ADDRESS",
  //   value: "ip_address",
  // },
  // {
  //   label: "Username",
  //   value: "username",
  // },
  {
    label: "Password",
    value: "password",
  },
  // {
  //   label: "Address",
  //   value: "address",
  // },
  // {
  //   label: "Name",
  //   value: "name",
  // },
]

export const emailRegx =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const creditCardRegex =
  /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
