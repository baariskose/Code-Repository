/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "com/smod/smodrepository/model/models",
        "./Firebase",
    ],
    function (UIComponent, Device, models,Firebase) {
        "use strict";

        return UIComponent.extend("com.smod.smodrepository.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
                this.setModel(models.createProjectModel(), "projects");
                this.setModel(models.createProjectTypeModel(), "projectTypes");
                this.setModel(models.createCurrFileModel(), "currProject");
               // this.setModel(Firebase.initializeFirebase(), "firebase");
            }
        });
    }
);