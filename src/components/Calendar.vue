<template>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card card-default">
                <div class="card-header">Calendar</div>
                <v-app>
                    <v-sheet
                        tile
                        height="54"
                        class="d-flex"
                    >
                        <v-btn
                            icon
                            class="ma-2"
                            @click="$refs.calendar.prev()"
                        >
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-btn
                            class="ma-2"
                            @click="changeType"
                            label="Calendar View"
                            outlined
                        >
                            {{ this.type + 'ly view'}}
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                            icon
                            class="ma-2"
                            @click="$refs.calendar.next()"
                        >
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                    </v-sheet>
                    <v-sheet height="600">
                        <v-calendar
                            ref="calendar"
                            v-model="value"
                            :weekdays="weekday"
                            :type="type"
                            :events="events"
                            :event-overlap-mode="mode"
                            :event-overlap-threshold="30"
                            @change="getEvents"
                            @click:event="showEvent"
                            @click:more="viewWeek"
                            @click:date="viewWeek"
                        ></v-calendar>
                        <v-menu
                            v-model="selectedOpen"
                            :close-on-content-click="false"
                            :activator="selectedElement"
                            offset-x
                        >
                            <v-card
                                color="grey lighten-4"
                                min-width="350px"
                                flat
                            >
                                <v-toolbar
                                    :color="selectedEvent.color"
                                    dark
                                >
                                    <router-link :to="{name: 'edit-activity', params: { id: selectedEvent.id }}">
                                        <v-icon>mdi-pencil</v-icon>
                                    </router-link>
                                    <v-spacer></v-spacer>
                                    <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                                    <v-spacer></v-spacer>
                                    <v-btn icon>
                                        <v-icon>mdi-dots-vertical</v-icon>
                                    </v-btn>
                                </v-toolbar>
                                <v-card-text>
                                    <span v-html="selectedEvent.desc"></span>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn
                                        text
                                        color="secondary"
                                        @click="selectedOpen = false"
                                    >
                                        Cancel
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-menu>
                    </v-sheet>
                </v-app>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                Activities: [],
                loggedActivities: [],
                type: 'month',
                mode: 'stack',
                weekday: [1, 2, 3, 4, 5, 6, 0],
                value: '',
                events: [],
                selectedEvent: {},
                selectedElement: null,
                selectedOpen: false,
            };
        },
        created() {
            let apiURL = 'http://localhost:4000/activity-api';
            axios
                .get(apiURL)
                .then(res => {
                    this.Activities = res.data;
                    this.getEvents();
                })
                .catch(error => {
                    console.log(error);
                });
        },
        methods: {
            getEvents() {
                const events = [];
                for (const activity of Object.entries(this.Activities)) {
                    events.push({
                        id: activity[1]._id,
                        name: activity[1].name,
                        desc: activity[1].description,
                        start: activity[1].date.split('T')[0],
                        end: activity[1].date.split('T')[0],
                        color: activity[1].color,
                    });
                }
                this.events = events;
            },
            showEvent({ nativeEvent, event }) {
                const open = () => {
                    this.selectedEvent = event;
                    this.selectedElement = nativeEvent.target;
                    requestAnimationFrame(() =>
                        requestAnimationFrame(() => (this.selectedOpen = true))
                    );
                };

                if (this.selectedOpen) {
                    this.selectedOpen = false;
                    requestAnimationFrame(() =>
                        requestAnimationFrame(() => open())
                    );
                } else {
                    open();
                }

                nativeEvent.stopPropagation();
            },
            viewWeek({ date }) {
                this.focus = date;
                this.type = 'week';
            },
            changeType() {
                if (this.type == 'week') {
                    this.type = 'month';
                } else {
                    this.type = 'week';
                }
            },
        },
    };
</script>


