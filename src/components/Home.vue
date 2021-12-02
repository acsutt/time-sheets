<template>
    <div id="app">
        <v-app>
            <v-row
                justify="center"
                align="center"
            >
                <v-card
                    class="justify-center"
                    color="accent-4"
                    dark
                >

                    <v-card-title
                        class="text-center"
                        dark
                    >
                        <h2>Sign in or Create an Account</h2>
                    </v-card-title>
                    <v-card-actions class="justify-space-around">
                        <v-btn
                            color="primary"
                            @click="login"
                            x-large
                        >Login</v-btn>
                        <v-btn
                            color="primary"
                            @click="register"
                            x-large
                        >Register</v-btn>

                    </v-card-actions>

                </v-card>
            </v-row>
        </v-app>
    </div>
</template>
<script>
    export default {
        methods: {
            login() {
                this.$router.push('/login'); //Directs to login page
            },
            register() {
                this.$router.push('/register'); //Directs to register page
            },
        },
    };
</script>