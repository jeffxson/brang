import React from "react"
import {
  Box,
  FormLabel,
  FormControl,
  Input,
  Select,
  useColorMode,
} from "@chakra-ui/react"

export const PriorityFilterForm = props => {
  const { text1, text2, text3, text4, text5, text6, text7, text8 } = props

  return (
    <Box minWidth="180px">
      <FormControl id={text1} mt={4}>
        <FormLabel fontWeight="bold">{text2}</FormLabel>
        <Select onChange={text3} name={text4}>
          <option value="">{text5}</option>
          <option value="high">{text6}</option>
          <option value="medium">{text7}</option>
          <option value="low">{text8}</option>
        </Select>
      </FormControl>
    </Box>
  )
}

export const IncidentFilterForm = props => {
  const { text1, text2, text3, text4, text5, text6, text7, text8 } = props

  return (
    <Box minWidth="180px">
      <FormControl id={text1} mt={4}>
        <FormLabel fontWeight="bold">{text2}</FormLabel>
        <Select onChange={text3} name={text1}>
          <option value="">{text4}</option>
          <option value="phishing">{text5}</option>
          <option value="brand-abuse">{text6}</option>
          <option value="counterfeit">{text7}</option>
          <option value="suspicious">{text8}</option>
        </Select>
      </FormControl>
    </Box>
  )
}

export const DateFilterForm = props => {
  const { colorMode } = useColorMode()
  const { text1, text2, text3, text4 } = props

  return (
    <Box minWidth="180px">
      <FormControl id={text1} mt={4}>
        <FormLabel fontWeight="bold">{text2}</FormLabel>
        <Input
          onChange={text3}
          type={text4}
          name={text1}
          max={new Date().toISOString().split("T")[0]}
          className={`filter-date-input ${colorMode}`}
        />
      </FormControl>
    </Box>
  )
}

export const StatusFilterForm = props => {
  const { text1, text2, text3, text4, text5, text6 } = props

  return (
    <Box minWidth="180px">
      <FormControl id={text1} mt={4}>
        <FormLabel fontWeight="bold">{text2}</FormLabel>
        <Select onChange={text3} name={text1}>
          <option value="">{text4}</option>
          <option value="complete">{text5}</option>
          <option value="processing">{text6}</option>
        </Select>
      </FormControl>
    </Box>
  )
}
