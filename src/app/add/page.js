"use client";
import { useRouter } from "next/navigation";
import * as React from "react";
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
import { useSearchParams } from "next/navigation";
import PageContent from "./PageContent";
export default function Home(props) {
  // const searchParams = useSearchParams();
  // const id = searchParams.get("id") || "";
  // const name = searchParams.get("name") || "";
  // const email = searchParams.get("email") || "";
  // const alamat = searchParams.get("alamat") || "";
  // const nomor_telepon = searchParams.get("nomor_telepon") || "";
  // const tgl_lahir = searchParams.get("tgl_lahir") || "";
  // const kewarganegaraan = searchParams.get("kewarganegaraan") || "";
  // const image = searchParams.get("image") || "";

  // // console.log(id);

  // const router = useRouter();
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <PageContent {...props} />
    </React.Suspense>
  );
}
