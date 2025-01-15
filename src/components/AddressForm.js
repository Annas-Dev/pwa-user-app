"use client";
import * as React from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid2";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/system";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, IconButton, MenuItem } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useSearchParams } from "next/navigation";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Select } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Check } from "@mui/icons-material";
import { Alert, AlertTitle } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function AddressForm() {
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("success");
  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [kewarganegaraan, setKewarganegaraan] = React.useState("null");
  const [nama, setNama] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [alamat, setAlamat] = React.useState("");
  const [tanggalLahir, setTanggalLahir] = React.useState(null);
  const [negaraSelected, setNegaraSelected] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [info, setInfo] = React.useState({});
  const router = useRouter();
  const searchParams = useSearchParams();
  const userParams = React.useMemo(() => {
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
          // setInfo(info[0]);
          setNama(info[0].name);
          setEmail(info[0].email);
          setAlamat(info[0].alamat);
          setNumber(info[0].nomor_telepon);
          setTanggalLahir(info[0].tgl_lahir ? dayjs(info[0].tgl_lahir) : null);
          if (info[0].kewarganegaraan === "Indonesia") {
            setKewarganegaraan(0);
          } else {
            setKewarganegaraan(1);
            setNegaraSelected(info[0].kewarganegaraan);
          }
          setImage(info[0].image);
        }
      }
    };
    fetchData();
  }, [userParams.id]);
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result); // Mengatur gambar sebagai URL base64
      };
      reader.readAsDataURL(file);
    }
  };
  const showToaster = (severity, title, message) => {
    setSeverity(severity);
    setTitle(title);
    setMessage(message);
  };

  const submit = async () => {
    setLoading(true);
    const info = {
      name: nama,
      email: email,
      alamat: alamat,
      nomor_telepon: number,
      tgl_lahir: tanggalLahir,
      kewarganegaraan: kewarganegaraan === 0 ? "Indonesia" : negaraSelected,
      image: image,
    };
    const infoUpdate = {
      id: userParams.id,
      name: nama,
      email: email,
      alamat: alamat,
      nomor_telepon: number,
      tgl_lahir: tanggalLahir,
      kewarganegaraan: kewarganegaraan === 0 ? "Indonesia" : negaraSelected,
      image: image,
    };
    if (userParams.id !== "") {
      try {
        const response = await fetch("/api", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(infoUpdate),
        });

        if (!response.ok) {
          showToaster("error", "Error", "Data gagal disimpan");
        } else {
          showToaster("success", "Success", "Data berhasil disimpan");
          router.back();
        }
      } catch (error) {
        showToaster("error", "Error", error.message);
      } finally {
        setLoading(false);
        setOpen(true);
      }
    } else {
      try {
        const response = await fetch("/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(info),
        });

        if (!response.ok) {
          showToaster("error", "Error", "Data gagal disimpan");
        } else {
          showToaster("success", "Success", "Data berhasil disimpan");
          router.back();
        }
      } catch (error) {
        showToaster("error", "Error", error.message);
      } finally {
        setLoading(false);
        setOpen(true);
      }
    }
  };

  const negara = [
    { negara: "Malaysia" },
    { negara: "Singapore" },
    { negara: "Thailand" },
    { negara: "Australia" },
  ];

  return (
    <>
      <Collapse
        in={open}
        sx={{ position: "fixed", top: "1rem", right: "1rem" }}
      >
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          <AlertTitle>{title}</AlertTitle>
          {message}
        </Alert>
      </Collapse>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          width: "100%",
          maxWidth: { sm: "100%", md: 600 },
          maxHeight: "720px",
          gap: { xs: 5, md: "none" },
        }}
      >
        <React.Fragment>
          <form
            onSubmit={(e) => {
              e.preventDefault(), submit();
            }}
          >
            <Grid container spacing={3}>
              <FormGrid size={{ xs: 12 }}>
                <Stack direction="row" spacing={2}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    badgeContent={
                      <>
                        <input
                          accept="image/*"
                          type="file"
                          id="upload-avatar"
                          style={{ display: "none" }}
                          onChange={handleUpload}
                        />
                        <label htmlFor="upload-avatar">
                          <IconButton component="span">
                            <CameraAltIcon />
                          </IconButton>
                        </label>
                      </>
                    }
                  >
                    <Avatar
                      alt={nama}
                      src={image}
                      sx={{ width: 100, height: 100 }}
                    />
                  </Badge>
                </Stack>
              </FormGrid>
              <FormGrid size={{ xs: 12, md: 6 }}>
                <FormLabel htmlFor="full_name" required>
                  Nama lengkap
                </FormLabel>
                <OutlinedInput
                  id="full_name"
                  name="full_name"
                  type="name"
                  placeholder="Your name"
                  autoComplete="Nama lengkap"
                  value={nama}
                  required
                  size="small"
                  onChange={(e) => setNama(e.target.value)}
                />
              </FormGrid>
              <FormGrid size={{ xs: 12, md: 6 }}>
                <FormLabel htmlFor="email" required>
                  Email
                </FormLabel>
                <OutlinedInput
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@gmail.com"
                  autoComplete="Email"
                  value={email}
                  required
                  size="small"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGrid>
              <FormGrid size={{ xs: 12 }}>
                <FormLabel htmlFor="number" required>
                  Nomor telepon
                </FormLabel>
                <OutlinedInput
                  id="number"
                  name="number"
                  type="number"
                  placeholder="Street name and number"
                  autoComplete="shipping address-line1"
                  required
                  value={number}
                  size="small"
                  onChange={(e) => setNumber(e.target.value)}
                />
              </FormGrid>
              <FormGrid size={{ xs: 12 }}>
                <FormLabel htmlFor="alamat" required>
                  Alamat
                </FormLabel>
                <OutlinedInput
                  id="alamat"
                  name="alamat"
                  type="address"
                  placeholder="Jl. Kebon Jeruk No. 1"
                  autoComplete="alamat"
                  required
                  value={alamat}
                  size="small"
                  onChange={(e) => setAlamat(e.target.value)}
                />
              </FormGrid>
              <FormGrid size={{ xs: 6 }}>
                <FormLabel required>Tanggal lahir</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={tanggalLahir}
                    onChange={(newValue) => setTanggalLahir(newValue)}
                    format="YYYY-MM-DD"
                    renderInput={(params) => <OutlinedInput {...params} />}
                  />
                </LocalizationProvider>
              </FormGrid>
              <FormGrid size={{ xs: 6 }}>
                <FormLabel htmlFor="wni" required>
                  Kewarganegaraan
                </FormLabel>
                <Select
                  labelId="wni"
                  id="wni"
                  value={kewarganegaraan}
                  label="Age"
                  onChange={(e) => setKewarganegaraan(e.target.value)}
                >
                  <MenuItem value={0}>WNI</MenuItem>
                  <MenuItem value={1}>WNA</MenuItem>
                </Select>
              </FormGrid>
              {kewarganegaraan === 1 ? (
                <FormGrid size={{ xs: 12 }}>
                  <Autocomplete
                    id="negara"
                    options={negara}
                    getOptionLabel={(option) => option.negara}
                    value={
                      negara.find((n) => n.negara === negaraSelected) || null
                    } // Sinkronisasi nilai
                    onChange={(event, newValue) =>
                      setNegaraSelected(newValue ? newValue.negara : null)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Negara"
                        variant="outlined"
                      />
                    )}
                  />
                </FormGrid>
              ) : null}
            </Grid>
            <Box
              sx={[
                {
                  display: "flex",
                  flexDirection: { xs: "column-reverse", sm: "row" },
                  alignItems: "end",
                  flexGrow: 1,
                  gap: 1,
                  pb: { xs: 12, sm: 0 },
                  mt: { xs: 2, sm: 8 },
                  mb: "60px",
                },
                { justifyContent: "space-between" },
                // activeStep !== 0
                //   ? { justifyContent: "space-between" }
                //   : { justifyContent: "flex-end" },
              ]}
            >
              <Button
                variant="contained"
                endIcon={loading ? <CircularProgress size={16} /> : <Check />}
                type="submit"
                sx={{ width: { xs: "100%", sm: "fit-content" } }}
              >
                Submit
              </Button>
            </Box>
          </form>
        </React.Fragment>
      </Box>
    </>
  );
}
