import React, {Component} from 'react'
import axios from 'axios'
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
export class FeedbackForm extends Component {

    constructor(props){
        super(props);
        this.state = {
        accommodation: {feedback:[]},
            feedback:{
                booking_id: "",
                Description: "",
                feedback: 3
            },
        errors: {}
        }
    }

    change = (key, event) => {
        let result = {...this.state.feedback}
        result[key] = event.target.value
        this.setState({feedback: result})
    }

    review = (event) => {
        event.preventDefault();
        axios
          .post(`/api/feedback/${this.props.match.params._id}`, this.state.feedback)
          .then(result => {
            if(result.data.errors){
                this.setState({errors: result.data.errors.errors})
            } else {
                this.props.history.push(`/accommodation/${this.props.match.params._id}`)
            }
          })
          .catch(err => console.error(err));
    }

    componentDidMount = () => {
        console.log(this.props.match.params._id);
        axios.get(`/api/accommodation/${this.props.match.params._id}`)
          .then(result => {
              this.setState({accommodation: result.data.accommodation})
          })
          .catch(err => console.error(err));
    }

    render() {
        return (
            <Container className="m-3">
                <div>
                    <h4>Give feedback {this.state.accommodation.accommodationName}</h4>
                    <hr/>
                        <Form onSubmit={this.review}>
                            <FormGroup>
                            <Label>Booking_id:</Label>
                            <Input type="text" onChange={this.change.bind(this, "Booking_id")} placeholder="Please enter your booking_id" />
                            {
                                this.state.errors.booking_id ?
                                <p>{this.state.errors.booking_id.message}</p>:
                                ""
                            }
                            </FormGroup>
                            <FormGroup>
                            <Label>Select</Label>
                            <select onChange={this.change.bind(this, "feedback")}>
                                <option value="1">😊</option>
                                <option value="2">😊😊</option>
                                <option value="3" selected>😊😊😊 </option>
                                <option value="4">😊😊😊😊</option>
                                <option value="5">😊😊😊😊😊</option>
                            </select>
                            {
                                this.state.errors.feedback ?
                                <p>{this.state.errors.r.message}</p>:
                                ""
                            }
                            </FormGroup>
                            <FormGroup>
                            <Label>Your Feedback:</Label>
                            <Input type="text" onChange={this.change.bind(this, "feedbackDescription")} placeholder="Please give feedback in detail" />
                            {
                                this.state.errors.feedbackDescription ?
                                <p>{this.state.errors.feedbackDescription.message}</p>:
                                ""
                            }
                            </FormGroup>
                            <Button color="primary" type="submit" className="primary">Submit</Button>
                        </Form>
                </div>
            </Container>
        )
    }
}

export default FeedbackForm