sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "com/bootcamp/sapui5/freestyle/utils/HomeHelper",
], (Controller, MessageBox, HomeHelper) => {
    "use strict";
    

    return Controller.extend("com.bootcamp.sapui5.freestyle.controller.Home", {
        onInit() {
            this._oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle()
        },

        onConfirmationMessageBoxPress: function () {
            var sText = this._oResourceBundle.getText("textConfirmationMessageBox")
		    MessageBox.confirm(sText);
		},

        onPress: async function () {
            let oDatos = await HomeHelper.getDataProducts();
            
        },
    });
});