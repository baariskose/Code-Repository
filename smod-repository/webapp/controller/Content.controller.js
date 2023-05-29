sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "com/smod/smodrepository/libs/loadash",
    "com/smod/smodrepository/ui/customDOM",
    "sap/m/MessageToast"
    
], function (
    Controller,
	JSONModel,
	loadash,
	customDOM,
	MessageToast
) {
    "use strict";

    return Controller.extend("com.smod.smodrepository.controller.Content", {
        /**
         * @override
         */
        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("Content").attachPatternMatched(this._onObjectMatched, this);
            

        },
        _onObjectMatched: function (oEvent) {
            var oViewModel = new JSONModel({
                isEditMode: false,
            });
            this.getView().setModel(oViewModel, "currMode");

            oViewModel.setProperty("/isEditMode", false);
            var oModel = new JSONModel({
                selectedItem: null,
            })
            this.getView().setModel(oModel, "selectedItem");
            var oView = this.getView();
           
            this.path = window.decodeURIComponent(oEvent.getParameter("arguments").path)
            var aSplittedPath = this.path.split("/");

            var selectedObject =  _.clone( this.getView().getModel("projects").getProperty(oView.getModel("currProject").getProperty("/currPath") + "/" + aSplittedPath[aSplittedPath.length - 1]));
            this.getView().getModel("selectedItem").setProperty("/selectedItem", selectedObject);
            //var selectedProject = allProjects.getProperty(selectedProjectPath);
            //oView.getModel("currProject").setProperty("/project", selectedProject);
        },
        onChangeMode: function () {
            var oViewModel = this.getView().getModel("currMode");
            var currMode = oViewModel.getProperty("/isEditMode");
            var newMode = !currMode;
            oViewModel.setProperty("/isEditMode", newMode);
        },
        onSave: function () {
            var oProjectsModel = this.getView().getModel("projects");
            var oCurrProjectsModel = this.getView().getModel("currProject");
            var oCurrViewModel =  this.getView().getModel("selectedItem");
            var oItem = oCurrViewModel.getProperty("/selectedItem");
            var oViewModel = this.getView().getModel("currMode");
            var currMode = oViewModel.getProperty("/isEditMode");
            var newMode = !currMode;
            oViewModel.setProperty("/isEditMode", newMode);
            var aSplittedPath = this.path.split("/");

            var selectedObject = oProjectsModel.getProperty(oCurrProjectsModel.getProperty("/currPath") + "/" + aSplittedPath[aSplittedPath.length - 1]);
            var xcurrPath = oCurrProjectsModel.getProperty("/currPath") + "/" + aSplittedPath[aSplittedPath.length - 1];

            selectedObject.content = oItem.content;
            oProjectsModel.setProperty(xcurrPath,selectedObject);
        },
        onCopy: function(oEvent){
            var that = this;
            Promise.all([that._getCopyText(oEvent, "CopyPassword")]).then(function (param) {
                param = param[0];
                var textArea = customDOM.createTextArea(param);
                customDOM.insertTextArea(textArea);
                textArea.select();
                try {
                    var successful = customDOM.execCommand();
                    var sMsg = successful ? "successful" : "unsuccessful";
                    MessageToast.show("Copied " + sMsg);
                } catch (err) {
                 //   MessageToast.show("olmadı");
                }
                customDOM.removeChild(textArea);
            }).catch(function (param) {
                MessageBox.error(param.message);
            });
        },
        _getCopyText: function (oEvent, type) {
            var that = this;
            return new Promise(function (resolved, rejected) {
                var text = that.getView().byId("codedTetxt").getCode();
                return resolved(text);
            });
        }

    });
});