import React from "react";
import { Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import { closeModal } from "../../../actions/modal";

const ModalContainer = (props) => {
  const { open, body, dispatch } = props;

  const doCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <Modal open={open} onClose={doCloseModal} size="mini">
      <Modal.Content>{body}</Modal.Content>
    </Modal>
  );
};

function mapStateToProps({ modal }) {
  return {
    open: modal.open,
    body: modal.body,
  };
}

export default connect(mapStateToProps)(ModalContainer);
