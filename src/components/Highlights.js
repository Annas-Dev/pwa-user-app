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
  const filteredInfo = info.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
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
      <TextField
        variant="outlined"
        placeholder="Search by name..."
        fullWidth
        sx={{ maxWidth: "70%" }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Grid container spacing={2}>
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
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
          : filteredInfo.map((item, index) => (
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
                    // color: "inherit",
                    p: 3,
                    height: "100%",
                    borderColor: "hsla(220, 25%, 25%, 0.3)",
                    // backgroundColor: "grey.800",
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
                        <DeleteIcon
                          sx={{ fontSize: "16px", color: "danger" }}
                        />
                      </IconButton>
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>
            ))}
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
