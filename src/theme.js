import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                transform: "scale(0.85) translateY(-24px)",
                color: "#000000",
                borderRadius: "5px",
              },
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label":
              {
                transform: "scale(0.85) translateY(-24px)",
                color: "#000000",
                borderRadius: "5px",
              },
            label: {
              color: "#C4C4C4",
              top: 0,
              left: 0,
              zIndex: 2,
              position: "absolute",
              backgroundColor: "white",
              pointerEvents: "none",
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: "left top",
            },
          },
        },
      },
    },
    Button: {
      variants: {
        teal: {
          bgColor: "lightMode.teal",
          size: "md",
          color: "lightMode.white",
          fontWeight: "700",
          _hover: {
            bgColor: "lightMode.teal",
          },
          _focus: {
            bgColor: "lightMode.teal",
          },
          _active: {
            bgColor: "lightMode.teal",
          },
        },
        blue: {
          bgColor: "lightMode.blue",
          size: "md",
          color: "lightMode.white",
          fontWeight: "700",
          _hover: {
            bgColor: "lightMode.blue",
          },
          _focus: {
            bgColor: "lightMode.blue",
          },
          _active: {
            bgColor: "lightMode.blue",
          },
        },
      },
    },
  },
  colors: {
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
    darkMode: {
      bgColor: "#18191D",
      wHeaderColor: "#292B2E",
      wBgColor: "#39393D",
      miniWBgColor: "linear-gradient(79.83deg,#335E7D 30.75%, #5789C4 99.86%)",
      moonIcon: "#F2D027",
      black: "#18191D",
      babyBlue: "#97B8F8",
      sidebarBackgroundColor: "#39393D",
    },
    lightMode: {
      headerBgColor: "#F1F1F1",
      white: "#FFFFFF",
      blue: "#336CFB",
      gery3: "#C4C4C4",
      teal: "#17A2B8",
      stepperFont: "#737373",
      sidebarBackgroundColor: "#F5F7FC",
      pageTitle: "#232931",
      dashBoardHeader: "#F1F1F1",
      lightBlue: "#EBF2FF",
    },
  },
})
