import React, { useEffect } from "react";
import "./ViewState.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import BaseUrl from "../../env";

//
function ViewState() {
  const navigate = useNavigate();
  const RoutePage = (e) => {
    navigate(`/${e}`);
  };

  const [rows, setState] = React.useState([]);

  const FetchState = async () => {
    const value = await Axios.get(`${BaseUrl}/v1/state`);
    setState(value.data);
  };

  const EditePageRoute = (e) => {
    navigate(`/EditeState?id=${e}`);
  };

  useEffect(() => {
    FetchState();
  }, []);

  return (
    <div className="view-state-container">
      <div className="view-state-options">
        <button
          className="view-state-btn-add"
          onClick={() => RoutePage("mangeSate")}
        >
          Add State
        </button>
        {/* <button
          className="view-state-btn-edite"
          onClick={() => RoutePage("EditeState")}
        >
          Edite State
        </button> */}
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
              {rows.map((row, i) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {i + 1}
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default ViewState;
