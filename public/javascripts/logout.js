function lout() {
    localStorage.setItem("jwt", '');
    document.cookie = "jwtToken=";
 
    window.location = '/'
 }