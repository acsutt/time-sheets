<template>
    <div id="app">
        <!-- <nav class="navbar navbar-dark bg-primary justify-content-between flex-nowrap flex-row">
            <div class="container">
                <a class="navbar-brand pl-5 pr-2">Time Sheets</a>
                <ul class="nav navbar-nav flex-row mr-auto">
                    <li class="nav-item">
                        <router-link
                            class="nav-link pr-4"
                            to="/log-activity"
                        >Log Activity</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link
                            class="nav-link pr-4"
                            to="/calendar"
                        >Calendar</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link
                            class="nav-link pr-4"
                            to="/view"
                        >View</router-link>
                    </li>
                </ul>
                <ul class="nav navbar-nav flex-row ml-auto">
                    <li class="nav-item pa-2">
                        <v-btn
                            class="nav-link"
                            @click="logOut"
                        >Logout</v-btn>
                    </li>
                </ul>
            </div>
        </nav> -->
        <v-app>
            <v-app-bar
                color="accent-4"
                dark
                app
            >
                <v-toolbar-title>Time Sheets</v-toolbar-title>
                <v-spacer></v-spacer>

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
                            v-for="item in userItems"
                            :key="item.title"
                            link
                        >
                            <v-list-item-icon>
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
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
                <v-container fluid>
                    <router-view fluid></router-view>
                </v-container>
            </v-main>
        </v-app>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                signedIn: false,
                userItems: [
                    { title: 'Account', icon: 'mdi-account-box' },
                    { title: 'Admin', icon: 'mdi-gavel' },
                ],
                drawer: null,
            };
        },
        name: 'App',

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
            logOut() {
                this.signedIn = false;
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
    }
</style>