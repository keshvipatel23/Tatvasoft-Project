import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
  } from "@mui/material";
  
  const ConfirmationDialog = (props) => {
    const { open, onClose, onConfirm, title, description } = props;
    return (
      <Dialog
        open={open}
        onClose={() => onClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="cancel-popup"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{ color: "black", fontWeight: "bold" }}
        >
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ color: "black", fontWeight: 300 }}
          >
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            type="button"
            onClick={() => onClose()}
            style={{
              backgroundColor: "#80BF32",
              color: "white",
              width: 100,
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onConfirm();
            }}
            style={{
              backgroundColor: "#f14d54",
              color: "white",
              width: 100,
              fontWeight: "bold",
              fontSize: 15,
            }}
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default ConfirmationDialog;