"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import { Collapse } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AlertTitle from "@mui/material/AlertTitle";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";
import Alert from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { useRouter } from "next/navigation";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FormLabel } from "@mui/material";
import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Select } from "@mui/material";

export default function Highlights() {
  const [showToast, setShowToast] = React.useState(false);
  const [severity, setSeverity] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [info, setInfo] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [loadingDelete, setLoadingDelete] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const [kewarganegaraanFilter, setKewarganegaraanFilter] =
    React.useState("All");
  const [tanggalLahirFilter, setTanggalLahirFilter] = React.useState(null);
  const [sortByFilter, setSortByFilter] = React.useState("nama");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const router = useRouter();
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const { info } = await response.json();
      setInfo(info);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (id) => {
    setId(id);
    setOpen(true);
  };
  const showToaster = (severity, title, message) => {
    setSeverity(severity);
    setTitle(title);
    setMessage(message);
  };
  const handleEdit = (item) => {
    const id = {
      id: item.id,
      name: item.name,
      email: item.email,
      alamat: item.alamat,
      nomor_telepon: item.nomor_telepon,
      tgl_lahir: item.tgl_lahir,
      kewarganegaraan: item.kewarganegaraan,
      image: item.image,
    };
    const query = new URLSearchParams(id).toString();
    router.push(`/add?${query}`);
  };
  const handleDelete = async (idx) => {
    setLoadingDelete(true);
    const id = {
      id: idx,
    };
    try {
      const response = await fetch("/api", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      });

      if (!response.ok) {
        showToaster("error", "Error", "Data gagal dihapus");
      } else {
        showToaster("success", "Success", "Data berhasil dihapus");
      }
    } catch (error) {
      showToaster("error", "Error", error.message);
    } finally {
      setShowToast(true);
      setLoadingDelete(false);
      setOpen(false);
      fetchData();
    }
  };
  const filteredInfo = React.useMemo(() => {
    return info
      .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
      .filter((item) => {
        if (kewarganegaraanFilter && kewarganegaraanFilter !== "All") {
          return item.kewarganegaraan === kewarganegaraanFilter;
        }
        return true;
      })
      .filter((item) => {
        if (tanggalLahirFilter) {
          const selectedDate = new Date(tanggalLahirFilter);
          const itemDate = new Date(item.tgl_lahir);
          return (
            itemDate.getFullYear() === selectedDate.getFullYear() &&
            itemDate.getMonth() === selectedDate.getMonth() &&
            itemDate.getDate() === selectedDate.getDate()
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (sortByFilter === "nama") {
          return a.name.localeCompare(b.name);
        }
        if (sortByFilter === "email") {
          return a.email.localeCompare(b.email);
        }
        if (sortByFilter === "tanggal_lahir") {
          return new Date(a.tgl_lahir) - new Date(b.tgl_lahir);
        }
        return 0;
      });
  }, [info, search, kewarganegaraanFilter, tanggalLahirFilter, sortByFilter]);

  return (
    <>
      <Collapse
        in={showToast}
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
                setShowToast(false);
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"apakah anda yakin ingin menghapus data ini?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Data yang dihapus tidak dapat dikembalikan
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Batal</Button>
          <Button onClick={() => handleDelete(id)}>
            {loadingDelete ? <CircularProgress size={16} /> : "Hapus"}
          </Button>
        </DialogActions>
      </Dialog>
      <Stack width={"75%"} direction="row" spacing={2}>
        <TextField
          variant="outlined"
          placeholder="Search by name..."
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          onClick={handleClick}
          variant="outlined"
          startIcon={<FilterAltOutlinedIcon />}
        >
          Filter
        </Button>
      </Stack>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openMenu}
        onClose={handleCloseMenu}
        // onClick={handleCloseMenu}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: 400,
          }}
        >
          <MenuItem>
            <Stack
              direction="column"
              sx={{
                width: "100%",
              }}
            >
              <FormLabel sx={{ fontSize: "12px" }}>Kewarganegaraan</FormLabel>
              <Select
                labelId="wni"
                id="wni"
                value={kewarganegaraanFilter}
                onChange={(e) => setKewarganegaraanFilter(e.target.value)}
                fullWidth // Ensures the Select fills the width of the container
              >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"Indonesia"}>Indonesia</MenuItem>
                <MenuItem value={"Thailand"}>Thailand</MenuItem>
                <MenuItem value={"Malaysia"}>Malaysia</MenuItem>
                <MenuItem value={"Singapore"}>Singapore</MenuItem>
                <MenuItem value={"Australia"}>Australia</MenuItem>
              </Select>
            </Stack>
          </MenuItem>
          <MenuItem>
            <Stack
              direction="column"
              sx={{
                width: "100%",
              }}
            >
              <FormLabel sx={{ fontSize: "12px" }}>Tanggal Lahir</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={tanggalLahirFilter}
                  onChange={(newValue) => setTanggalLahirFilter(newValue)}
                  format="YYYY-MM-DD"
                  renderInput={(params) => (
                    <OutlinedInput {...params} fullWidth /> // Ensures the input spans full width
                  )}
                />
              </LocalizationProvider>
            </Stack>
          </MenuItem>
          <MenuItem>
            <Stack
              direction="column"
              sx={{
                width: "100%",
              }}
            >
              <FormLabel sx={{ fontSize: "12px" }}>Sort by</FormLabel>
              <Select
                labelId="wni"
                id="wni"
                value={sortByFilter}
                onChange={(e) => setSortByFilter(e.target.value)}
                fullWidth // Ensures the Select fills the width of the container
              >
                <MenuItem value={"nama"}>Nama</MenuItem>
                <MenuItem value={"email"}>email</MenuItem>
                <MenuItem value={"tanggal_lahir"}>Tanggal Lahir</MenuItem>
              </Select>
            </Stack>
          </MenuItem>
        </Box>
      </Menu>
      <Grid container spacing={2}>
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="row"
                component={Card}
                spacing={2}
                useFlexGap
                sx={{
                  color: "inherit",
                  p: 3,
                  height: "100%",
                  borderColor: "hsla(220, 25%, 25%, 0.3)",
                  // backgroundColor: "grey.800",
                  alignItems: "center",

                  width: "100%",
                }}
              >
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={32}
                  height={32}
                />
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ flexGrow: 1, alignItems: "center" }}
                >
                  <div style={{ width: "100%" }}>
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width={100}
                      height={20}
                    />
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width={250}
                      height={20}
                    />
                  </div>
                </Stack>
              </Stack>
            </Grid>
          ))
        ) : filteredInfo.length === 0 ? (
          <Grid
            size={{ xs: 12 }}
            sx={{
              textAlign: "center",
              p: 3,
              color: "grey.600",
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: "medium" }}>
              Tidak ada data.
            </Typography>
          </Grid>
        ) : (
          filteredInfo.map((item, index) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4 }}
              key={index}
              onClick={() => {
                console.log(item);
              }}
              sx={{
                cursor: "pointer",
              }}
            >
              <Stack
                direction="row"
                component={Card}
                spacing={2}
                useFlexGap
                sx={{
                  p: 3,
                  height: "100%",
                  borderColor: "hsla(220, 25%, 25%, 0.3)",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: "hsla(221, 14.40%, 38.00%, 0.30)",
                  },
                }}
              >
                {loading ? (
                  <Skeleton
                    animation="wave"
                    variant="circular"
                    width={32}
                    height={32}
                  />
                ) : (
                  <Avatar
                    alt={item.name}
                    src={item.image}
                    sx={{ width: 32, height: 32 }}
                  />
                )}
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ flexGrow: 1, alignItems: "center" }}
                >
                  <div style={{ width: "100%" }}>
                    {loading ? (
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={100}
                        height={20}
                      />
                    ) : (
                      <Typography sx={{ fontWeight: "medium", fontSize: 14 }}>
                        {item.name}
                      </Typography>
                    )}{" "}
                    {loading ? (
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={100}
                        height={20}
                      />
                    ) : (
                      <Typography
                        sx={{
                          color: "grey.400",
                          fontSize: 12,
                          justifyContent: "space-between",
                        }}
                      >
                        {item.email || "Alamat tidak tersedia"}
                      </Typography>
                    )}
                  </div>
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      onClick={() => handleEdit(item)}
                      sx={{ width: 28, height: 28 }}
                    >
                      <EditIcon sx={{ fontSize: "16px" }} />
                    </IconButton>
                    <IconButton
                      onClick={() => handleOpen(item.id)}
                      sx={{ width: 28, height: 28 }}
                    >
                      <DeleteIcon sx={{ fontSize: "16px", color: "danger" }} />
                    </IconButton>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
          ))
        )}
        <Card
          onClick={() => router.push("/add")}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",

            color: "inherit",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "hsla(221, 14.40%, 38.00%, 0.30)",
            },
          }}
        >
          <AddCircleOutlineRoundedIcon sx={{ fontSize: 24 }} />
          <Typography sx={{ fontSize: 14 }}>Add New Item</Typography>
        </Card>
      </Grid>
    </>
  );
}
