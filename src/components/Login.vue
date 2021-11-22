<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Login</h3>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>Username</label>
                    <input type="text" class="form-control" v-model="user.username" :class="{ 'is-invalid': submitted && $v.user.username.$error }">
                    <div v-if="submitted && !$v.user.username.required" class="invalid-feedback">Username is required</div>
                </div>

                <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control" v-model="user.password" :class="{ 'is-invalid': submitted && $v.user.password.$error }">
                    <div v-if="submitted && !$v.user.password.required" class="invalid-feedback">Password is required</div>
                </div>
                <div v-if="failed" class="invalid-feedback">Username or password incorrect</div>
                <div class="form-group">
                    <button class="btn btn-success btn-block">Login</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import { required} from 'vuelidate/lib/validators'

    export default {
        data() {
            return {
                user: {
                    username: '',
                    password: '',
                },
                Users: [],
                token: '',
                submitted: false,
                failed: false,
            }
        },
        validations: {
            user: {
                username: {required},
                password: {required},
            }
        },
        created() {
            let apiURL = 'http://localhost:4000/user-api';
            axios.get(apiURL).then(res => {
                this.Users = res.data;
            }).catch(error => {
                console.log(error)
            });
        },
        methods: {
            async handleSubmitForm() {
                this.submitted = true;
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }

                let apiURL = 'http://localhost:4000/user-api/login';
                    
                this.token
                 = await axios.post(apiURL, this.user).then(res => {
                    if (!res.data) {
                        alert("username or password rong");
                        this.failed = true;
                        return;
                    }
                    this.signedIn = true
                    localStorage.setItem("token", res.data);
                    this.$router.push("/calendar");  
                }).catch(error => {
                    console.log(error);
                });

            }
        }
    }
</script>