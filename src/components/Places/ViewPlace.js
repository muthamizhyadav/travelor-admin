import React, { useEffect } from "react";
import "./ViewPlace.css";
import { useNavigate } from "react-router-dom";
import BaseUrl from "../../env";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import Axios from "axios";
import { Pagination } from "@mui/material";
import Loading from "../Loader/Loading";

function ViewPlace() {
  const navigate = useNavigate();

  const [places, setPlaces] = React.useState([]);
  const [totalPage, SetTotalPage] = React.useState();
  const [particular, setParticular] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [show, setShow] = React.useState(true);

  let currentpage = 0;
  // let particular;
  const FetPLaces = async () => {
    const values = await Axios.get(
      `${BaseUrl}/v1/tourist/fetch/tourist/places?page=${currentpage}`
    );
    if ((values.status == 201) | (values.status == 200)) {
      setShow(false);
    }
    setPlaces(values.data.values);
    SetTotalPage(Math.ceil(values.data.total / 10));
  };

  const PaginationClick = async (e) => {
    setShow(true)
    const values = await Axios.get(
      `${BaseUrl}/v1/tourist/fetch/tourist/places?page=${currentpage}`
    );
    if ((values.status == 201) | (values.status == 200)) {
      setShow(false);
    }
    setPlaces(values.data.values);
    SetTotalPage(Math.ceil(values.data.total / 10));
    console.log(currentpage);
  };

  useEffect(() => {
    FetPLaces();
  }, []);

  const RoutPage = (e) => {
    navigate(`/${e}`);
  };

  const EditePageRoute = async (e, id) => {
    navigate(`/${e}?id=${id}`);
  };

  const modelData = async (index) => {
    const datas = places[index];
    setParticular(datas);
    console.log(particular);
  };

  return (
    <div className="place-view-container">
      <Loading show={show} />
      <div className="place-view-options">
        <button
          className="place-view-btn-add"
          onClick={() => RoutPage("managePlace")}
        >
          Add Place
        </button>
        {/* <button
          className="place-view-btn-edite"
          onClick={() => RoutPage("EditePlace")}
        >
          Edite Place
        </button> */}
      </div>
      <div className="place-view-table">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead className="table-head">
              <TableRow className="table-row">
                <TableCell>S.No</TableCell>
                <TableCell align="left">PLaceName</TableCell>
                <TableCell align="left">State</TableCell>
                <TableCell align="left">TopFive</TableCell>
                <TableCell align="left">PlaceCategory</TableCell>
                <TableCell align="left">popular</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {places.map((places, index) => (
                <TableRow
                  key={places._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + currentpage * 10 + 1}
                  </TableCell>
                  <TableCell align="left">{places.name}</TableCell>
                  <TableCell align="left">{places.State}</TableCell>
                  <TableCell align="left">
                    {places.topfive ? <Switch defaultChecked /> : <Switch />}
                  </TableCell>
                  <TableCell align="left">
                    {places.placeCategory ? places.placeCategory : "nill"}
                  </TableCell>
                  <TableCell align="left">
                    {places.popular ? <Switch defaultChecked /> : <Switch />}
                  </TableCell>
                  <TableCell align="center">
                    <button
                      className="places-btn-action-edit"
                      onClick={() => EditePageRoute("EditePlace", places._id)}
                    >
                      Edite
                    </button>
                    <button
                      className="places-btn-action-view"
                      onClick={() => {
                        modelData(index);
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
      <div className="places-pagination">
        <Pagination
          size="medium"
          count={totalPage}
          color="primary"
          onChange={(e, value) => {
            currentpage = value - 1;
            PaginationClick();
          }}
        />
      </div>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle style={{ textAlign: "center" }}>
            {particular.name}
          </DialogTitle>
          <DialogContent>
            <div className="places-particular-content">
              <p>
                <span>State : </span>
                {`${particular.State}`}
              </p>
              <img src={particular.img} alt="image" />
              <p>
                <span>Info:</span>
                {particular.info}
              </p>
              <p>
                <span>This place In Top Five : </span>
                {particular.topfive ? "YES" : "NO"}
              </p>
              <p>
                <span>Category: </span>
                {particular.placeCategory
                  ? particular.placeCategory
                  : "Not Set"}
              </p>
              <p>
                <span>This Place In Popular: </span>
                {particular.popular ? particular.popular : "NO"}
              </p>
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

export default ViewPlace;
