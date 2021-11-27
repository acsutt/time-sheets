<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Register</h3>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label class="required">Full name</label>
                    <input
                        type="text"
                        class="form-control"
                        v-model="user.name"
                        :class="{ 'is-invalid': submitted && $v.user.name.$error }"
                    >
                    <div
                        v-if="submitted && !$v.user.name.required"
                        class="invalid-feedback"
                    >Name is required</div>
                </div>

                <div class="form-group">
                    <label class="required">Email</label>
                    <input
                        type="email"
                        class="form-control"
                        v-model="user.email"
                        :class="{ 'is-invalid': submitted && $v.user.email.$error }"
                    >
                    <div
                        v-if="submitted && $v.user.email.$error"
                        class="invalid-feedback"
                    >
                        <span v-if="!$v.user.email.required">Email is required</span>
                        <span v-if="!$v.user.email.email">Email is invalid</span>
                    </div>
                </div>

                <div class="form-group">
                    <label class="required">Username</label>
                    <input
                        type="text"
                        class="form-control"
                        v-model="user.username"
                        :class="{ 'is-invalid': submitted && $v.user.username.$error }"
                    >
                    <div
                        v-if="submitted && $v.user.username.$error"
                        class="invalid-feedback"
                    >
                        <span v-if="!$v.user.username.required">Username is required</span>
                        <span v-if="!$v.user.username.minLength">Username must be at least 4 characters</span>
                        <span v-else-if="!$v.user.username.isUnique">Username must be unique</span>
                    </div>
                </div>

                <div class="form-group">
                    <label class="required">Password</label>
                    <input
                        type="password"
                        class="form-control"
                        v-model="user.password"
                        :class="{ 'is-invalid': submitted && $v.user.password.$error }"
                    >
                    <div
                        v-if="submitted && $v.user.password.$error"
                        class="invalid-feedback"
                    >
                        <span v-if="!$v.user.password.required">Password is required</span>
                        <span v-if="!$v.user.password.minLength">Password must be at least 6 characters</span>
                    </div>
                </div>

                <div class="form-group">
                    <label class="required">Confirm Password</label>
                    <input
                        type="password"
                        class="form-control"
                        v-model="user.confirmPassword"
                        :class="{ 'is-invalid': submitted && $v.user.confirmPassword.$error }"
                    >
                    <div
                        v-if="submitted && $v.user.confirmPassword.$error"
                        class="invalid-feedback"
                    >
                        <span v-if="!$v.user.confirmPassword.required">Confirm Password is required</span>
                        <span v-if="!$v.user.confirmPassword.minLength">Confirm Password must be at least 6 characters</span>
                        <span v-else-if="!$v.user.confirmPassword.sameAsPassword">Passwords must match</span>
                    </div>
                </div>

                <div class="form-group">
                    <button class="btn btn-success btn-block">Register</button>
                </div>
            </form>

        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';

    export default {
        data() {
            return {
                user: {
                    name: '',
                    email: '',
                    username: '',
                    password: '',
                    confirmPassword: '',
                    admin: false,
                },
                submitted: false,
                Users: [],
                usernameList: [],
            };
        },
        validations: {
            user: {
                name: { required },
                email: { required, email },
                username: {
                    required,
                    minLength: minLength(4),
                    isUnique(username) {
                        for (let index in this.Users) {
                            if (username === this.Users[index].username) {
                                return false;
                            }
                        }
                        return true;
                    },
                },
                password: { required, minLength: minLength(6) },
                confirmPassword: {
                    required,
                    sameAsPassword: sameAs('password'),
                    minLength: minLength(6),
                },
            },
        },
        created() {
            let apiURL = 'http://localhost:4000/user-api';
            axios
                .get(apiURL)
                .then(res => {
                    this.Users = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        methods: {
            handleSubmitForm() {
                this.submitted = true;
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }

                let apiURL = 'http://localhost:4000/user-api/register';
                console.log(this.user);
                axios
                    .post(apiURL, this.user)
                    .then(() => {
                        this.$router.push('/login');
                        this.user = {
                            name: '',
                            username: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                            admin: false,
                        };
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
        },
    };
</script>

<style>
    .required:after {
        content: ' *';
        color: red;
    }
</style>