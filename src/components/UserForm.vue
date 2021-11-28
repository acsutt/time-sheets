<template>
    <div id="app">
        <v-app>
            <!-- <form @submit.prevent="handleSubmitForm">
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
            </form> -->
            <v-form
                ref="form"
                @submit.prevent="handleSubmitForm"
            >
                <v-text-field
                    v-model="user.name"
                    label="Full name"
                    prepend-icon="mdi-card-account-details-outline"
                    :error-messages="nameErrors"
                    @input="$v.user.name.$touch()"
                    @blur="$v.user.name.$touch()"
                >
                </v-text-field>

                <v-text-field
                    v-model="user.email"
                    label="Email"
                    prepend-icon="mdi-email-outline"
                    :error-messages="emailErrors"
                    @input="$v.user.email.$touch()"
                    @blur="$v.user.email.$touch()"
                >
                </v-text-field>

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

                <v-text-field
                    v-model="user.confirmPassword"
                    label="Confirm Password"
                    prepend-icon="mdi-lock-outline"
                    type="password"
                    :error-messages="confirmPasswordErrors"
                    @input="$v.user.confirmPassword.$touch()"
                    @blur="$v.user.confirmPassword.$touch()"
                >
                </v-text-field>

                <v-btn
                    color="success"
                    @click="handleSubmitForm"
                >Save</v-btn>
            </v-form>
        </v-app>
    </div>
</template>
<script>
    import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';

    export default {
        data() {
            return {
                submitted: false,
            };
        },
        props: ['user', 'Users'],
        validations: {
            user: {
                name: { required },
                email: { required, email },
                username: {
                    required,
                    minLength: minLength(4),
                    isUnique(username) {
                        for (let index in this.Users) {
                            console.log(this.Users[index].username);
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
        computed: {
            nameErrors() {
                const errors = [];
                if (!this.$v.user.name.$dirty) return errors;
                !this.$v.user.name.required && errors.push('Full name is required');
                return errors;
            },
            emailErrors() {
                const errors = [];
                if (!this.$v.user.email.$dirty) return errors;
                !this.$v.user.email.email &&
                    errors.push('Email must be valid format');
                !this.$v.user.email.required && errors.push('Email is required');
                return errors;
            },
            usernameErrors() {
                const errors = [];
                if (!this.$v.user.name.$dirty) return errors;
                !this.$v.user.name.minength &&
                    errors.push('Username must be at least 4 characters');
                !this.$v.user.username.isUnique &&
                    errors.push('Username must be unique');
                !this.$v.user.name.required && errors.push('Username is required');
                return errors;
            },
            passwordErrors() {
                const errors = [];
                if (!this.$v.user.password.$dirty) return errors;
                !this.$v.user.password.minLength &&
                    errors.push('Password must be at least 6 characters');
                !this.$v.user.password.required &&
                    errors.push('Password is required');
                return errors;
            },
            confirmPasswordErrors() {
                const errors = [];
                if (!this.$v.user.confirmPassword.$dirty) return errors;
                !this.$v.user.confirmPassword.minLength &&
                    errors.push('Password must be at least 6 characters');
                !this.$v.user.confirmPassword.sameAsPassword &&
                    errors.push('Passwords must match');
                !this.$v.user.confirmPassword.required &&
                    errors.push('Confirm password is required');
                return errors;
            },
        },
        methods: {
            handleSubmitForm() {
                this.submitted = true;
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }
                this.$emit('update-user', this.user);
            },
        },
    };
</script>