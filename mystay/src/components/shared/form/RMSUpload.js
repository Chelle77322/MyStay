import React from 'react';

export class RMSUpload extends React.Component{
    constructor(){
        super();
        this.onChange = this.onChange.bind(this);
    }
    onChange(event){
        const {input: {onChange}} = this.props;
        onChange('image to go here');
    }
    render() {
        const { label, meta: {touched, error}} = this.props;
        return(
            <div className = 'form-group'>
                <label>{label}</label>
                <div className = 'input-group'>
                    <input type = 'file' accept = '.jpg, .png, .jpeg, .pdf' onChange = {this.onChange}/>
                </div>
                {touched && ((error &&
                    <div className = 'alert alert-danger'>{error}</div>))}
            </div>
        )
    }
}