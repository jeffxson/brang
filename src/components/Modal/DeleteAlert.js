import React from "react"
import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react"
import { useTranslation } from "react-i18next"

export const DeleteAlert = ({ isOpen, handleClose, loading, action }) => {
  const { t } = useTranslation()

  return (
    <AlertDialog isOpen={isOpen} onClose={handleClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Remove Link
          </AlertDialogHeader>
          <AlertDialogBody>{t("description.deleteLink")}</AlertDialogBody>
          <AlertDialogFooter>
            <Button disabled={loading} onClick={handleClose}>
              {t("description.cancel")}
            </Button>
            <Button
              isLoading={loading}
              colorScheme="red"
              onClick={action}
              ml={3}
            >
              {t("description.remove")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
