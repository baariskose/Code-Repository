sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
],
    /**
     * provide app-view type models (as in the first "V" in MVVC)
     * 
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.ui.Device} Device
     * 
     * @returns {Function} createDeviceModel() for providing runtime info for the device the UI5 app is running on
     */
    function (JSONModel, Device) {
        "use strict";

        return {
            createDeviceModel: function () {
                var oModel = new JSONModel(Device);
                oModel.setDefaultBindingMode("OneWay");
                return oModel;
            },
            createProjectModel: function () {
                var oModel = new JSONModel({
                    projects:[]
                });
                oModel.setDefaultBindingMode("TwoWay");
                return oModel;
            },
            createProjectTypeModel: function () {
                var oModel = new JSONModel({
                    projectTypes: [
                        {
                            key: 1,
                            text: "ABAP",
                        },
                        {
                            key: 2,
                            text: "UI5",
                        },
                        {
                            key: 3,
                            text: "WEB",
                        },
                        {
                            key: 4,
                            text: "OTH",
                        },

                    ],
                });
                oModel.setDefaultBindingMode("TwoWay");
                return oModel;
            },
            createCurrFileModel: function () {
                var projectModel = new JSONModel({
                    project: null,
                    currPath: "",
                    prePath:"",
                    currPathSourceCodes: "",
                });
                projectModel.setDefaultBindingMode("TwoWay");
                return projectModel;
            }
        };
    });