sap.ui.define(["sap/ui/core/Control"], function (Control) {
    "use strict";
  
    return Control.extend("com.smod.smodrepository.ui.HighlightCode", {
      metadata: {
        properties: {
          code: {
            type: "string",
            bindable: true,
            defaultValue: "",
          },
          lang: {
            type: "string",
            bindable: true,
            defaultValue: "abap",
          },
        },
        aggregations: {},
        events: {
          pressed: {},
        },
      },
      init: function () {
        //initialisation code, in this case, ensure css is imported
        //   var sLibraryPath = jQuery.sap.getModulePath(
        //     "com.smod.highlightjs.highlightcode"
        //   ); //get the server location of the ui library
        //   jQuery.sap.includeStyleSheet(sLibraryPath + "/utils/highlight.css");
      },
      onAfterRendering: function () {
        //   hljs
        //     .configure({
        //       languages: ["abap"],
        //     }).highlight();
      },
      renderer: function (oRM, oControl) {
        oRM.openStart("div");
        oRM.writeControlData(oControl);
        oRM.class("smod-highlightcode-container");
        oRM.openEnd();
        oRM.openStart("header");
        oRM.class("smod-highlightcode-header");
        oRM.openEnd();
        //oRM.text("Code Content");
        oRM.close("header");
        oRM.openStart("main");
        oRM.class("smod-highlightcode-main");
        oRM.openEnd();
        oRM.openStart("pre");
        oRM.openEnd();
        oRM.openStart("code");
        oRM.class("hljs");
        oRM.class("language-abap");
        oRM.openEnd();
        oRM.write(hljs.highlight(oControl.getCode(), { language: "abap" }).value);
        oRM.close("code");
        oRM.close("pre");
        oRM.close("main");
  
        oRM.close("div");
      },
    });
  });