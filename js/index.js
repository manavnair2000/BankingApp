Vue.component('nav-bar',{
    template:`<nav class="nav-wrapper">
                <div class="container">
                    <a href="" class="sidenav-trigger" id="menu-btn" data-target="mobile-menu"><i class="material-icons">menu</i>
                    </a>
                    <a href="index.php" class="brand-logo brand hide-on-med-and-down" id="page-title-l" >Banking Application</a>
                    <a href="index.php" class="brand-logo brand hide-on-large-only" id="page-title-s">Banking App</a>
                    <ul class="right hide-on-med-and-down" >
                        <li class="active"><a href="index.php" id="home-link">  Home</a></li>
                    </ul>
                </div>
            </nav>`
});
Vue.component('form-header',{
    template: `<div class="section pink darken-1" id="form-header">
                    <div class="container">
                        <h4 class="white-text">Welcome, Login to continue</h4>
                    </div>
                </div>`
});
Vue.component('mobile-menu',{
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
    mounted :function(){
        $('.sidenav').sidenav();
    }
});
Vue.component('user-form',{
    template: `<form id="user_login" class="col s12" action="user_login_attempt.php" method="post">
                    <center>
                        <div class="row">
                            <div class="input-field col s11">
                                <i class="material-icons prefix pink-text">account_circle</i>
                                <input id="user_acc_no" name="acc_no" min="1000000000"  max="999999999999999" title="Must contain atleast 10-15 digits" type="number" class="validate" required>
                                <span class="helper-text" data-error="Enter 10-15 digit number" data-success="Please proceed to your Password"></span>
                                <label for="user_acc_no">Account Number</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s11">
                                <i class="material-icons prefix pink-text">edit</i>
                                <input id="user_password" name="acc_password"  type="password" pattern=".{8,}" title="Must contain atleast 8 characters" class="validate" required>
                                <span class="helper-text" data-error="Must contain atleast 8 characters" data-success="Please Sign In"></span>
                                <label for="user_password">Password</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s10 l10 push-l1 push-s1">
                                <button type="submit" form="user_login" name="user_submit" id="user_login_button" class="btn waves-effect waves-light pink"><i class="material-icons left white-text">login</i>Login</button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s10 l10 push-l1 push-s1">
                                <span>New User?</span><a href="register.html" class="blue-text"> Sign Up Here!</a>
                            </div>
                        </div>
                    </center>
                </form>  `
});
Vue.component('banker-form',{
    template:`<form id="bank_login" class="col s12" action="user_login_attempt.php" method="post">
                    <center>
                        <div class="row">
                            <div class="input-field col s11">
                                <i class="material-icons prefix pink-text">account_balance</i>
                                <input id="bank_acc_no" name="acc_no" type="number" min="1000000000"  max="999999999999999" title="Must contain atleast 10-15 digits" class="validate" required>
                                <label for="bank_acc_no">Account Number</label>
                                <span class="helper-text" data-error="Enter 10-15 digit number" data-success="Please proceed to your Password"></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s11">
                                <i class="material-icons prefix pink-text">edit</i>
                                <input id="bank_password" name="acc_password" pattern=".{8,}" title="Must contain atleast 8 characters" type="password" class="validate">
                                <span class="helper-text" data-error="Must contain atleast 8 characters" data-success="Please Sign In"></span>
                                <label for="bank_password">Password</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s10 l10 push-l1 push-s1">
                                <button type="submit" form="bank_login" name="bank_submit" id="bank_login_button" class="btn waves-effect waves-light pink"><i class="material-icons left white-text">login</i>Login</button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s10 l10 push-l1 push-s1">
                                <span>New User?</span><a href="register.html" class="blue-text"> Sign Up Here!</a>
                            </div>
                        </div>
                    </center>
                </form>  `
});
var app = new Vue({
    el : '#root',
    data : {
        
    },
    methods:{

    },
    computed:{

    }
});
