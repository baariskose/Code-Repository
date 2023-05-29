sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'com/smod/smodrepository/Firebase',
    'sap/ui/model/json/JSONModel',

], function (
    Controller,
    Firebase,
    JSONModel,

) {
    "use strict";

    return Controller.extend("com.smod.smodrepository.controller.FileView", {
        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("FileView").attachPatternMatched(this._onObjectMatched, this);
            this.ItemId  = "";
            this.getView().setModel(Firebase.initializeFirebase(), "firebase");
            // Create a Firestore reference
            const firestorage = this.getView().getModel("firebase").getData().firestorage;
                        
            var storageRef = firestorage.ref(this.ItemId+".txt");
            var readedText = "zavv";
            var that = this;
            //var message = 'data:text/plain,xxxxxxxxxx';
            // storageRef.putString(message, 'data_url').then((snapshot) => {
            //     console.log('Uploaded a data_url string!');
            // });

            var oViewModel = new sap.ui.model.json.JSONModel({
                codeContent: "",
            });

            this.getView().setModel(oViewModel, "codeViewModel");
            storageRef.getDownloadURL()
                .then((url) => {
                    // `url` is the download URL for 'images/stars.jpg'

                    // This can be downloaded directly:
                    var xhr = new XMLHttpRequest();
                    xhr.responseType = 'text';
                    xhr.onload = (event) => {
                        that.readedText = xhr.response;
                       
                        that.getView().byId("textArea").setValue(that.readedText);
                        that.getView().getModel("codeViewModel").setProperty("/codeContent",that.readedText);

                    };
                    xhr.open('GET', url);
                    xhr.send();

                })
                .catch((error) => {
                    console.log(error);
                });
        },
        _onObjectMatched: function (oEvent) {
            this.getView().bindElement({
                path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").filePath),
                model: "files"
            });
            this.ItemId =window.decodeURIComponent(oEvent.getParameter("arguments").itemId);
        },
       
    });
});