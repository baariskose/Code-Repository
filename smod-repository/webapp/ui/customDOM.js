sap.ui.define([
	"sap/ui/base/ManagedObject"
], function(
	ManagedObject
) {
	"use strict";

	return {
        createTextArea: function (text) {
            var textArea = document.createElement("textarea");
            textArea.value = text;
            return textArea;
        },
        insertTextArea: function (textArea) {
            document.body.appendChild(textArea);
            return true;
        },
        execCommand: function () {
            return document.execCommand('copy');
        },
        removeChild: function (textArea) {
            document.body.removeChild(textArea);
            return true;
        }
    };
});