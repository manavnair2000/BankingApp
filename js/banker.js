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
                        <h4 class="white-text">Welcome, {{ banker.name }} </h4>
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
Vue.component('user-details', {
    props: {
        user : Object
    },
    methods: {
        retMonth: function (num) {
            var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            return months[num];
        },
        showData :function(num){
            var html_detail = `
                   <table class="centered striped">
                        <thead>
                        <tr>
                            <th>Time</th>
                            <th>Remaining Balance</th>
                            <th>Amount Credited</th>
                            <th>Amount Debited</th>
                        </tr>
                        </thead>

                        <tbody>
            `; 
            var details = this.user[num].transaction_details;
            let hours,minutes,seconds,date,month,fullyear,deposit,balance,status;
            for ( var i=0;i < details.length;i++){
                hours = new Date(details[i].time).getHours();
                minutes = new Date(details[i].time).getMinutes();
                seconds = new Date(details[i].time).getSeconds();
                date = new Date(details[i].time).getDate();
                month = this.retMonth(new Date(details[i].time).getMonth());
                fullyear = new Date(details[i].time).getFullYear();
                deposit = (details[i].status == 'deposit') ? details[i].amount : "N/A";
                balance = details[i].balance;
                withdraw = (details[i].status == 'withdraw') ? details[i].amount : "N/A";
                html_detail += `<tr>
                            <td>`+ hours + `:` + minutes + `:` + seconds + ` ,` + date + ` ` + month + `, ` + fullyear + `</td>` +
                    `<td>` + balance + `</td>` +
                    `<td>` + deposit + `</td>` +
                        `<td>` + withdraw + `</td>
                        </tr>`;
            }

            html_detail += "</tbody></table >";
            Swal.fire({
                title: "Person Name: " + this.user[num].name + "\n Account Number: " + this.user[num].acc_no +"  ",
                html: html_detail,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                showCloseButton : true
            });
        }
    },
    template: `<table class="highlight centered striped">
                    <thead>
                    <tr>
                            <th>Name</th>
                            <th>Account Number</th>
                            <th>Remaining Balance</th>
                    </tr>
                    </thead>
                    <tbody>
                    <template v-for="(x,index) in user">
                    <tr >
                            <td @click="showData(index)"> {{ x.name }} </td>
                            <td @click="showData(index)"> {{ x.acc_no }} </td>
                            <td @click="showData(index)">{{ x.transaction_details[0].balance }} </td>
                    </tr>
                    </template> 
                    </tbody>
            </table>`
});

var app = new Vue({
    el: '#root',
    data: function(){
            return{
                users : {},
                info: null,
                loading: true,
                errored: false
        }
    },
    methods: {
        
    },
    computed: {

    },
    mounted : function(){
        axios
            .get('getUserDetails.php')
            .then(response => {
                this.users = response.data.user;
            })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
            .finally(() => this.loading = false)
    }
});
