sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "com/bootcamp/sapui5/freestyle/utils/HomeHelper",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    
], (Controller, MessageBox, HomeHelper, JSONModel, Filter, FilterOperator) => {
    "use strict";
    

    return Controller.extend("com.bootcamp.sapui5.freestyle.controller.Home", {
        onInit() {
            this._oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            this.oRouter = this.getOwnerComponent().getRouter();
            this.onSearch([]);
        },

        onConfirmationMessageBoxPress: function () {
            var sText = this._oResourceBundle.getText("textConfirmationMessageBox")
		    MessageBox.confirm(sText);
		},

        onPress: async function (oEvent) {
            //Filtro Back
            let oFilter = [];
            /* let sValue = this.byId("idLabel1").getValue();
            let sValueCombo = this.byId("comboboxID").getSelectedKey(); */

            let values= this.getOwnerComponent().getModel("LocalDataModel").getData();

            if(values.valueInput){
                oFilter.push(new Filter("ProductName", FilterOperator.Contains, values.valueInput));
            }
            if(values.selectedKey){
                oFilter.push(new Filter("CategoryID", FilterOperator.EQ, values.selectedKey));
            }
            this.onSearch(oFilter)

            /* let oDatos = await HomeHelper.getDataProducts([oFilter]);
             
            if (oDatos && oDatos[0] && oDatos[0].results) {
                await HomeHelper.setProductModel(this, oDatos[0].results);
            } else {
                console.error("Data is missing or not in expected format.");
            } */
        },

        onSearch: async function (oFilter) {
            let oDatos= await HomeHelper.getDataProducts([oFilter]);
            await HomeHelper.setProductModel(this, oDatos[0].results);    
        },

        onItemPress: function(oEvent){
            let oSource = oEvent.getSource();

            let aDatos = oSource.getBindingContext('ProductCollection').getObject();

            this.oRouter.navTo("detail", {
                ProductID: aDatos.ProductID
            })
        },

//Filtro Front
        onChange: async function (oEvent) {
            /* let oFilter = [];
            let oSource = oEvent.getSource();
            let oTable = this.getView().byId("idProductsTable");
            let oBinding= oTable.getBinding("items");

            if (oSource.getValue()){
                oFilter= [new Filter ("ProductID", FilterOperator.EQ, oSource.getValue())];
            }

            oBinding.filter(oFilter); */
        }
    });
});