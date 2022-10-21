import React, { useState } from "react"
import { Box, Flex, Grid, Heading, Spinner, Text } from "@chakra-ui/react"
import { useEmotionCheck, useSocialScan } from "services/query/featured"
import useCustomToast from "utils/notifications"
import TableLoader from "components/Common/TableLoader"
import GridLayout from "components/Common/GridLayout"
import FinTable from "./FinTable"
import FormSearch from "./FormSearch"
import FinForm from "./FinForm"
import Results from "./Results"

const ThirdLayer = () => {
  const [check, setCheck] = useState()
  const { successToast, errorToast } = useCustomToast()
  const {
    mutate: emotionMutate,
    data: emotion,
    isLoading,
  } = useEmotionCheck({
    onSuccess: () => {
      successToast("Emotion detected")
    },
    onError: () => {
      errorToast("Please try again")
    },
  })
  const {
    mutate: scanMutate,
    data: scanDetails,
    isLoading: isScanning,
  } = useSocialScan({
    onSuccess: () => {
      successToast("Result found")
    },
    onError: () => {
      errorToast("Please try again")
    },
  })
  const [{ username, target_count }, setUserInput] = useState({
    username: "",
    field: "",
  })

  const handleSearch = e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("username", username)
    formData.append("target_count", target_count)
    scanMutate(formData)
  }

  const handleCheck = e => {
    e.preventDefault()
    emotionMutate([
      {
        text: check,
        language: "en",
      },
    ])
  }

  return (
    <Grid
      w={"100%"}
      my={5}
      gap={5}
      templateColumns={[
        "repeat(1,1fr)",
        "repeat(2,1fr)",
        "repeat(3,1fr)",
        "repeat(3,1fr)",
      ]}
      marginBottom="20px"
    >
      <GridLayout title="Social Scanner" colSpan={[3, 3, 3, 2]}>
        <FormSearch
          initOnChange={e =>
            setUserInput({ username: e.target.value, target_count })
          }
          secOnChange={e =>
            setUserInput({ target_count: e.target.value, username })
          }
          username={username}
          target_count={target_count}
          onSubmit={handleSearch}
        />
        {isScanning ? (
          <TableLoader />
        ) : (
          scanDetails?.detected?.map((data, i) => (
            <Box my={5} key={i}>
              <Results data={data} />
              <Box my={5}>
                <Flex mb={5} justifyContent="space-around">
                  <Heading fontSize="15px">META DATA</Heading>
                </Flex>
                <FinTable data={data} />
              </Box>
            </Box>
          ))
        )}
      </GridLayout>
      <GridLayout title="Emotion" colSpan={[3, 3, 3, 1]}>
        <FinForm
          onSubmit={handleCheck}
          check={check}
          onChange={e => setCheck(e.target.value)}
        />
        <Heading my={5} fontSize="15px">
          <Flex gap="2rem">
            <Text>emotion:</Text>
            {isLoading ? (
              <Spinner />
            ) : (
              <Text>
                {emotion?.map(data =>
                  data?.predictions?.map(dat => dat?.prediction)
                )}
              </Text>
            )}
          </Flex>
        </Heading>
      </GridLayout>
    </Grid>
  )
}

export default ThirdLayer
