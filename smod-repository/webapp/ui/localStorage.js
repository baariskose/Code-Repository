sap.ui.define([
    "sap/ui/base/ManagedObject",
    "sap/ui/model/json/JSONModel"
], function (
    ManagedObject,
    JSONModel
) {
    "use strict";

    return {
        createAndPushData: function () {
            var oStore = jQuery.sap.storage(jQuery.sap.storage.Type.local);
            var storCheck = oStore.get("id");
            if (storCheck == null) {
                oStore.put("id", {

                    projects: [
                        {
                            id: 1,
                            description: "xxxxxxxx",
                            name: "ZHCM_P_GET_CUSTOMER",
                            type: "ABAP",
                            typeKey: 1,
                            creationDate: new Date(),
                            createdBy: "Barış",
                            sourceCodes: [
                                {
                                    id: new Date().getTime(),
                                    name: "ZHCM_GET_CUSTOMER_DD",
                                    parent: 11,
                                    content: "",
                                    isFile: false,
                                    keywords: "xxx,yyy",
                                    sourceCodes: [],
                                },
                                {
                                    id: 12,
                                    name: "Definitions",
                                    parent: 1,
                                    content: "",
                                    isFile: true,
                                    sourceCodes: [
                                        {
                                            id: 121,
                                            name: "ZHCM_GET_CUSTOMER_DD_CODES",
                                            parent: 12,
                                            content: "xxxxxxxxx",
                                            isFile: false,
                                            keywords: "xxx,yyy,a-v",
                                            sourceCodes: [],
                                        },
                                        {
                                            id: 122,
                                            name: "ZHCM_GET_CUSTOMER_PERFORM_CODES",
                                            parent: 12,
                                            content: "zzzzzzzzzzzz",
                                            isFile: false,
                                            keywords: "vaa,zbdg,xas",
                                            sourceCodes: [],
                                        },
                                        {
                                            id: 123,
                                            name: "Deneme",
                                            parent: 12,
                                            content: "",
                                            isFile: true,
                                            sourceCodes: [{
                                                id: 1231,
                                                name: "ZHCM_GET_CUSTOMER_DD_CODES",
                                                parent: 123,
                                                content: "zzzzzzzzzzzz",
                                                isFile: false,
                                                keywords: "vaa,zbdg,xas,deneme",
                                                sourceCodes: [],
                                            }],
                                        }
                                    ],
                                }
                            ],
                        },
                        {
                            id: 2,
                            description: "yyyyyyy",
                            name: "ZHCM_P_GET_PERMISSION",
                            type: "UI5",
                            typeKey: 2,
                            creationDate: new Date(),
                            createdBy: "Bayram",
                            sourceCodes: [
                                {
                                    id: new Date().getTime(),
                                    name: "ZHCM_GET_PERMISSION_DD",
                                    parent: 2,
                                    content: "",
                                    isFile: false,
                                    keywords: "zzzz,aaaa",
                                    sourceCodes: [],
                                },
                                {
                                    id: new Date().getTime(),
                                    name: "Performs",
                                    parent: 2,
                                    content: "",
                                    isFile: true,
                                    sourceCodes: [],
                                }
                            ],
                        }
                    ]

                })
            }


        },
        GetDataById() {
            var oStore = jQuery.sap.storage(jQuery.sap.storage.Type.local);
            return oStore.get("id");
        },
        updateData:function(allData){
            var oStore = jQuery.sap.storage(jQuery.sap.storage.Type.local);
           
            oStore.put("id", allData);

        }



    };
});