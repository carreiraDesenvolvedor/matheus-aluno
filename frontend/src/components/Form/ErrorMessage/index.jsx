const FormErrorMessage = ({errors, fieldName}) => {
    return(
        <p style={{height: '30px', color:'red', fontWeight:"bold", fontSize:"9px", textAlign:"right"}}>
            {errors[fieldName] && errors[fieldName]}
        </p>
    )
}

export default FormErrorMessage;