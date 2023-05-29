sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/m/Link",
    "com/smod/smodrepository/libs/loadash",
    "com/smod/smodrepository/ui/localStorage"
], function (
    Controller,
	MessageToast,
	JSONModel,
	Fragment,
	Link,
	loadash,
	localStorage,
) {
    "use strict";

    return Controller.extend("com.smod.smodrepository.controller.Detail", {
        /**
         * @override
         */
        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("Detail").attachPatternMatched(this._onObjectMatched, this);
            var oView = this.getView();

            var addedTXTmodel = new JSONModel({
                newAddTXT: this._emptyNewTXT()

            });
            oView.setModel(addedTXTmodel, "newAddTXT");

            var addedFilemodel = new JSONModel({
                newAddFile: this._emptyNewFile(),
            });
            oView.setModel(addedFilemodel, "newAddFile");


        },
        onAddNewTxt: function (oEvent) {
            if (!this._oNewTXTDialog) {
                Fragment.load({
                    id: "dialogFragTXT",
                    name: "com.smod.smodrepository.view.AddTXT",
                    controller: this
                })
                    .then(function (oDialog) {
                        this._oNewTXTDialog = oDialog;
                        this.getView().addDependent(this._oNewTXTDialog);
                        this._oNewTXTDialog.setTitle("Add Code");
                        this._oNewTXTDialog.open();
                    }.bind(this));
            } else {
                this._oNewTXTDialog.setTitle("Add Code");
                this._oNewTXTDialog.open();
            }
        },
        onAddNewFile: function (oEvent) {
            if (!this._oNewFileDialog) {
                Fragment.load({
                    id: "dialogFragFile",
                    name: "com.smod.smodrepository.view.AddFile",
                    controller: this
                })
                    .then(function (oDialog) {
                        this._oNewFileDialog = oDialog;
                        this.getView().addDependent(this._oNewFileDialog);
                        this._oNewFileDialog.setTitle("Add File");
                        this._oNewFileDialog.open();
                    }.bind(this));
            } else {
                //this._oNewFileDialog.setModel(this.getView().getModel("newProjectModel"));
                this._oNewFileDialog.setTitle("Add File");
                this._oNewFileDialog.open();
            }
        },

        onPress: function (oEvent) {
            var isFile = oEvent.getSource().getBindingContext("currProject").getObject().isFile;
            if (isFile) {
                var oClickedFile = oEvent.getSource().getBindingContext("currProject").getObject();
                var aSplitedPath = oEvent.getSource().getBindingContextPath().split("/");

                var currPath = this.getView().getModel("currProject").getProperty("/currPath");
                this.getView().getModel("currProject").setProperty("/prePath", currPath);


                var nextPath = currPath + "/" + aSplitedPath[aSplitedPath.length - 1] + "/sourceCodes";
                this.getView().getModel("currProject").setProperty("/currPath", nextPath);
                this.getView().getModel("currProject").setProperty("/currPathSourceCodes", oClickedFile.sourceCodes);
                var oBreadcrumbsModel = this.getView().getModel("breadCrumbs")
                var aBreadcrumbs = oBreadcrumbsModel.getProperty("/breadcrumbs");
                var oNewBreadcrumbs = _.clone(oBreadcrumbsModel.getProperty("/newBreadCrumb"));
                oNewBreadcrumbs.text = oClickedFile.name;
                oNewBreadcrumbs.target = nextPath;
                aBreadcrumbs.push(oNewBreadcrumbs);
                oBreadcrumbsModel.setProperty("/breadcrumbs", aBreadcrumbs);


            }
            else {
                var oItem = oEvent.getSource();
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("Content", {
                    path: window.encodeURIComponent(oItem.getBindingContext("currProject").getPath().substr(1)),
                });
            }
        },
        handleDialogOkButton: function () {
            var oAddedTXTModel = this.getView().getModel("newAddTXT");
            var oNewTXT = oAddedTXTModel.getProperty("/newAddTXT");
            var y = this.getView().getModel("currProject").getProperty("/currPath");
            var preObject = this.getView().getModel("currProject").getProperty("/prePath");
            // var currObject = this.getView().getModel("projects").getProperty(preObject);
            var currSourceCodes = this.getView().getModel("projects").getProperty(y);
            //oNewTXT.parent = currObject.id;
            oNewTXT.isFile = false;
            oNewTXT.keywords = this._formatKeywords(oNewTXT.keywords);
            oNewTXT.name = oNewTXT.name.replaceAll(" ", "_"); // boşluklara _ koy
            currSourceCodes.push(oNewTXT);
            this.getView().getModel("projects").setProperty(y, currSourceCodes);
            //this.getView().getModel("fileModel").setProperty("/files",currSourceCodes );
            this.getView().getModel("currProject").setProperty("/currPathSourceCodes", currSourceCodes);
            localStorage.updateData(this.getView().getModel("projects").getProperty("/projects"));
            MessageToast.show(oNewTXT.name + "  added");

            oAddedTXTModel.setProperty("/newAddTXT", this._emptyNewTXT());
            this._oNewTXTDialog.close();
        },
        handleDialogCancelButton: function () {
            var oAddedTXTModel = this.getView().getModel("newAddTXT");
            oAddedTXTModel.setProperty("/newAddTXT", this._emptyNewTXT());
            this._oNewTXTDialog.close();
        },
        handleDialogOkFileButton: function () {
            var oAddedFileModel = this.getView().getModel("newAddFile");
            var oNewFile = oAddedFileModel.getProperty("/newAddFile");
            var y = this.getView().getModel("currProject").getProperty("/currPath");
            //var currObject = this.getView().getModel("projects").getProperty(y);
            var currSourceCodes = this.getView().getModel("projects").getProperty(y);
            //oNewFile.parent = currObject.id;
            oNewFile.isFile = true;
            currSourceCodes.push(oNewFile);
            this.getView().getModel("projects").setProperty(y, currSourceCodes);
            this.getView().getModel("currProject").setProperty("/currPathSourceCodes", currSourceCodes);
            localStorage.updateData(this.getView().getModel("projects").getProperty("/projects"));
            MessageToast.show(oNewFile.name + "  added");

            oAddedFileModel.setProperty("/newAddFile", this._emptyNewFile());
            this._oNewFileDialog.close();
        },
        handleDialogCancelFileButton: function () {
            this._oNewFileDialog.close();
        },
        onSelectObject: function (oEvent) {
            var selectedObjectPath = oEvent.getSource()._aSelectedPaths[0];
            var aSplittedPath = selectedObjectPath.split("/");
            this.selectedIndexDelete = aSplittedPath[aSplittedPath.length - 1];
        },
        onDeleteItem: function () {
            if(this.selectedIndexDelete !=="-1"){
                if (!this._oNewApprovalDialog) {
                    Fragment.load({
                        id: "dialogApproval",
                        name: "com.smod.smodrepository.view.Approval",
                        controller: this
                    })
                        .then(function (oDialog) {
                            this._oNewApprovalDialog = oDialog;
                            this.getView().addDependent(this._oNewApprovalDialog);
                            this._oNewApprovalDialog.setTitle("Approval");
                            this._oNewApprovalDialog.open();
                        }.bind(this));
                } else {
                    this._oNewApprovalDialog.setTitle("Approval");
                    this._oNewApprovalDialog.open();
                }
             }
             else {
                 MessageToast.show("Select file !");
             }
            
           
        },
        handleCancelApproveEvent: function(){
            this._oNewApprovalDialog.close();
        },
        handleOkApproveEvent: function(){
            if(this.selectedIndexDelete !=="-1"){
                var oCurrPathModel = this.getView().getModel("currProject");
                var oCurrProjectModel = this.getView().getModel("projects");
                var currSourceCodes = oCurrProjectModel.getProperty(oCurrPathModel.getProperty("/currPath"));

                currSourceCodes.splice(this.selectedIndexDelete, 1);
                oCurrProjectModel.setProperty(oCurrPathModel.getProperty("/currPath"), currSourceCodes);
                oCurrPathModel.setProperty("/currPathSourceCodes", currSourceCodes);
                localStorage.updateData(oCurrProjectModel.getProperty("/projects"));
                this.getView().byId("ShortProductList").removeSelections(true);
                this.selectedIndexDelete = "-1";
                this._oNewApprovalDialog.close();
            }
            else {
                MessageToast.show("Please choose a item !");
                this._oNewApprovalDialog.close();
            }
        },
        onPressBreadCrumb: function (oEvent) {
            var oSource = oEvent.getSource();
            var target = oEvent.getSource().getTarget();
            var oView = this.getView();

            var oProjectModel = oView.getModel("projects");
            var oCurrProjectModel = oView.getModel("currProject");
            var oBreadcrumbsModel = oView.getModel("breadCrumbs");
            var aBreadCrumbs = oBreadcrumbsModel.getProperty("/breadcrumbs");
            var selectedCrumpPath = oSource.getBindingContext("breadCrumbs").getPath();
            var aSplittedPath = selectedCrumpPath.split("/");
            var length = aSplittedPath.length;
            var selectedIndex = aSplittedPath[length - 1];
            aBreadCrumbs = aBreadCrumbs.slice(0, (parseInt(selectedIndex) + 1));


            var aSourceCodes = oProjectModel.getProperty(target);
            oCurrProjectModel.setProperty("/currPath", target);
            oCurrProjectModel.setProperty("/currPathSourceCodes", aSourceCodes);
            oBreadcrumbsModel.setProperty("/breadcrumbs", aBreadCrumbs);

        },
        _formatKeywords: function (sKeyWords) {
            var aKeywords = sKeyWords.split(",");
            var aClearKeywords = []
            aKeywords.forEach(keyword => {
                keyword = keyword.trim().replaceAll(" ", "-");
                aClearKeywords.push(keyword)
            });
            return aClearKeywords.toString();
        },
        _emptyNewTXT: function () {
            var newAddTXT = {
                name: "",
                createdBy: "",
                id: new Date().getTime(),
                parent: 0,
                content: "",
                isFile: false,
                keywords: "",
                sourceCodes: [],
            }
            return newAddTXT;
        },
        _emptyNewFile: function () {
            var newAddFile = {
                id: new Date().getTime(),
                name: "",
                content: "",
                isFile: true,
                sourceCodes: [],
            }
            return newAddFile;
        },
        _onObjectMatched: function (oEvent) {
            var oView = this.getView();
            var fileModel = new JSONModel({
                files: [],
            })
            var breadCrumbsModel = new JSONModel({
                breadcrumbs: [
                ],
                newBreadCrumb: {
                    text: "",
                    target: "",
                },
            });
            oView.setModel(breadCrumbsModel, "breadCrumbs");
            oView.setModel(fileModel, "fileModel");
            oView.bindElement({
                path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").path),
                model: "projects"
            });
            var allProjects = this.getOwnerComponent().getModel("projects");
            var selectedProjectPath = oView.getElementBinding("projects").getPath();
            var selectedProject = _.clone(allProjects.getProperty(selectedProjectPath));
            oView.getModel("currProject").setProperty("/project", selectedProject);

            oView.getModel("currProject").setProperty("/currPath", selectedProjectPath + "/sourceCodes");



            oView.getModel("currProject").setProperty("/prePath", selectedProjectPath + "/sourceCodes");
            oView.getModel("currProject").setProperty("/currPathSourceCodes", selectedProject.sourceCodes);
        },
    });
});