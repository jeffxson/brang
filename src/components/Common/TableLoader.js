import React from "react"
import { Grid, GridItem, Skeleton } from "@chakra-ui/react"

const TableLoader = ({ col = 6, row = 6 }) => {
  return (
    <Grid templateColumns={"repeat(6, 1fr)"} gap={4}>
      {new Array(col).fill(0).map((_, i) => (
        <GridItem key={i}>
          {new Array(row).fill(0).map((_, i) => (
            <Skeleton key={i} height={"30px"} mb={6}></Skeleton>
          ))}
          <Skeleton height={"30px"}></Skeleton>
        </GridItem>
      ))}
    </Grid>
  )
}
export default TableLoader
