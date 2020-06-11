Vue.component('nav-bar', {
    template: `<nav class="nav-wrapper">
                <div class="container">
                    <a href="" class="sidenav-trigger" id="menu-btn" data-target="mobile-menu"><i class="material-icons">menu</i>
                    </a>
                    <a href="index.php" class="brand-logo brand hide-on-med-and-down" id="page-title-l" >Banking Application</a>
                    <a href="index.php" class="brand-logo brand hide-on-large-only" id="page-title-s">Banking App</a>
                    <ul class="right hide-on-med-and-down" >
                        <li><a href="index.php" id="home-link">  Home</a></li>
                    </ul>
                </div>
            </nav>`
});
Vue.component('form-header', {
    template: `<div class="section pink darken-1" id="form-header">
                    <div class="container">
                        <h4 class="white-text">Welcome, Enter your Details to Register</h4>
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
Vue.component('user-form', {
    template: `<form id="user_login" class="col s12" action="register.php" method="post">
                    <center>
                        <div class="row">
                            <div class="input-field col s11">
                                <i class="material-icons prefix pink-text">account_circle</i>
                                <input id="bank_acc_no" name="acc_no" type="number" min="1000000000"  max="999999999999999" title="Must contain atleast 10-15 digits" class="validate" required>
                                <label for="bank_acc_no">Account Number</label>
                                <span class="helper-text" data-error="Enter 10-15 digit number" data-success="Please proceed to your Name"></span>

                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s11">
                                <i class="material-icons prefix pink-text">account_box</i>
                                <input id="user_acc_no" name="acc_name" pattern="[a-zA-z ]+" title="Must contain only letters and spaces" type="text" class="validate" required>
                                <span class="helper-text" data-error="Enter Valid Characters" data-success="Please proceed to your Password"></span>
                                <label for="user_acc_no">Your Name</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s11">
                                <i class="material-icons prefix pink-text">edit</i>
                                <input id="user_password" name="acc_password" pattern=".{8,}" title="Must contain atleast 8 characters" type="password" class="validate" required>
                                <span class="helper-text" data-error="Must contain atleast 8 characters" data-success="Please Sign Up"></span>
                                <label for="user_password">Password</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s11">
                                <p>
                                    <span>I am a: &nbsp;</span>
                                    <label>
                                        <input class="with-gap" id="user"  name="user_status" type="radio" checked  value="user"/>
                                        <span>User</span>
                                    </label>
                                    <label >
                                        <input class="with-gap" id="banker" name="user_status" type="radio"  value="banker"/>
                                        <span>Banker</span>
                                    </label>
                                </p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s10 l10 push-l1 push-s1">
                                <button type="submit" form="user_login" name="user_submit" id="user_login_button" class="btn waves-effect waves-light pink"><i class="material-icons left white-text">exit_to_app</i>Sign Up</button>
                            </div>
                        </div>
                    </center>
                </form>  `
});

var app = new Vue({
    el: '#root',
    data: {

    },
    methods: {

    },
    computed: {

    }
});
