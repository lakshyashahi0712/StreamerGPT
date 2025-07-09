export const checkValidData = (email,password,name)=>{
    const isEmailValid = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(email)
    const isPasswordValid = /^((?=\S*?[a-z]).{6,})\S$/.test(password);
    const isNameValid = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/.test(name)

    if(!isEmailValid) return "email id is not valid";
    if(!isPasswordValid) return "password is not valid";
    if(!isNameValid) return "Name is not valid";

    return null;

}