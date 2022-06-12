<template>
                    <v-row justify="center">
                        <v-dialog
                        v-model="dialog"
                        persistent
                        max-width="350"
                        >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs" v-on="on" color="red lighten-4" x-small fab>
                                <v-icon> mdi-trash-can </v-icon>
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title class="text-h5">
                                Eliminar datos:
                            </v-card-title>
                            <v-card-text> 
                                ¿Desea eliminar la información relacionada a este usuario?
                            </v-card-text>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="red darken-2"
                                text
                                flat
                                @click="cancelar()"
                            >
                                Cancelar.
                            </v-btn>
                            <v-btn
                                color="green darken-2"
                                text
                                @click="bajaUsuario(item.id)"
                            >
                                Aceptar.
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-dialog>
                    </v-row>
                </template>