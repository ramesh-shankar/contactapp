function signup(){
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmpassword = document.getElementById("confirmpassword").value;

    // console.log("signup", firstname, lastname, email, password, confirmpassword);
    axios.post('/api/signup', {
        firstname:firstname,
        lastname:lastname,
        email:email,
        password:password,
        confirmpassword:confirmpassword
    })
.then(function (res) {
    // console.log('signup', res)
    if(res.data.status == true){
        alert(res.data.message);
        window.location = '/';

    }
    else{
        alert(res.data.message);
        window.location = '/signup';

    }

}).catch((e) => {
    alert('enternal server error', e);
});
}