l<template>
    <v-row class="justify-center align-center">
        <v-col cols="6">
            <v-app>
                <v-form
                    ref="form"
                    @submit.prevent="handleSubmitForm"
                >
                    <!-- Textfield for entering activity name/title, 32 character limit -->
                    <v-text-field
                        v-model="activity.name"
                        label="Name"
                        prepend-icon="mdi-text-short"
                        :error-messages="nameErrors"
                        @input="$v.activity.name.$touch()"
                        @blur="$v.activity.name.$touch()"
                    ></v-text-field>
                    <!-- Textarea for entering description, no charcter limit -->
                    <v-textarea
                        v-model="activity.description"
                        label="Description"
                        prepend-icon="mdi-text-long"
                    ></v-textarea>
                    <!-- Menu for selecting start time -->
                    <v-menu
                        ref="startTimeMenu"
                        v-model="startTimeMenu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="activity.startTime"
                                label="Start Time"
                                prepend-icon="mdi-clock-time-four-outline"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                :error-messages="startTimeErrors"
                                @input="$v.activity.startTime.$touch()"
                                @blur="$v.activity.startTime.$touch()"
                            ></v-text-field>
                        </template>
                        <v-time-picker
                            v-if="startTimeMenu"
                            v-model="activity.startTime"
                            full-width
                            dark
                            @click:minute="$refs.startTimeMenu.save(activity.startTime)"
                        ></v-time-picker>
                    </v-menu>
                    <!-- Menu for selecting end time -->
                    <v-menu
                        ref="endTimeMenu"
                        v-model="endTimeMenu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="activity.endTime"
                                label="End Time"
                                prepend-icon="mdi-clock-time-four-outline"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                :error-messages="endTimeErrors"
                                @input="$v.activity.endTime.$touch()"
                                @blur="$v.activity.endTime.$touch()"
                            ></v-text-field>
                        </template>
                        <v-time-picker
                            v-if="endTimeMenu"
                            v-model="activity.endTime"
                            full-width
                            dark
                            @click:minute="$refs.endTimeMenu.save(activity.endTime)"
                        ></v-time-picker>
                    </v-menu>
                    <!-- Menu for selecting date -->
                    <v-menu
                        ref="dateMenu"
                        :close-on-content-click="true"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="activity.date"
                                chips
                                small-chips
                                label="Date"
                                prepend-icon="mdi-calendar-blank-outline"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                :error-messages="dateErrors"
                                @input="$v.activity.date.$touch()"
                                @blur="$v.activity.date.$touch()"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="activity.date"
                            no-title
                            scrollable
                            show-adjacent-months
                            first-day-of-week="1"
                            dark
                        >
                        </v-date-picker>
                    </v-menu>
                    <!-- Menu for selecting colour -->
                    <v-menu
                        ref="colorMenu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="activity.color"
                                label="Colour"
                                prepend-icon="mdi-palette-outline"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-color-picker
                            v-model="activity.color"
                            no-title
                            scrollable
                            dark
                            mode="rgba"
                        >
                        </v-color-picker>
                    </v-menu>

                    <v-btn
                        color="success"
                        @click="handleSubmitForm"
                    >
                        Save
                        <v-icon right>mdi-check-circle-outline</v-icon>
                    </v-btn>
                </v-form>
            </v-app>
        </v-col>
    </v-row>
</template>

<script>
    import { required, maxLength } from 'vuelidate/lib/validators';

    export default {
        data() {
            return {
                submitted: false,
                startTimeMenu: false,
                endTimeMenu: false,
            };
        },
        props: ['activity'],
        validations: {
            activity: {
                name: { required, maxLength: maxLength(32) },
                startTime: { required },
                endTime: { required },
                date: { required },
            },
        },
        computed: {
            // Error messages for each entry that requires validation
            nameErrors() {
                const errors = [];
                if (!this.$v.activity.name.$dirty) return errors;
                !this.$v.activity.name.maxLength &&
                    errors.push('Name must be at most 32 characters long');
                !this.$v.activity.name.required && errors.push('Name is required');
                return errors;
            },
            startTimeErrors() {
                const errors = [];
                if (!this.$v.activity.startTime.$dirty) return errors;
                !this.$v.activity.startTime.required &&
                    errors.push('Start time is required');
                return errors;
            },
            endTimeErrors() {
                const errors = [];
                if (!this.$v.activity.endTime.$dirty) return errors;
                !this.$v.activity.endTime.required &&
                    errors.push('End time is required');
                return errors;
            },
            dateErrors() {
                const errors = [];
                if (!this.$v.activity.date.$dirty) return errors;
                !this.$v.activity.date.required && errors.push('Date is required');
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
                this.$emit('update-activity', this.activity);
            },
        },
    };
</script>
