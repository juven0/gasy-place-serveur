module.exports.signUpErrors = (err)=>{
    let errors ={nom:'' , prenom:'',email:'', password:'' }

    if(err.message.includes('nom')){
        errors.nom= 'nom incorrect';
    }
    if(err.message.includes('prenom')){
        errors.prenom= 'prenom incorrect';
    }
    if (err.message.includes('email')){
        errors.email= 'email incorrect'
    }
    if(err.message.includes('password')){
        errors.password= 'le mot de passe doit faire 8 carracter minimum '
    }
    if(err.code === 11000 && Object.keys(err.keyValue)[0].includes('email')){{
        errors.email= 'email deja prise'
    }}
    return errors;
} ;

module.exports.signInErrors = (err)=>{
    let errors = {email: '', password: '' }

    if (err.message.includes('email')) {
        errors.email = 'email incorrect'
    }
    if (err.message.includes('password')) {
        errors.password = 'mot de passe incorrect '
    }

    return errors;
}