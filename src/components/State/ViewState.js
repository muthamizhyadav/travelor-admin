import React, { useEffect } from "react";
import "./ViewState.css";
import { useNavigate } from "react-router-dom";
import Loading from "../Loader/Loading";
import Axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import BaseUrl from "../../env";

//
function ViewState() {
  const navigate = useNavigate();
  const RoutePage = (e) => {
    navigate(`/${e}`);
  };

  const [rows, setState] = React.useState([]);
  const [particularState, setParticularState] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [show, setShow] = React.useState(true);

  const FetchState = async () => {
    const value = await Axios.get(`${BaseUrl}/v1/state`);
    if ((value.status == 201) | (value.status == 200)) {
      setShow(false);
    }
    setState(value.data);
  };

  const EditePageRoute = (e) => {
    navigate(`/EditeState?id=${e}`);
  };

  const viewClick = (index) => {
    console.log(index);
    let data = rows[index];
    setParticularState(data);
  };
  console.log(particularState);

  useEffect(() => {
    FetchState();
  }, []);

  return (
    <div className="view-state-container">
      <Loading show={show} />
      <div className="view-state-options">
        <button
          className="view-state-btn-add"
          onClick={() => RoutePage("mangeSate")}
        >
          Add State
        </button>
      </div>
      <div className="view-state-table">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead className="table-head">
              <TableRow className="table-row">
                <TableCell>S.No</TableCell>
                <TableCell align="left">State</TableCell>
                <TableCell align="right">Latitude</TableCell>
                <TableCell align="right">Longitude</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">
                    {!row.lat ? (
                      <span style={{ color: "red" }}>Nill</span>
                    ) : (
                      <p style={{ color: "green" }}>{row.lat}</p>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {!row.long ? (
                      <span style={{ color: "red" }}>Nill</span>
                    ) : (
                      <p style={{ color: "green" }}>{row.long}</p>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <button
                      className="Edite-btn-action-state"
                      onClick={() => EditePageRoute(row._id)}
                    >
                      Edite
                    </button>
                    <button
                      className="view-btn-action-state"
                      onClick={() => {
                        viewClick(index);
                        handleOpen();
                      }}
                    >
                      View
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="particular-state-view">
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle style={{ textAlign: "center" }}>
            {particularState.name}
          </DialogTitle>
          <DialogContent>
            <div className="State-particular-content">
              <p>
                <span>about : </span>
                {particularState.about}
              </p>
              <p>
                <span>capital:</span>
                {particularState.capital}
              </p>
              <p>
                <span>climate : </span>
                {particularState.climate}
              </p>
              <p>
                <span>history: </span>
                {particularState.history}
              </p>
              <p>
                <span>Time To Visit: </span>
                {particularState.time}
              </p>
              <p>
                <span>No Of Image:</span>
                {!particularState.img ? 0 : particularState.img.length}
              </p>
              {particularState.img != 0 && particularState.img
                ? particularState.img.map((e) => <img src={e} alt="img" />)
                : ""}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="secondary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default ViewState;
