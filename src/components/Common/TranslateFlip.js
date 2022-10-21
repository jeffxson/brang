import React from "react"
import { useTranslation } from "react-i18next"
import { lngs } from "i18n"

const TranslateFlip = () => {
  const { i18n } = useTranslation()

  return (
    <>
      {Object.keys(lngs).map(lng => (
        <button
          key={lng}
          style={{
            fontWeight: i18n.resolvedLanguage === lng ? "bold" : "normal",
          }}
          type="submit"
          onClick={() => i18n.changeLanguage(lng)}
        >
          {lngs[lng].nativeName}
        </button>
      ))}
    </>
  )
}

export default TranslateFlip
