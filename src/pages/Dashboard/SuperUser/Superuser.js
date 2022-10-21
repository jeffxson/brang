import React from "react"
import { Box, Flex } from "@chakra-ui/react"
import Doughnut from "components/data/SuperUser/Doughnut"
import AdminList from "components/data/SuperUser/AdminList"

const Superuser = () => {
  return (
    <Box my={2}>
      <Flex flexDirection={["column", "column", "column", "row"]}>
        <AdminList />
        <Doughnut />
      </Flex>
    </Box>
  )
}

export default Superuser
