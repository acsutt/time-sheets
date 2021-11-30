<template>
    <div id="app">
        <v-app>
            <v-app-bar
                color="accent-4"
                dark
                app
            >
                <v-toolbar-title>Time Sheets</v-toolbar-title>
                <v-spacer />
                <router-link
                    class="nav-link pr-4"
                    to="/log-activity"
                >
                    <v-btn
                        class="ma-2"
                        color="primary"
                        dark
                    >
                        Log Time
                        <v-icon right>mdi-clock-plus-outline</v-icon>
                    </v-btn>
                </router-link>
                <router-link
                    class="nav-link pr-4"
                    to="/calendar"
                >
                    <v-btn
                        class="ma-2"
                        color="primary"
                        dark
                    >
                        Calendar
                        <v-icon right>mdi-calendar-month-outline</v-icon>
                    </v-btn>
                </router-link>

                <v-menu
                    ref="menu"
                    :close-on-content-click="true"
                    transition="scale-transition"
                    min-width="auto"
                    origin="top right"
                    class="deep-purple accent-4"
                    dark
                    left
                    offset-y
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon>mdi-account-box-outline</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item
                            @click="$router.push('/manage-user')"
                            link
                        >
                            <v-list-item-icon>
                                <v-icon>mdi-cog-outline</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>Account</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item
                            @click="$router.push('/manage-activities')"
                            link
                        >
                            <v-list-item-icon>
                                <v-icon>mdi-calendar-edit</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>Manage Calendar</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-btn
                                @click="logOut"
                                class="ma-2"
                                color="primary"
                                dark
                            >
                                Logout
                                <v-icon right>mdi-logout-variant</v-icon>
                            </v-btn>
                        </v-list-item>

                    </v-list>
                </v-menu>
            </v-app-bar>

            <v-main>

                <v-container>
                    <router-view>
                    </router-view>
                </v-container>
            </v-main>
        </v-app>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                drawer: null,
            };
        },
        name: 'App',
        methods: {
            logOut() {
                localStorage.clear();
                this.$router.push('/');
            },
        },
    };
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        overflow: hidden;
    }
</style>