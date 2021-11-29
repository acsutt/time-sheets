<template>
    <div id="app">
        <v-app>
            <h3 class="text-center">Please sign in or create an account</h3>
            <div
                class="btn-toolbar justify-content-center"
                role="toolbar"
            >
                <div
                    class="btn-group pr-3"
                    role="group"
                >
                    <v-btn
                        color="success"
                        @click="login"
                    >Login</v-btn>
                </div>
                <div
                    class="btn-group pr-2"
                    role="group"
                >
                    <v-btn
                        color="success"
                        @click="register"
                    >Register</v-btn>
                </div>
            </div>
        </v-app>
    </div>
</template>
<script>
    export default {
        methods: {
            login() {
                this.$router.push('/login');
            },
            register() {
                this.$router.push('/register');
            },
        },
    };
</script>