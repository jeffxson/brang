import React from "react"
import { IoIosArrowBack } from "react-icons/io"
import { useHistory } from "react-router-dom"

export const GoBack = () => {
  const history = useHistory()
  return (
    <IoIosArrowBack
      size={32}
      cursor="pointer"
      onClick={() => {
        history.goBack()
      }}
    />
  )
}

export default GoBack
