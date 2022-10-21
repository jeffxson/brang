import React, { useState } from "react"
import SettingsLayout from "components/Layouts/SettingsLayout"
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Select,
  FormHelperText,
  Box,
  Tag,
  TagCloseButton,
  TagLabel,
  HStack,
  Text,
  Input,
  InputGroup,
  InputRightAddon,
  Link,
} from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import { useForm } from "react-hook-form"
import { categoryListOptions } from "../../utils/helpers"
import { useTranslation } from "react-i18next"
import {
  useAddCompetitor,
  useGetCompanyCategory,
  useGetUserProfile,
  useUpdateCompanyCategory,
} from "services/query/settings"
import useCustomToast from "utils/notifications"

const CompanySettingsPage = () => {
  const [company_category, setCompanyCat] = useState("")
  const [competitors, setCompetitors] = useState([])
  const { successToast, infoToast } = useCustomToast()

  // queries the endpoint to get company category
  const { data } = useGetCompanyCategory()

  // queries the endpoint to get user details
  const { data: userData, refetch } = useGetUserProfile()

  // queries the endpoint to ypdate the company category
  const { mutate: updateMutate, isLoading } = useUpdateCompanyCategory({
    onSuccess: () => {
      successToast("Company category updated successfully")
    },
  })

  // queries the endpoint to add a competitor website
  const { mutate, isLoading: isAdding } = useAddCompetitor({
    onSuccess: () => {
      refetch()
      successToast("Competitor website added successfully")
    },
  })
  const { t } = useTranslation()

  // update company category
  const handleUpdate = e => {
    e.preventDefault()
    if (!company_category) {
      infoToast("Please select an option")
    } else {
      let values = {
        company_category,
      }
      updateMutate(values)
    }
  }

  const {
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = useForm()

  // add competitor website
  const onSubmit = () => {
    let values = {
      competitor_websites: competitors,
    }
    mutate(values)
  }

  // add the competitor website to compiled list
  const handleAddCompetitor = domain => {
    if (!competitors.map(dom => dom.toLowerCase()).includes(domain)) {
      if (competitors.length <= 3) {
        setCompetitors(prev => [...prev, domain])
        resetField("competitor")
      } else {
        infoToast("There can be a maximum of 4")
      }
    } else {
      infoToast("There can be a maximum of 4")
    }
  }
  // remove competitor website from list
  const handleRemoveCompetitor = domain => {
    setCompetitors(prev => [...prev.filter(dom => dom !== domain)])
  }

  return (
    <SettingsLayout title="Company details">
      <form onSubmit={handleUpdate}>
        <Flex
          flexWrap="wrap"
          columnGap="20px"
          marginBottom="16px"
          alignItems={["center", "center", "center", "center"]}
          justifyContent="space-between"
        >
          <Text minWidth="100px">{t("description.companyCategory")}</Text>
          <FormControl
            w="unset"
            mb={["8px", null, "0"]}
            id="company-category-form-control"
          >
            <Select
              outline="none"
              borderRadius="0"
              borderTop="none"
              borderLeft="none"
              borderRight="none"
              placeholder={"Company category"}
              value={company_category || data?.company_category}
              _focus={{ boxShadow: "none" }}
              onChange={e => setCompanyCat(e.target.value)}
            >
              {categoryListOptions?.map((category, index) => {
                return (
                  <option value={category} key={index}>
                    {category}
                  </option>
                )
              })}
            </Select>
          </FormControl>
          <Button
            w="70px"
            type="submit"
            isLoading={isLoading}
            variant={isLoading ? "solid" : "teal"}
            spinnerPlacement={isLoading && "start"}
          >
            {t("description.save")}
          </Button>
        </Flex>
      </form>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          variant="floating"
          id="competitot"
          mb={7}
          mt={3}
          isInvalid={errors.competitor}
        >
          <Flex justifyContent="space-between">
            <Text>{t("description.competitorSite")}</Text>
            <Box>
              <Box></Box>
              <InputGroup size="md">
                <Input
                  {...register("competitor")}
                  type="text"
                  w="100%"
                  placeholder="competitor.com"
                  borderRadius="10px"
                />
                {watch("competitor") && (
                  <InputRightAddon
                    onChange={e => setCompetitors(e.target.value)}
                    onClick={() => handleAddCompetitor(watch("competitor"))}
                    bgColor="lightMode.white"
                  >
                    <AddIcon />
                  </InputRightAddon>
                )}
              </InputGroup>
              <Box mt={2}>
                <HStack maxWidth={"full"} gap={2} wrap="wrap">
                  {competitors?.map((domain, idx) => (
                    <Tag
                      size={"sm"}
                      key={idx}
                      variant="solid"
                      colorScheme="teal"
                      borderRadius="full"
                    >
                      <TagLabel>{domain}</TagLabel>
                      <TagCloseButton
                        onClick={() => handleRemoveCompetitor(domain)}
                      />
                    </Tag>
                  ))}
                </HStack>
              </Box>
              <FormHelperText fontWeight={400} color="lightMode.stepperFont">
                Up to 4
              </FormHelperText>
              <FormErrorMessage>
                {" "}
                {errors.competitor && errors.competitor.message}{" "}
              </FormErrorMessage>
            </Box>
            <Button
              type="submit"
              variant={isAdding ? "solid" : "teal"}
              spinnerPlacement={isAdding && "start"}
              isLoading={isAdding}
            >
              {t("description.save")}
            </Button>
          </Flex>
        </FormControl>
      </form>
      <Box>
        <Box as="h3" fontSize="24px">
          Competitor List
        </Box>
        <Box>
          {userData?.competitor_websites?.map((item, i) => (
            <Link
              key={i}
              href={`${item.startsWith("http") ? item : `https://${item}`}`}
              d="block"
              isExternal
            >
              {item}
            </Link>
          ))}
        </Box>
      </Box>
    </SettingsLayout>
  )
}

export default CompanySettingsPage
