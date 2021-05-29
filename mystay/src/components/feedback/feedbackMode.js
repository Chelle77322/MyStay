import React from 'react';
import Modal from 'react-responsive-modal';
import {RMSResError} from '../../components/shared/form/RMSResError';


export function FeedbackModal(props){

    const {open, closeModal, feedback, confirmModal, errors, accommodation} = props;

    return(
        <Modal open = {open} onClose = {closeModal}
        littleclassNames = {{modal: 'feedback-modal'}}>

            <h4 className = 'modal-title title'> Confirm Feedback</h4>
            <p>Feedback {accommodation} {feedback}</p>
            <div className = 'modal-body'>
               <p> <em> {feedback.rating}</em> Rating </p>
               <p>Description <em>{feedback.description}</em></p>
               <p> Do you wish to give feedback</p>
            </div>
            <RMSResError errors = {errors}/>
            <div className = 'modal-footer'>
                <button onClick = {confirmModal} type = "button" className = 'btn btn-bwm'>Give Feedback</button>
                <button type = "button" onClick = {closeModal} className = 'btn btn-bwm'>Cancel</button>
            </div>

        </Modal>
    )
}