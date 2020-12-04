<template>
<v-main class="list">
    <v-container>
        <v-layout wrap style="margin-top: 50px;">
            <v-flex sm12 md6 offset-md3> 
                <v-card>
                    
                    <v-col md="12">
                        <v-row>
                            <v-col md="12">
                                <v-text-field label="Username">
                                </v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field label="Password">
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col md="12">
                        <v-row>
                            <v-col md=12>
                                <v-btn color="red" class="mr-4" @click="register" >
                                    register
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</v-main>
</template>

