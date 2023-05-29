sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    'sap/m/Token',
    'com/smod/smodrepository/Firebase',
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "com/smod/smodrepository/libs/loadash",
    "com/smod/smodrepository/ui/localStorage"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,
	JSONModel,
	Filter,
	FilterOperator,
	Token,
	Firebase,
	Fragment,
	MessageToast,
	loadash,
	localStorage
    ) {
        "use strict";

        return Controller.extend("com.smod.smodrepository.controller.InitialView", {

            onInit: function () {
                localStorage.createAndPushData();
                var allData = localStorage.GetDataById();
                allData =this._iterateProjectsData(allData);
               
                this.getOwnerComponent().getModel("projects").setProperty("/projects", allData);
                // modeldeki yapıyı tanımla
                // const app = initializeApp(firebaseConfig);
                //const analytics = getAnalytics(app);
                var projectModel = new JSONModel({
                    newProject: {
                        id: new Date().getTime(),
                        description: "",
                        name: "",
                        type: "",
                        typeKey: 1,
                        creationDate: new Date(),
                        createdBy: "",
                        sourceCodes: [
                        ]
                    },
                    currFile: null
                });
                var currSelectedProjectType = new JSONModel({
                    currSelectedType: "ABAP",
                    currSelectedTypeId: 1,
                });
                var nonFilterProjectModel = new JSONModel({

                    projects: [],
                });

                this.getView().setModel(projectModel, "newProjectModel");
                this.getView().setModel(currSelectedProjectType, "currSelectedProjectModel");
                this.getView().setModel(nonFilterProjectModel, "nonFilterProjects");
                var defaultprojects = this.getOwnerComponent().getModel("projects").getProperty("/projects");
                this.getView().getModel("nonFilterProjects").setProperty("/projects", defaultprojects);


                //this.getView().setModel(fileShowModel, "fileShowModel");
                //this.getView().setModel(Firebase.initializeFirebase(), "firebase");
                // Create a Firestore reference
                //const firestore = this.getView().getModel("firebase").getData().firestore;
                // Create a collection reference to the shipments collection
                //const collRefShipments = firestore.collection("files");
                //var addedData = this.getView().getModel("fileShowModel").getProperty("/newFile");
                // Firebase.addItem(addedData,firestore);
                // Initialize an array for the shipments of the collection as an object


                // Create and set the created object to the the shipmentModel

                // Get single set of shipments once
                //  this.getFiles(collRefShipments);
                // this.getFilesNested(firestore);
                var oView = this.getView();
                this.oMultiInput1 = oView.byId("multiInput1");
                this.oMultiInput1.addValidator(this.fnValidator);
            },
            // getFilesNested: function (firestore, path) {
            //     var x = firestore.collection(path).get().then(
            //         function (collection) {
            //             var files = collection.docs.map(function (docFiles) {
            //                 return docFiles.data();
            //             });

            //         });
            // },
            // getFiles: function (collRefShipments) {
            //     collRefShipments.get().then(
            //         function (collection) {
            //             var fileModel = this.getView().getModel("files");
            //             var fileData = fileModel.getData();
            //             var files = collection.docs.map(function (docFiles) {
            //                 return docFiles.data();
            //             });

            //             files = this._convertDateforArray(files);
            //             fileData.files = files;
            //             this.getView().getModel("files").setProperty("/files", fileData.files);
            //             //this.getView().byId("fileList").getBinding("items").refresh();
            //         }.bind(this));
            // },
            onWordsUpdate: function (oEvent) {
                var funcType = oEvent.getParameter("type"); // tokens type add or removed
                var a = oEvent.getSource().getTokens(); // get all input tokens
                if (funcType === "removed") { // token siliniyorsa gir
                    var deletedToken = oEvent.getParameter("removedTokens")[0]; // silinen tokenı al
                    var index = a.indexOf(deletedToken); // silinen tokenın indexini bul
                    a.splice(index, 1); // tokeni token arrayden sil
                    var allprojectModel = this.getView().getModel("nonFilterProjects"); // filtre yapılmamış projeler
                    var defaultProjects = allprojectModel.getProperty("/projects"); // model içindeki array ulaş
                    this.getView().getModel("projects").setProperty("/projects", defaultProjects); // gözüken arrayleri filtrelenmemiş projects e koy
                };
                this.aTokensText = []; // her seferinde keyword inputlarını boşalt
                a.forEach(element => { // seçilen tokenları token arrayine koy
                    this.aTokensText.push(element.getProperty("text"));
                    // kullanıcıdan gelen tokenların textleri alınabiliyor, filtrelemee yapılacak
                });
                this.oMultiInput1.addValidator(this.fnValidator);
            },

            fnValidator: function (args) { // yeni token oluştur
                var text = args.text;

                return new Token({ key: text, text: text.toLowerCase() });
            },
            onProjectTypeChange: function (oEvent) { // yeni proje eklerken proje tipini değiştirdiğinde çalışacak kod
                var selectedItem = oEvent.getSource().getSelectedItem().getText();
                var selectedItemId = oEvent.getSource().getSelectedItem().getKey();
                var oModel = this.getView().getModel("currSelectedProjectModel");
                oModel.setProperty("/currSelectedType", selectedItem);
                oModel.setProperty("/currSelectedTypeId", selectedItemId);
            },
            onSearch: function () { // arama butonunna basıldığında çalışacak kod
                var projectModel = this.getView().getModel("projects"); // filtrelenecek ve gösterilecek model
                this.filteredProjects = []; // filtrelenmiş projeleri tutacak array
                var allProjects = this.getView().getModel("nonFilterProjects").getProperty("/projects");
                if (this.aTokensText.length > 0) { // inputta token varsa çalışır
                    allProjects.forEach(element => {
                        this._filterArrayWithKeywords(element.sourceCodes, this.aTokensText, element); // filtrelencek projelerin ilk sourceCodes ları gönderilir her bir projenin
                        var aSplittedElementName = element.name.split("_"); // name i _ ile parçala
                        aSplittedElementName.forEach(namePart => {
                            if (this.aTokensText.includes(namePart.toLowerCase())) {
                                if (!this.filteredProjects.includes(element)) { // proje daha önce eklendi mi kontrolü
                                    this.filteredProjects.push(element); // proje eklendi
                                };
                            }
                        });
                    });
                    projectModel.setProperty("/projects", this.filteredProjects); // filtrelenen projeler project property sine atılır
                }
                else {
                    MessageToast.show("Enter at least a keyword"); // keyword girilmemişse toast mesaj olarak uyarı verilir.
                    projectModel.setProperty("/projects", allProjects); // keyword yoksa default filtrelenmemiş projeler gösterilir
                }
            },
            _filterArrayWithKeywords: function (aSourceCodes, aInputKeywords, project) {
                aSourceCodes.forEach(element => { // her source code içerisindeki her dosyayı takip eder 
                    if (!element.isFile) { // türü dosya değil ise keywordü vardır. 
                        this._filterArrayWithContent(element.content, aInputKeywords, project)
                        var aKeywords = element.keywords.split(",");
                        aKeywords.forEach(keyword => {
                            console.log(keyword);
                            if (aInputKeywords.includes(keyword, 0)) {
                                if (!this.filteredProjects.includes(project, 0))
                                    this.filteredProjects.push(project);
                            }
                        });
                    }
                    else {
                        this._filterArrayWithKeywords(element.sourceCodes, aInputKeywords, project);
                    }
                });
            },
            _filterArrayWithContent: function (content, aInputKeywords, project) {
                aInputKeywords.forEach(keyword => {
                    var position = content.toString().toLowerCase().search(keyword.toLowerCase());
                    if (position != -1) {
                        if (!this.filteredProjects.includes(project)){
                            this.filteredProjects.push(project);
                        }
                    }
                });
            },
            onAddNewFile: function () {
                this.sPath = null;
                this.getView().byId("fileList").removeSelections(true);
                this._arrangeDialogFragment("Create file", "Create");
            },
            handleSelectFile: function (oEvent) {
                this.sPath = oEvent.getSource().getSelectedContextPaths();
            },
            onEditFile: function (oEvent) {

                if (this.sPath) {
                    this._arrangeDialogFragment("Edit file", "Edit");
                }
                else {
                    MessageToast.show("Select file!")
                }
            },
            onDeleteFile: function(oEvent){
                if(this.sPath){
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
            handleDialogCancelButton: function () {
                //this.sPath = null;
                this._oNewFileDialog.close();
            },
            handleDialogOkButton: function () {
                //  const firestore = this.getView().getModel("firebase").getData().firestore;
                // const collRefShipments = firestore.collection("files");
                var projectModel = this.getView().getModel("projects");
                var aProjects = projectModel.getProperty("/projects");
                var oProjectTypeModel = this.getView().getModel("currSelectedProjectModel");
                var oDefaultProjectModel = this.getView().getModel("nonFilterProjects");


                var oProjectModel = this.getView().getModel("newProjectModel");
                var newFile = oProjectModel.getProperty("/newProject");
                var sFileName = Fragment.byId("dialogFrag", "dialogfileName").getValue();
                var sCreatedBy = Fragment.byId("dialogFrag", "dialogCreatedBy").getValue();
                var sDescription = Fragment.byId("dialogFrag", "dialogDescription").getValue();
                newFile.name = sFileName.toUpperCase();
                newFile.createdBy = sCreatedBy;
                newFile.creationTime = new Date();
                newFile.description = sDescription;

                newFile.typeKey = oProjectTypeModel.getProperty("/currSelectedTypeId");
                newFile.type = oProjectTypeModel.getProperty("/currSelectedType");
                if (!this.sPath) {
                    // Firebase.addItem(newFile, firestore);
                    newFile.name = newFile.name.replaceAll(" ", "_")
                    aProjects.push(newFile);
                    projectModel.setProperty("/projects", aProjects);
                    oDefaultProjectModel.setProperty("/projects", aProjects);
                    localStorage.updateData(aProjects);
                }
                else {
                    var item = projectModel.getProperty(this.sPath[0]);

                    var index = aProjects.indexOf(item);
                    newFile.creationDate = new Date();
                    aProjects[index] = newFile;
                    projectModel.setProperty("/projects", aProjects);
                    oDefaultProjectModel.setProperty("/projects", aProjects);
                    localStorage.updateData(aProjects);
                  
                }
                this._oNewFileDialog.close();
            },
            handleCancelApproveEvent: function(){
                this._oNewApprovalDialog.close();
            },
            handleOkApproveEvent: function(){
                var oProjectModel = this.getView().getModel("projects");
                var oDefaultProjectModel = this.getView().getModel("nonFilterProjects");

                if(this.sPath){
                    var aSplittedPath =  this.sPath[0].split("/");
                    var index = aSplittedPath[aSplittedPath.length-1];
                    var projects =oProjectModel.getProperty("/projects");
                    projects.splice(index,1);
                    oProjectModel.setProperty("/projects",projects);
                    oDefaultProjectModel.setProperty("/projects", projects);
                    this._oNewApprovalDialog.close();
                    this.getView().byId("fileList").removeSelections(true);
                    this.sPath = null;
                    localStorage.updateData(projects);
                }
                else {
                    MessageToast.show("Select file!")
                    this._oNewApprovalDialog.close();
                }   
            },
            routePressedItem: function (oEvent) {
                var oItem = oEvent.getSource();
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("Detail", {
                    path: window.encodeURIComponent(oItem.getBindingContext("projects").getPath().substr(1)),
                });
            },
            _setValuesToDialogContent: function (sMod) {
                var oFileModel = this.getView().getModel("newProjectModel");
                if (sMod === "Create") {

                    oFileModel.setProperty("/currFile", null);
                }
                else if (sMod === "Edit") {
                    var oFiles = this.getView().getModel("projects");
                    var currItem = oFiles.getProperty(this.sPath[0]);
                    oFileModel.setProperty("/currFile", currItem);
                }
            },
            _arrangeDialog: function (sTitle, sMod) {
                this._setValuesToDialogContent(sMod);
                this._oNewFileDialog.setTitle(sTitle);
                this._oNewFileDialog.open();
            },
            _arrangeDialogFragment: function (sTitle, sMod) {
                if (!this._oNewFileDialog) {
                    Fragment.load({
                        id: "dialogFrag",
                        name: "com.smod.smodrepository.view.Modify",
                        controller: this
                    })
                        .then(function (oDialog) {
                            this._oNewFileDialog = oDialog;
                            this.getView().addDependent(this._oNewFileDialog);
                            this._oNewFileDialog.setModel(this.getView().getModel("newProjectModel"));
                            this._arrangeDialog(sTitle, sMod);
                        }.bind(this));
                } else {
                    this._oNewFileDialog.setModel(this.getView().getModel("newProjectModel"));
                    this._arrangeDialog(sTitle, sMod);
                }
            },
            _dateFormatterStorage: function (date) {
				var parsedDate = new Date(Date.parse(date))
				return parsedDate;
			},
			_iterateProjectsData: function (projects) {
				projects.projects.forEach(element => {
					element.creationDate = this._dateFormatterStorage(element.creationDate)
				});
				return projects.projects;
			},

        });
    });
