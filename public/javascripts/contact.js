function addcontact(){
    var FirstName = document.getElementById('FirstName').value;
    var LastName = document.getElementById('LastName').value;
    var email = document.getElementById('email').value;
    var DateOfBirth = document.getElementById('DateOfBirth').value;

    // console.log("addcontact", FirstName, LastName, email, DateOfBirth);
    axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('jwt');
    axios.post('/api/contact',{
        FirstName:FirstName,
        LastName:LastName,
        email:email,
        DateOfBirth:DateOfBirth
    }).then((response) => {
        // console.log('response',response);

        if(response.data.status == true){
            swal({
                text: `${response.data.message}`,
                title: "contact saved!",
                icon: "success",
                button: false,
                timer:2000
              });
              setTimeout(function(){
                window.location.reload();
              },2000);
        }
            });
 }

 function contactlist(){
     var contact_data= "",FirstName="", LastName="", email="", DateOfBirth="", html="";
     axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('jwt');
     axios.get('/api/fetchcontact').then((response) => {
         console.log('contactlist is:', response);
         var data11 = response.data.data;
         var contactlistlength=data11.length;
         var html='';
         console.log("jbbjbjbgdsa",contactlistlength)
         for(i=0;i<contactlistlength;i++){
 
             html += `<tr class="info">
             <td contenteditable='false' class="row${i}" id="FirstName${i}">${data11[i].FirstName}</td>
             <td contenteditable='false' class="row${i}" id="LastName${i}">${data11[i].LastName}</td>
             <td contenteditable='false' class="row${i}" id="email${i}">${data11[i].email}</td>
             <td contenteditable='false' class="row${i}" id="DateOfBirth${i}">${data11[i].DateOfBirth}</td>
             <td><button id="btne${i}" onclick="editRow(this.id)">Edit</button></td>
             <td><button id="btndel${i}" onclick="deleteRow(this.id)">Delete</button></td>
         
             </tr>`;
         }
        document.getElementById('contactTableBody').innerHTML = html;
         
     }
    )};

     function editRow(id){
        // console.log('id', id.slice(4));
        var j=id.slice(4);
        document.getElementsByClassName(`row${j}`)[0].setAttribute("contenteditable","true");
        document.getElementsByClassName(`row${j}`)[1].setAttribute("contenteditable", "true");
        // document.getElementsByClassName(`row${j}`)[2].setAttribute("contenteditable", "false");
        document.getElementsByClassName(`row${j}`)[3].setAttribute("contenteditable", "true");
        document.getElementById(`FirstName${j}`).focus();
       
        // oldemail = document.getElementById(`email${j}`).innerHTML;
        document.getElementById(id).innerText='Update';
        document.getElementById(id).removeAttribute("onclick");
        document.getElementById(id).setAttribute("onclick","updateRow(this.id)");
     }
     function updateRow(id){
        // console.log(id);
         var k=id.slice(4);
        //  console.log(k);
         var FirstName = document.getElementById(`FirstName${k}`).innerHTML;
         var LastName = document.getElementById(`LastName${k}`).innerHTML;
         var email = document.getElementById(`email${k}`).innerHTML;
         var DateOfBirth = document.getElementById(`DateOfBirth${k}`).innerHTML;
        //  console.log(FirstName,LastName,DateOfBirth)

         axios.post('/api/updatecontact',{
             FirstName:FirstName,
             LastName:LastName,
             DateOfBirth:DateOfBirth,
             email : email
            }).then((response) => {
                // console.log(response);
              if(response.data.status == true){
                swal({
                    text: `${response.data.message}`,
                    title: "updatecontact!",
                    icon: "success",
                    button: false,
                    timer: 2000
                  });
                  setTimeout(function(){
                    window.location.reload();
                  }, 2000);
              }

            });
     }
function deleteRow(id){
// console.log('tesrrrrr',id)
var del=id.slice(6)
// console.log('this is for testing of deleteRow', del);

var FirstName = document.getElementById(`FirstName${del}`).innerHTML;
var LastName = document.getElementById(`LastName${del}`).innerHTML;
var email = document.getElementById(`email${del}`).innerHTML;
var DateOfBirth = document.getElementById(`DateOfBirth${del}`).innerHTML;
// console.log("This is for console delete",FirstName,LastName,email,DateOfBirth)
axios.post('/api/deletecontact',{
    FirstName:FirstName,
    LastName:LastName,
    email:email,
    DateOfBirth:DateOfBirth
}).then((response) =>{
    swal({
        text: `${response.data.message}`,
        title: "Deleted!",
        icon: "success",
        button: false,
        timer: 2000
      });
      setTimeout(function(){
        window.location.reload();
        // location.reload();
      }, 2000);
    // console.log(response)
})
}