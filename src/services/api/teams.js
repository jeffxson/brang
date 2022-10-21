import axios from "axios"
import axiosInstance from "services/config"
import * as API from "../url"
import { INVITE_LOGIN } from "../url"

let BASE_URL = "http://150.230.48.46:8888/"
if (process.env.NODE_ENV !== "production") {
  BASE_URL = "http://150.230.48.46:8888/"
}
export const createTeam = async body => {
  const res = await axiosInstance.post(API.CREATE_TEAM, body)
  return res.data
}

export const sendInvite = async body => {
  const res = await axiosInstance.post(API.SEND_INVITE, body)
  return res.data
}

export const inviteLogin = async body => {
  const res = await axios.post(
    `${BASE_URL}${INVITE_LOGIN}${body.token}/`,
    body.values
  )
  return res.data
}

export const updateTeam = async query => {
  const res = await axiosInstance.put(API.UPDATE_TEAM(query?.id), {
    name: query?.name,
  })
  return res.data
}

export const monitorUser = async body => {
  const res = await axiosInstance.post(API.MONITOR_USER, body)
  return res.data
}

export const deleteTeam = async query => {
  const res = await axiosInstance.delete(API.DELETE_TEAM(query))
  return res.data
}

export const getTeam = async body => {
  const res = await axiosInstance.get(API.CREATE_TEAM, body)
  return res.data
}

export const getTeamDetails = async ({ queryKey }) => {
  const [, id] = queryKey
  const res = await axiosInstance.get(`${API.CREATE_TEAM}${id}`)
  return res.data
}

export const getInvitedList = async ({ queryKey }) => {
  const [, id] = queryKey
  const res = await axiosInstance.get(`${API.GET_INVITED_LIST}${id}`)
  return res.data
}

export const cancelInvitation = async body => {
  const res = await axiosInstance.patch(
    `${API.CANCEL_INVITATION}/${body.id}/`,
    body.status
  )
  return res.data
}

export const deleteTeamMember = async body => {
  const res = await axiosInstance.post(
    `${API.DELETE_TEAM_MEMBER}/${body.id}/${body.member}/`
  )
  return res.data
}
