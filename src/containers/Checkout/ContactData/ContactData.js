import React , {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';



class ContactData extends Component
{
    state = {
        orderForm:{ 
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            zipCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'zip code'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched:false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'E mail'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
        deliveryMethod:{
            elementType:'select',
            elementConfig:{
                options:[{
                    value:'fastest',
                    displayValue:'Fastest'
                },
                {
                    value:'cheapest',
                    displayValue:'Cheapest'

                }]
            },
            value:''
        },
    },
        loading: false  
    }

    orderHandler = () => {
        //event.preventDefault();
        console.log(this.props.ingredients);
        this.setState({loading:true});
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm)
        {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients:this.props.ingredients,
            price:this.props.price,
            orderData:formData
           
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

    checkValidity(value,rules)
    {
        let isValid=true;
        if(rules.required)
        {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength)
        {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength)
        {
            isValid = value.length >= rules.minLength  && isValid;
        }

        return isValid;

    }




    inputChangedHandler = (event, inputIdentifier) => {
        console.log(event.target.value);
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        console.log(updatedOrderForm);

        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
      console.log(updatedFormElement);
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched=true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        console.log(updatedFormElement);
        this.setState({orderForm:updatedOrderForm});

    }

    render()
    {
        const formElementsArray = [];
        for( let key in this.state.orderForm)
        {
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }
        
        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact Data</h4>
                <form onSubmit={this.orderHandler}>
                    
                    {formElementsArray.map(formElement => {
                     return (<Input key={formElement.id}  elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig} 
                        value = {formElement.config.value}
                        invalid={!formElement.config.valid}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        touched={formElement.config.touched}/>)
                    })}
                    <Button btnType="Success" >ORDER</Button>
                </form>
            </div>
        )
    }
}

export default ContactData;