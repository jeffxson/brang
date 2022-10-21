import { Box, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react"
import GoBack from "components/Common/GoBack"
import TableLoader from "components/Common/TableLoader"
import React from "react"
import { useHistory } from "react-router-dom"
import { useGetWhoIsData } from "services/query/webMonitoring"

const TwistedDnsInside = () => {
  const history = useHistory()

  // queries the endpoint tp get the whoIs data
  const { data: whoIsData, isLoading } = useGetWhoIsData(
    history?.location?.data?.corporate_dns
  )
  const data = whoIsData?.data

  return (
    <Box mb={20}>
      <Flex my={10} align="center">
        <GoBack />
        <Heading>Who Is Data</Heading>
      </Flex>
      <Box
        px={20}
        borderRadius="20px"
        py={10}
        boxShadow="lg"
        bg={useColorModeValue(
          "lightMode.dashBoardHeader",
          "darkMode.wHeaderColor"
        )}
      >
        {isLoading && <TableLoader />}
        {data && (
          <Flex
            flexDirection={["column", "column", "row", "row"]}
            justifyContent="space-between"
          >
            <Box w={["100%", "100%", "50%", "50%"]}>
              <Text>Domain Name : {data?.domain_name}</Text>
              <Text py={2}>Registrar : {data?.registrar}</Text>
              <Text>Who is Server : {data?.whois_server}</Text>
              <Text py={2}>Referral URL : {data?.referral_url}</Text>
              <Text>Created At : {data?.creation_date}</Text>
              <Text py={2}>Updated At : {data?.updated_date}</Text>
              <Text>Expiration Date : {data?.expiration_date}</Text>
              <Text py={2}>Name Servers : {data?.name_servers}</Text>
              <Text>Emails : {data?.emails}</Text>
              <Text py={2}>Dnssec : {data?.dnssec}</Text>
            </Box>

            <Box w={["100%", "100%", "50%", "50%"]} mx={[0, 0, 5, 5]}>
              <Text>Name : {data?.name}</Text>
              <Text py={2}>Org : {data?.org}</Text>
              <Text>Address : {data?.address}</Text>
              <Text py={2}>City : {data?.city}</Text>
              <Text>State : {data?.state}</Text>
              <Text py={2}>Zipcode : {data?.zipcode}</Text>
              <Text>Country : {data?.country}</Text>
              <Text py={2}>Server IP : {data?.server_ip}</Text>
              <Text>IP Address : {data?.ip_address}</Text>
              <Text py={2}>Site Status : {data?.site_status}</Text>
            </Box>
          </Flex>
        )}
      </Box>
    </Box>
  )
}

export default TwistedDnsInside
