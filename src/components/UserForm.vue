<template>
    <v-row class="justify-center align-center">
        <v-col cols="6">
            <v-app>
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
                        v-if="this.crudType == 'edit'"
                        color="error"
                        @click="handleDelete"
                    >Delete</v-btn>
                    <v-btn
                        color="success"
                        @click="handleSubmitForm"
                    >Save</v-btn>
                </v-form>
            </v-app>
        </v-col>
    </v-row>

</template>
<script>
    import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';

    export default {
        props: ['user', 'Users', 'crudType'],
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
                if (!this.$v.user.username.$dirty) return errors;
                !this.$v.user.username.isUnique &&
                    errors.push('Username must be unique');
                !this.$v.user.username.minLength &&
                    errors.push('Username must be at least 4 characters');
                !this.$v.user.username.required &&
                    errors.push('Username is required');
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
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }
                this.$emit('update-user', this.user);
            },
            handleDelete() {
                this.$emit('delete-user', this.user);
            },
        },
    };
</script>