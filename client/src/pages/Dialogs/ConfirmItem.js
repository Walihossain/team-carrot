import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import DialogActions from "@material-ui/core/DialogActions";
import Fab from "@material-ui/core/Fab";
import { apiCallWithHeader } from "../../services/apiHeaders";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import ConfirmItemStorage from "./ConfirmItemStorage";

const styles = theme => ({
  dialogPaper: {
    minHeight: "85vh",
    maxHeight: "85vh",
    minWidth: "45vw",
    maxWidth: "45vw",
    display: "flex",
    textAlign: "center",
    margin: "10px",
    padding: 20
  },
  formWidth: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: 10
  },
  textFieldHeader: {
    margin: 0,
    fontWeight: 600
  },
  FormControl: {
    width: "60%"
  },
  textFieldDropdown: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "60%"
  },
  menuDropdown: {
    width: "500px"
  },
  buttonStyles: {
    width: "200px",
    background: "#DF1B1B",
    marginTop: "35px",
    color: "white"
  },
  imageStyle: {
    marginTop: "35px",
    width: "40%",
    height: "auto"
  },
  root: {
    height: "45px"
  },
  circularProgress: {
    height: "40px",
    width: "40px",
    color: "#DF1B1B"
  }
});

class NewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      selectedFromList: "",
      disableSelectList: false,
      addClicked: false,
      loading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeDropdown = this.handleChangeDropdown.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    if (this.props.preSetListName) {
      this.setState(
        {
          selectedFromList: this.props.preSetListName,
          disableSelectList: true
        },
        () => {
          console.log("This is confirmItem state");
          console.log(this.state);
        }
      );
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChangeDropdown(e) {
    this.setState({ selectedFromList: e.target.value }, () => {
      console.log("Current State of Confirm Item");
      console.log(this.state);
      console.log("Current Props of Confirm Item");
      console.log(this.props);
    });
  }

  handleClose(e) {
    this.setState(
      {
        addClicked: !this.state.addClicked
      },
      () => {
        this.props.handleClick();
      }
    );
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });
    const type = "storeItem";
    const userData = {
      url: this.props.currentLink.link,
      name: this.props.itemInfo.details.data.name,
      list_name: this.state.selectedFromList,
      prices: this.props.itemInfo.details.data.prices,
      pictureUrl: this.props.itemInfo.details.data.pictureUrl
    };

    const headers = {
      headers: {
        "x-auth-token": localStorage.getItem("jwtToken")
      }
    };
    console.log(headers);
    console.log(headers.headers["x-auth-token"].length);
    console.log(localStorage.getItem("jwtToken").length);

    // this.props.sendURL(userData, headers);

    apiCallWithHeader(
      "post",
      `http://localhost:4000/item/${type}`,
      userData,
      headers
    ).then(() => {
      this.setState({ loading: false, addClicked: true });
    });
    // .then(() => {
    //   this.props.handleClick();
    // });
  };

  render() {
    const {
      link,
      list,
      selectedFromList,
      disableSelectList,
      loading
    } = this.state;
    const { classes, itemInfo, currentShoppingList } = this.props;
    console.log("These are the Confirm Item props");
    console.log(this.props);

    const dropdown = currentShoppingList.map((item, index) => {
      return (
        <MenuItem
          key={index}
          label="Select"
          value={item.name}
          name={item.name}
          className={classes.menuDropdown}
        >
          {item.name}
        </MenuItem>
      );
    });

    return (
      <div>
        <Dialog
          classes={
            ({ paper: classes.dialogContainer }, { paper: classes.dialogPaper })
          }
          open={this.props.open}
          onClose={this.props.handleClick}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            <h3 style={{ textAlign: "center" }}>Confirm New Item</h3>
          </DialogTitle>

          <form
            action="/"
            method="POST"
            onSubmit={this.handleSubmit.bind(this)}
            className={classes.formWidth}
          >
            <p className={classes.textFieldHeader}>Name:</p>
            <TextField
              id="outlined-name"
              label="Name"
              value={itemInfo.details.data.name}
              type="text"
              name="link"
              margin="normal"
              variant="outlined"
              className={classes.FormControl}
              onChange={this.handleChange}
            />
            <br />
            <p className={classes.textFieldHeader}>Price:</p>
            <TextField
              id="outlined-link"
              label="Price ($ CDN)"
              value={itemInfo.details.data.prices[0].value}
              type="text"
              name="link"
              margin="normal"
              variant="outlined"
              className={classes.FormControl}
              onChange={this.handleChange}
            />
            <br />
            <p className={classes.textFieldHeader}>Image:</p>
            <img
              className={classes.imageStyle}
              src={itemInfo.details.data.pictureUrl}
              alt="pic"
            ></img>
            <br />
            {/* -=-==---------------------------------------------------------------------------------------------------------------------------------- */}
            <p className={classes.textFieldHeader}>Select list:</p>
            <TextField
              select
              label={selectedFromList === "" ? "Select" : ""}
              className={classes.textFieldDropdown}
              value={selectedFromList}
              onChange={this.handleChangeDropdown}
              InputLabelProps={{ shrink: false }}
              margin="normal"
              variant="outlined"
              disabled={disableSelectList}
            >
              {dropdown}
            </TextField>

            {/* -=-==---------------------------------------------------------------------------------------------------------------------------------- */}
            <div className={classes.circularProgress}>
              {loading ? (
                <CircularProgress
                  className={classes.progress}
                  color="inherit"
                />
              ) : null}
            </div>
            <DialogActions className={classes.root}>
              <Fab
                type="submit"
                label="Submit"
                variant="extended"
                size="large"
                className={classes.buttonStyles}
                disabled={loading}
              >
                Confirm Item
              </Fab>
            </DialogActions>
          </form>
          <ConfirmItemStorage
            open={this.state.addClicked}
            close={this.handleClose}
          />
        </Dialog>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     currentItemUrl: state.url
//   };
// }

// export default connect(
//   mapStateToProps,

// )(DashBoardApp);

// export default connect(
//   mapStateToProps,
//   { sendNewItemUrl }
// )(NewItem);

// export default withStyles(styles)(connect(mapStateToProps)(NewItem));

export default withStyles(styles)(NewItem);

{
  /* <TextField
              select
              label={selectedFromList === "" ? "Select" : ""}
              value={selectedFromList}
              onChange={this.handleChangeDropdown}
              InputLabelProps={{ shrink: false }}
              className={classes.selectTextField}
              variant="outlined"
              margin="normal"
            >
              {dropdown}
            </TextField> */
}
