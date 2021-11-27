<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Please sign in or create an account</h3>
            <div
                class="btn-toolbar justify-content-center"
                role="toolbar"
            >
                <div
                    class="btn-group pr-3"
                    role="group"
                >
                    <button
                        class="btn btn-success"
                        @click="login"
                    >Sign in</button>
                </div>
                <div
                    class="btn-group pr-2"
                    role="group"
                >
                    <button
                        class="btn btn-success"
                        @click="register"
                    >Register</button>
                </div>
            </div>
        </div>
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