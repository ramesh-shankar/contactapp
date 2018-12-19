function login(){
    var email = document.getElementById('email').value;
    var password =document.getElementById('password').value;

    // console.log('login',email, password);
    axios.post('/api/login', {
        email:email,
        password:password }) 
        .then((response) =>{
            if(response.data.status ==true){
                swal({
                    text: `${response.data.message}`,
                    title: "LogIn!",
                    icon: "success",
                    button: false,
                    timer:2000
                  });
                  setTimeout(function(){
                      localStorage.setItem('jwt',response.data.token)
                    window.location='/contact';
                  },3000);

                
            }else if(response.data.status ==false){
                swal({
                    // title: "Good job!",
                    text: `${response.data.message}`,
                    icon: "error",
                    // button: "Aww yiss!",
                  });
                  setTimeout(function(){
                    window.location='/';
                  },3000);
                // alert(response.data.message);
                // window.location='/';

            }
                // if(typeof(Storage) !== "undefined"){
                // }
            
        });

    // if(email=="" && password==""){
    //     alert("field are empty");
    //     return false;
    // }
    // console.log('this is your:', email, password);

}