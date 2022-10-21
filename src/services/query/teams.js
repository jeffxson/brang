import { useMutation, useQuery } from "react-query"
import {
  cancelInvitation,
  createTeam,
  deleteTeam,
  deleteTeamMember,
  getInvitedList,
  getTeam,
  getTeamDetails,
  inviteLogin,
  monitorUser,
  sendInvite,
  updateTeam,
} from "services/api/teams"
import * as queryKey from "utils/queryKey"

export const useCreateTeam = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(createTeam, {
    mutationKey: queryKey.CREATE_TEAM,
    ...options,
  })
  return { mutate, isLoading, data }
}

export const useMonitorUser = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(monitorUser, {
    mutationKey: queryKey.MONITOR_USER,
    ...options,
  })
  return { mutate, isLoading, data }
}

export const useUpdateTeam = (options = {}) => {
  const { mutate, isLoading } = useMutation(updateTeam, {
    mutationKey: queryKey.EDIT_TEAM,
    ...options,
  })
  return { mutate, isLoading }
}

export const useInviteLogin = (options = {}) => {
  const { mutate, isLoading } = useMutation(inviteLogin, {
    mutationKey: queryKey.INVITE_LOGIN_KEY,
    ...options,
  })
  return { mutate, isLoading }
}

export const useDeleteTeam = (options = {}) => {
  const { mutate, isLoading } = useMutation(deleteTeam, {
    mutationKey: queryKey.DELETE_TEAM,
    ...options,
  })
  return { mutate, isLoading }
}

export const useGetTeam = (options = {}) => {
  const { data, isLoading, refetch } = useQuery([queryKey.GET_TEAM], getTeam, {
    ...options,
  })

  return { data, isLoading, refetch }
}

export const useSendInvite = (options = {}) => {
  const { mutate, isLoading } = useMutation(sendInvite, {
    mutationKey: queryKey.SEND_INVITE,
    ...options,
  })

  return { mutate, isLoading }
}

export const useGetTeamDetails = (id = "", options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    [queryKey.GET_TEAMS, id],
    getTeamDetails,
    { ...options }
  )
  return { data, isLoading, refetch }
}

export const useGetInvitedTeamList = (id, options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    [queryKey.GET_INVITED_LIST, id],
    getInvitedList,
    { ...options }
  )
  return { data, isLoading, refetch }
}

export const useCancelInvitation = (options = {}) => {
  const { mutate, isLoading } = useMutation(cancelInvitation, {
    mutationKey: queryKey.CANCEL_INVITATION,
    ...options,
  })
  return { mutate, isLoading }
}

export const useDeleteTeamsMembers = (options = {}) => {
  const { mutate, isLoading } = useMutation(deleteTeamMember, {
    mutationKey: queryKey.DELETE_TEAM_MEMBER,
    ...options,
  })

  return { mutate, isLoading }
}
