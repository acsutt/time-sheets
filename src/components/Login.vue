<template>
    <v-row class="justify-center align-center">
        <v-col cols="6">
            <h3 class="text-center">Login</h3>

            <v-form @submit.prevent="handleSubmitForm">
                <v-text-field
                    v-model="user.username"
                    label="Username"
                    prepend-icon="mdi-account-outline"
                    :error-messages="usernameErrors"
                    @input="$v.user.username.$touch()"
                    @blur="$v.user.username.$touch()"
                >
                </v-text-field>
                <v-text-field
                    v-model="user.password"
                    label="Password"
                    prepend-icon="mdi-lock-outline"
                    type="password"
                    :error-messages="passwordErrors"
                    @input="$v.user.password.$touch()"
                    @blur="$v.user.password.$touch()"
                >
                </v-text-field>

                <v-btn
                    color="success"
                    type="submit"
                    @click="handleSubmitForm"
                >Login <v-icon right>mdi-check-circle-outline</v-icon>
                </v-btn>
            </v-form>
        </v-col>
    </v-row>
</template>

<script>
    import axios from 'axios';
    import { required } from 'vuelidate/lib/validators';

    export default {
        data() {
            return {
                user: {
                    username: '',
                    password: '',
                },
                token: '',
                submitted: false,
                failed: false,
            };
        },
        //Validations so form can't be submitted until both username and password are filled in
        validations: {
            user: {
                username: { required },
                password: { required },
            },
        },
        computed: {
            usernameErrors() {
                const errors = [];
                if (!this.$v.user.username.$dirty) return errors;
                !this.$v.user.username.required &&
                    errors.push('Username is required');
                return errors;
            },
            passwordErrors() {
                const errors = [];
                if (!this.$v.user.password.$dirty) return errors;
                !this.$v.user.password.required &&
                    errors.push('Password is required');
                return errors;
            },
        },
        methods: {
            async handleSubmitForm() {
                this.submitted = true;
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }

                let apiURL = 'http://localhost:4000/user-api/login';
                this.token = await axios
                    .post(apiURL, this.user)
                    .then(res => {
                        if (!res.data) {
                            alert('The username or password was incorrect'); //Pop up to alert user of incorrect username or password
                            this.failed = true;
                            return;
                        }
                        localStorage.setItem('token', res.data); //On successful login, token is stored in local storage for use when accessing other pages
                        this.$router.push('/calendar'); //Goes to calendar
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
        },
    };
</script>