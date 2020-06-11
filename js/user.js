Vue.component('nav-bar', {
    template: `<nav class="nav-wrapper">
                <div class="container">
                    <a href="" class="sidenav-trigger" id="menu-btn" data-target="mobile-menu"><i class="material-icons">menu</i>
                    </a>
                    <a href="index.php" class="brand-logo brand hide-on-med-and-down" id="page-title-l" >Banking Application</a>
                    <a href="index.php" class="brand-logo brand hide-on-large-only" id="page-title-s">Banking App</a>
                    <ul class="right hide-on-med-and-down" >
                        <li ><a href="index.php" id="home-link">  Home</a></li>
                        <li><a class="btn waves-effect waves-light pink darken-1 white-text" href="logout.php" id="logout-link"> <i class="material-icons left white-text">power_settings_new</i>Logout</a></li>
                    </ul>
                    <ul class="right hide-on-large-only" >
                        <li><a class="btn waves-effect waves-light pink darken-1 white-text" href="logout.php" id="logout-link"><i class="material-icons white-text">power_settings_new</i></a></li>
                    </ul>
                </div>
            </nav>`
});
Vue.component('user-display-header', {
    template: `<div class="section pink darken-1" id="user-display-header">
                    <div class="container">
                        <h4 class="white-text">Welcome, {{ user.name }}</h4>
                    </div>
                </div>`
});
Vue.component('mobile-menu', {
    template: `<ul class="sidenav blue-grey darken-3" id="mobile-menu">
        <li>
            <div class="user-view">
                <div class="background black">

                </div>
                <a href="javascript:void(0);" class="circle sidenav-close" id="close-menu" > <i class="red-text text-accent-3 left material-icons">close</i></a>
                    <a href="#name"><span class="white-text name">Developed By</span></a>
                    <a href="#email"><span class="white-text email">Manav Nair</span></a>
                </div>
            </li>
            <li><a href="index.php" class="white-text sidenav-close" id="home-link-s"> <i class="lime-text text-accent-4 left material-icons">home</i> Home</a></li>
        </ul>`,
    mounted: function () {
        $('.sidenav').sidenav();
    }
});
Vue.component('transaction-history',{
    data: function(){
        return{
            users :user
        }
    },
    methods:{
        retMonth : function(num){
            var months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October","November","December"];
            return months[num];
        }
    },
    template:`<table class="centered striped">
        <thead>
          <tr>
              <th>Time</th>
              <th>Remaining Balance</th>
              <th>Amount Credited</th>
              <th>Amount Debited</th>
          </tr>
        </thead>

        <tbody>
        <template v-if="users.accounts != 'No Transactions'" v-for="x in users.accounts">
          <tr>
            <td>{{new Date(x.time).getHours()}} : {{new Date(x.time).getMinutes()}} : {{new Date(x.time).getSeconds()}} , {{new Date(x.time).getDate()}} {{ retMonth(new Date(x.time).getMonth()) }}, {{new Date(x.time).getFullYear()}}</td>
            <td>{{x.balance}} </td>
            <td v-if="x.status=='deposit'" > + {{x.amount}} </td>
            <td v-else > N/A </td>
            <td v-if="x.status=='withdraw'" > - {{x.amount}}</td>
            <td v-else> N/A </td>
          </tr>
          </template> 
          <tr v-if="users.accounts == 'No Transactions'">
                <td colspan="4">No Further History</td>       
        </tr>

        </tbody>
      </table>`
});

var app = new Vue({
    el: '#root',
    data: {
        users : user 
    },
    methods: {
        withdraw : function(event){
            event.preventDefault();
            if (this.users.accounts == "No Transactions"){
                Swal.fire("Oops!", "You have insufficient balance!! Please Enter some other amount.", "error", {
                    button: "Continue!",
                });
                return;
            }
            if(this.$refs.amount.value > this.users.accounts[0].balance){
                Swal.fire("Oops!", "You have insufficient balance!! Please Enter some other amount.", "error", {
                    button: "Continue!",
                });
            }
            else{
                var http = new XMLHttpRequest();
                var url = 'transaction.php';
                var params = 'withdraw=1&amount='+this.$refs.amount.value.toString();
                http.open('POST', url, true);
                http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                http.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        if(this.responseText == "success"){
                            Swal.fire({
                                title: "Hurray!", 
                                text : "Money was withdrawn!", 
                                icon : "success", 
                                button: "Reload to see details!",
                                allowOutsideClick :false,
                                allowEscapeKey: false,
                                allowEnterKey : false,
                            }).then((value)=> {
                                if(value){
                                    location.reload();
                                }
                            });
                        }
                        else if (this.responseText == "Insufficient Balance!"){
                            Swal.fire("Oops!", "You have insufficient balance!! Please Enter some other amount.", "error", {
                                button: "Continue!",
                            });
                        }
                    }
                }
                http.onerror = function (e) {
                    Swal.fire("Possibly no internet connection!", "Check your internet connection", "error");
                }
                http.send(params);
            }
        },
        deposit: function (event) {
            event.preventDefault();
            var http = new XMLHttpRequest();
            var url = 'transaction.php';
            var params = 'deposit=1&amount=' + this.$refs.amount.value.toString();
            http.open('POST', url, true);
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    if (this.responseText == "success") {
                        Swal.fire("Hurray!", "Money was deposited!", "success", {
                            button: "Reload to see details!",
                            closeOnClickOutside: false,
                            closeOnEsc: false,
                        }).then((value) => {
                            if (value) {
                                location.reload();
                            }
                        });
                    }
                    // else if (this.responseText == "success") {
                    //     Swal.fire("Hurray!", "Money was deposited!", "success", {
                    //         button: "Reload to see details!",
                    //         closeOnClickOutside: false,
                    //         closeOnEsc: false,
                    //     }).then((value) => {
                    //         if (value) {
                    //             location.reload();
                    //         }
                    //     });
                    // }
                }
            }
            http.onerror = function (e) {
                Swal.fire("Possibly no internet connection!", "Check your internet connection", "error");
            }
            http.send(params);
        }
    },
    computed: {

    }
});
