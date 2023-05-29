sap.ui.define([
    "sap/ui/base/ManagedObject",
    'sap/ui/model/json/JSONModel',
    
], function (
    ManagedObject,JSONModel
) {
    "use strict";
    const firebaseConfig = {
        apiKey: "AIzaSyBwwiApfxZkF-_86tp3m_GSd19S5AulpSw",
        authDomain: "smod-repository.firebaseapp.com",
        projectId: "smod-repository",
        storageBucket: "smod-repository.appspot.com",
        messagingSenderId: "539907410648",
        appId: "1:539907410648:web:9b18fcc12a00b2c44d25ad",
        measurementId: "G-Y6LZ4B9EXE"
      };

    return {

        initializeFirebase: function () {
            // Initialize Firebase with the Firebase-config
            if(firebase.apps.length === 0){
                firebase.initializeApp(firebaseConfig);
            }
    

            // Create a Firestore reference
            const firestore = firebase.firestore();
            const firestorage = firebase.storage();
            // Firebase services object
            const oFirebase = {
                firestore: firestore,
                firestorage: firestorage
            };

            // Create a Firebase model out of the oFirebase service object which contains all required Firebase services
            var fbModel = new JSONModel(oFirebase);

            // Return the Firebase Model
            return fbModel;
        },
        addItem:function(oModel,firestore){
            firestore.collection("files").add(oModel)
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                oModel.ItemId = docRef.id;
                firestore.collection("files").doc(docRef.id).update({ItemId:docRef.id});
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        },
         updateItem:function(oModel,firestore){
            firestore.collection("files").doc(oModel.ItemId).update(oModel).catch((error) => {
                console.error("Error update document: ", error);
            });
        },
        getFiles:function(){

        }
    };
});