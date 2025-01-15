"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import AddressForm from "../../components/AddressForm";
import Info from "../../components/Info";
import InfoMobile from "../../components/InfoMobile";
import AppTheme from "../../shared-theme/AppTheme";
import ColorModeIconDropdown from "../../shared-theme/ColorModeIconDropdown";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
export default function PageContent(props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [info, setInfo] = React.useState({});

  const userParams = useMemo(() => {
    return {
      id: searchParams.get("id") || "",
    };
  }, [searchParams]);

  React.useEffect(() => {
    const fetchData = async () => {
      if (userParams.id) {
        let { data: info, error } = await supabase
          .from("info")
          .select("*")
          .eq("id", userParams.id);
        if (error) {
          console.error("Error fetching data:", error);
        } else {
          setInfo(info[0]);
        }
      }
    };
    fetchData();
  }, [userParams.id]);

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box sx={{ position: "fixed", top: "1rem", right: "1rem" }}>
        <ColorModeIconDropdown />
      </Box>
      <Grid
        container
        sx={{
          height: {
            xs: "100%",
            sm: "calc(100dvh - var(--template-frame-height, 0px))",
          },
          mt: {
            xs: 4,
            sm: 0,
          },
        }}
      >
        {/* Left Sidebar */}
        <Grid
          size={{ xs: 12, sm: 5, lg: 4 }}
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            backgroundColor: "background.paper",
            borderRight: { sm: "none", md: "1px solid" },
            borderColor: { sm: "none", md: "divider" },
            alignItems: "start",
            pt: 16,
            px: 10,
            gap: 4,
          }}
        >
          <IconButton onClick={() => router.back()}>
            <ArrowBackIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              width: "100%",
              maxWidth: 500,
            }}
          >
            <Info totalPrice={"$134.98"} edit={false} />
          </Box>
        </Grid>

        {/* Main Content */}
        <Grid
          size={{ sm: 12, md: 7, lg: 8 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "100%",
            width: "100%",
            backgroundColor: { xs: "transparent", sm: "background.default" },
            alignItems: "start",
            pt: { xs: 0, sm: 16 },
            px: { xs: 2, sm: 10 },
            gap: { xs: 4, md: 8 },
          }}
        >
          {/* Info Card (Mobile) */}
          <Card sx={{ display: { xs: "flex", md: "none" }, width: "100%" }}>
            <CardContent
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Typography variant="subtitle2" gutterBottom>
                  {info.name}
                </Typography>
                <Typography variant="body1">{info.email}</Typography>
              </div>
              <InfoMobile totalPrice={info.name} />
            </CardContent>
          </Card>

          {/* Address Form */}
          <AddressForm />
        </Grid>
      </Grid>
    </AppTheme>
  );
}
