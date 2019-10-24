import React , {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';



class ContactData extends Component
{
    state = {
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        },
        loading: false  
    }

    orderHandler = () => {
        //event.preventDefault();
        console.log(this.props.ingredients);
        this.setState({loading:true});
        const order = {
            ingredients:this.props.ingredients,
            price:this.props.price,
            customer:{
                name:'Bunty',
                address:{
                    street:'Teststreet 1',
                    zipCode:'4135211',
                    country:'India'
                },
                email:'bunty@bunty.com'
            },
            deliveryMethod:'fastest'
        }
        axios.post('/orders.json',order)
        .then(response => {
            console.log(response);
            this.setState({loading:false});
        })
        .catch(error => {
            console.log(error);
            this.setState({loading:false});});

    }

    render()
    {
        
        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact Data</h4>
                <form>
                    <input className={classes.Input} type='text' name='name' placeholder="Enter name"/>
                    <input className={classes.Input} type='email' name='email' placeholder="Enter email"/>
                    <input className={classes.Input} type='text' name='street' placeholder="Enter street"/>
                    <input className={classes.Input} type='text' name='postal' placeholder="Enter postal code"/>
                    <Button btnType="Success" clicked={this.orderHandler} >ORDER</Button>
                </form>
            </div>
        )
    }
}

export default ContactData;