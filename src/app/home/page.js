"use client";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppTheme from "../../shared-theme/AppTheme";
import ColorModeIconDropdown from "../../shared-theme/ColorModeIconDropdown";
import Box from "@mui/material/Box";
import Highlights from "../../components/Highlights";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MarketingPage(props) {
  const router = useRouter();

  useEffect(() => {
    if (router.query?.showToaster) {
      setShowToast(true);
    }
  }, [router.query]);
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box sx={{ position: "fixed", top: "1rem", right: "1rem" }}>
        <ColorModeIconDropdown />
      </Box>

      <div>
        <Box
          id="highlights"
          sx={{
            pt: { xs: 4, sm: 12 },
            pb: { xs: 8, sm: 16 },
            // color: "white",
            // bgcolor: "grey.900",
          }}
        >
          <Container
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: { xs: 3, sm: 6 },
            }}
          >
            <Box
              sx={{
                width: { sm: "100%", md: "60%" },
                textAlign: { sm: "left", md: "center" },
              }}
            >
              <Typography component="h2" variant="h4" gutterBottom>
                Wellcome
              </Typography>
              <Typography variant="body1" sx={{ color: "grey.400" }}>
                Aplikasi ini di buat untuk menguji kemampuan react teknis dengan
                menggunakan next js, kepada HRD yang terhormat semoha aplikasi
                ini dapat melirik saya dan mempertimbangkan kemampuan saya
              </Typography>
            </Box>
            {/* Search Input */}
            <Highlights />
          </Container>
        </Box>
      </div>
    </AppTheme>
  );
}
