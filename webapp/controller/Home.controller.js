sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "com/bootcamp/sapui5/freestyle/utils/HomeHelper",
    "sap/ui/model/json/JSONModel",
    
], (Controller, MessageBox, HomeHelper, JSONModel) => {
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
             
            if (oDatos && oDatos[0] && oDatos[0].results) {
                await HomeHelper.setProductModel(this, oDatos[0].results);
            } else {
                console.error("Data is missing or not in expected format.");
            }
        },
    });
});