<template>
  <!-- manufacturing Listing Page Start -->
  <div class="main_content">
    <div class="product_top_bar">
      <div class="product_top_bar_left">
        <vs-button class="blue_btn" @click="create=!create">Create</vs-button>
        <vs-button class="white_btn">Import</vs-button>
      </div>
      <div class="product_top_bar_right"></div>
    </div>
    <div class="grey_section">
      <div class="manufacturing_section">
        <div class="manufacturing_tab">
          <vs-tabs>
            <!-- Manufacturing Tab-->
            <vs-tab label="Manufacture">
              <div class="con-tab-ejemplo">
                <div class="manufacturing_tab">
                  <div class="manufacturing_tab_top">
                    <vs-table :data="product_data_show">
                      <template slot="thead">
                        <vs-th>
                          Product Code
                          <!-- Product Code -->
                        </vs-th>
                        <vs-th>
                          Product Name
                          <!-- Product Name -->
                        </vs-th>
                        <vs-th>
                          BOM Type
                          <!-- BOM Type -->
                        </vs-th>
                        <vs-th>
                          Product Variant
                          <!-- Product Variant -->
                        </vs-th>
                      </template>

                      <template>
                        <vs-tr v-bind:key="indextr.id" v-for="indextr in product_data_show">
                          <router-link
                            class="secondary-content"
                            v-bind:to="{ name: 'manufacturing_detail', params: { bom_id: indextr.id }}"
                          >
                            <vs-td :data="indextr.product_code">
                              {{indextr.product_code}}
                              <!-- Product Code -->
                            </vs-td>

                            <vs-td :data="indextr.product_name">
                              {{indextr.product_name}}
                              <!-- Product Name -->
                            </vs-td>

                            <vs-td :data="indextr.bom_type">
                              {{indextr.bom_type}}
                              <!-- BOM Type -->
                            </vs-td>

                            <vs-td :data="indextr.Product_Variant">
                              <span v-if="indextr.product_variant">{{indextr.product_variant}}</span>
                              <span v-else>-</span>
                              <!-- Product Variant -->
                            </vs-td>
                          </router-link>
                        </vs-tr>
                      </template>
                    </vs-table>
                  </div>
                </div>
              </div>
            </vs-tab>
            <!-- Kit Tab-->
            <vs-tab label="Kit">
              <div class="con-tab-ejemplo">
                <div class="manufacturing_tab">
                  <div class="manufacturing_tab_top"></div>
                </div>
              </div>
            </vs-tab>
          </vs-tabs>
        </div>
      </div>
    </div>
    <!-- Create Sidebar Start -->
    <vs-sidebar
      position-right
      parent="body"
      default-index="1"
      color="primary"
      class="sidebarx"
      spacer
      v-model="create" 
      :class="{'sidebar_active':activeTab===1}"     
    >
      <form @submit.prevent="saveMenufature">
        <div class="product_top_bar">
          <div class="product_top_bar_left">
            <h3>Create Bills of Materials</h3>
            <span class="succMsgClass" v-if="suc_msg !== null" v-show="sucVisible">{{suc_msg}}</span>
          </div>
          <div class="product_top_bar_right">
            <button class="blue_btn" type="submit">Save</button>
            <vs-button class="white_btn">Cancel</vs-button>            
          </div>
        </div>
        <div class="sidebar_box">
          <div class="manufacture_create_top">
            <div class="row">
              <div class="col_half">
                <!-- Product Name -->
                <label>Product Name</label>
                <div class="form_field_content">
                  <!-- <multiselect v-model="product_name_data" :options="product_name"></multiselect> -->
                  <input type="hidden" v-model="product_name_value" />
                  <select
                    @change="selectProduct($event)"
                    v-model="product_name_d"
                    name="product_name_d"
                    v-validate="{ required: true}"
                    :class="{ 'is-invalid': submitted && errors.has('product_name_d') }"
                  >
                    <option
                      v-for="proList in product_name_data"
                      :key="proList.id"
                      :value="proList.id"
                    >{{proList.Product_Name}}</option>
                  </select>
                  <div
                    v-if="submitted && errors.has('product_name_d')"
                    class="invalid-feedback"
                  >{{ errors.first('product_name_d') }}</div>
                </div>
              </div>
              <div class="col_half">
                <!-- Product Price -->

                <label>Sales Price</label>
                <div class="form_field_content">₹ {{product_sales_price_d}}</div>
              </div>
            </div>

            <div class="row">
              <div class="col_half">
                <!-- Product Code-->
                <label>Product Code</label>
                <div class="form_field_content">{{product_model_no_d}}</div>
              </div>
              <div class="col_half">
                <!-- Quantity -->
                <label>Quantity</label>
                <div class="form_field_content">
                  <vs-input
                    class="inputx withtext"
                    placeholder="Enter Text"
                    name="quantity"
                    v-model="quantity"
                    v-validate="{ required: true, numeric}"
                    :class="{ 'is-invalid': submitted && errors.has('quantity') }"
                  />
                  <div
                    v-if="submitted && errors.has('quantity')"
                    class="invalid-feedback"
                  >{{ errors.first('quantity') }}</div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col_half">
                <!-- Product Variant -->
                <label>Product Variant</label>
                <div class="form_field_content">
                  <multiselect v-model="product_variant_value" :options="product_variant"></multiselect>
                </div>
              </div>
              <div class="col_half">
                <!-- Bom Type -->
                <label>Bom Type</label>
                <div class="form_field_content">
                  <vs-radio v-model="radio" vs-name="bom" vs-value="manufacture">Manufacture</vs-radio>
                  <vs-radio v-model="radio" vs-name="bom" vs-value="kit">Kit</vs-radio>
                </div>
              </div>
            </div>
          </div>
          <div class="manufacture_create_bottom">
            <div class="manufacture_create_title">
              <h4>Component</h4>
            </div>
            <div class="manufacture_create_content">
              <vs-table>
                <template slot="thead">
                  <vs-th>
                    Component Name
                    <!-- Component Name -->
                  </vs-th>
                  <vs-th>
                    Component Code
                    <!-- Component Code-->
                  </vs-th>
                  <vs-th>
                    Quantity
                    <!-- Quantity -->
                  </vs-th>
                  <vs-th>
                    BOM Cost(₹)
                    <!-- BOM Cost(₹) -->
                  </vs-th>
                  <vs-th>Action</vs-th>
                </template>

                <template>
                  <vs-tr :key="row" v-for="(row, index) in rows" :indx="index">
                    <vs-td>
                      <div class="form_field_content">
                        <select @change="selectComponent($event)" :id="index">
                          <option
                            v-for="comProList in component_name"
                            v-bind:value="comProList.id"
                            v-bind:key="comProList.id"
                          >{{comProList.Product_Name}}</option>
                        </select>
                      </div>
                    </vs-td>
                    <vs-td>
                      <vs-input
                        v-model="row.component_Model_No_d"
                        v-bind:value="row.component_Model_No_d"
                        disabled
                      />
                    </vs-td>
                    <vs-td>
                      <vs-input
                        class="inputx withtext"
                        placeholder="Enter Text"
                        v-model="row.component_quantity" data-vv-as="quanity" :name="'component_quantity'+index" v-validate="{ required: true, numeric}"
                        :class="{ 'is-invalid': submitted && errors.has('component_quantity'+index) }"
                      />
                      <div
                        v-if="submitted && errors.has('component_quantity'+index)"
                        class="invalid-feedback"
                      >{{ errors.first('component_quantity'+index) }}</div>
                    </vs-td>
                    <vs-td>
                      <vs-input
                        v-model="row.component_Sales_Price_d"
                        v-bind:value="row.component_Sales_Price_d"
                        disabled
                      />
                    </vs-td>
                    <vs-td>                      
                      <a href="javascript:;" @click="removeRow(index), activeTab=1">Remove</a>
                    </vs-td>
                  </vs-tr>
                </template>

                <template>
                  <vs-tr>
                    <vs-td>
                      <a
                        href="javascript:void(0);"
                        class="add_component"
                        @click="addRow()"
                      >Add a Component</a>
                    </vs-td>
                    <vs-td></vs-td>
                    <vs-td>
                      <span class="right_text">Total BOM Cost</span>
                    </vs-td>
                    <vs-td>-</vs-td>
                    <vs-td></vs-td>
                  </vs-tr>
                </template>
              </vs-table>
            </div>
          </div>
        </div>
      </form>
    </vs-sidebar>
    <!-- Create Sidebar End -->
  </div>

  <!-- manufacturing Listing  Page End -->
</template>

<script>
import db from "./firebaseInit";
import Multiselect from "vue-multiselect";
import { Validator} from 'vee-validate';

const dict = {
  custom: {
    product_name_d: {
      required: 'This product name field is required'
    }, 
    quantity:{
      required: 'This bom quantity field is required',
      numeric: 'Only Numeric value allow'
    },
    component_quantity:{
      required: 'This field is required',
      numeric: 'Only Numeric value allow'
    }   
  }
};

Validator.localize('en', dict);

export default {
  components: { Multiselect },  
  data() {
    return {
      activeTab:'',
      numeric:'',
      submitted: false,
      create: false,
      product_data_show: [],
      //Manufacture Data
      Manufacture: [],
      product_name_data: [],
      product_name_d: null,
      product_model_no_d: null,
      product_sales_price_d: null,
      component_pro_name_d: null,
      component_Model_No_d: null,
      component_Sales_Price_d: null,
      component_name: [],
      component_name_value: null,
      component_Model_No: null,
      component_quantity: null,
      component_Sales_Price: null,
      data_p: null,
      Component: [],
      Product_Name: "",
      product_name_value: "",
      component_name_id: "", //  Product Name
      product_name: [], //  Product Variant
      product_variant: ["White", "Black"],
      product_variant_value: "",
      quantity: "", // Quantity
      radio: "manufacture", // Radio
      suc_msg: null,
      sucVisible: true,  
      rows: [
        {
          component_name_value: "",
          component_name: [],
          component_Model_No: "",
          component_quantity: "",
          component_Sales_Price: "",
          component_Model_No_d: "",
          component_Sales_Price_d: ""
        }
      ], //component
    };
  },
  created() {
    db.collection("product")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const componentProduct = {
            id: doc.id,
            Product_Name: doc.data().Product_Name
          };
          this.product_name_data.push(componentProduct);
        });
      });

    db.collection("product")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const componentProduct = {
            id: doc.id,
            Product_Name: doc.data().Product_Name
          };
          this.component_name.push(componentProduct);
        });
      });
    /*show data*/
    db.collection("bill_of_material")
      .get()
      .then(() => {
        this.watcher();
      });
  },
  methods: {
    watcher() {
      db.collection("bill_of_material")
        .where("Bom_Type", "==", "manufacture")
        .onSnapshot(querySnapshot => {
          this.product_data_show = [];
          querySnapshot.forEach(doc => {
            const data_show = {
              id: doc.id,
              product_code: doc.data().Bom_Product_Code,
              product_name: doc.data().Bom_Product_Name,
              bom_type: doc.data().Bom_Type,
              product_variant: doc.data().Bom_Product_Variant
            };
            this.product_data_show.push(data_show);
          });
        });
    },
    addRow: function() {     
      this.rows.push({
        component_name_value: "",
        component_name: this.component_name,
        component_Model_No: "",
        component_quantity: "",
        component_Sales_Price: "",
        component_Model_No_d: "",
        component_Sales_Price_d: ""
      });
    },
    removeRow: function(index) {
      this.rows.splice(index, 1);      
    },
    selectProduct(event) {
      var keyvalue = event.target.value;
      db.collection("product")
        .doc(keyvalue)
        .get()
        .then(doc => {          
          this.product_name_value = doc.id;
          this.Product_Name = doc.data().Product_Name;
          this.product_model_no_d = doc.data().Product_Model_No;
          this.product_sales_price_d = doc.data().Product_Sales_Price;
        });
    },
    selectComponent(event) {      
      var componentKey = event.target.value;
      var indexID = event.target.id;

      db.collection("product")
        .doc(componentKey)
        .get()
        .then(doc => {
          this.rows[indexID]["component_name_id"] = doc.id;
          this.rows[indexID]["component_pro_name_d"] = doc.data().Product_Name;
          this.rows[indexID][
            "component_Model_No_d"
          ] = doc.data().Product_Model_No;
          this.rows[indexID][
            "component_Sales_Price_d"
          ] = doc.data().Product_Sales_Price;
          this.rows[indexID]["component_quantity"] = doc.data().quantity;
        });
    },
    saveMenufature() {
      //SAVE DATA      
      this.submitted = true;
      this.$validator.validate().then(valid => {
        if (valid) {          
          this.Component = [];
          var i = 0;
          for (i = 0; i < this.rows.length; i++) {
            const component_data = {
              Component_Name: this.rows[i].component_pro_name_d,
              Component_Key: this.rows[i].component_name_id,
              Component_Code: this.rows[i].component_Model_No_d,
              Component_Price: this.rows[i].component_Sales_Price_d,
              Component_Quantity: this.rows[i].component_quantity
            };
            this.Component.push(component_data);
          }
          db.collection("bill_of_material").add({
            Bom_Product_Key: this.product_name_value,
            Bom_Product_Name: this.Product_Name,
            Bom_Product_Price: this.product_sales_price_d,
            Bom_Quantity: this.quantity,
            Bom_Type: this.radio,
            Bom_Product_Code: this.product_model_no_d,
            Bom_Product_Variant: this.product_variant_value,
            Bom_Component_Product: this.Component
          });
          this.suc_msg = 'Data added successfully';
          setTimeout(() => this.sucVisible = false, 3000);
          this.quantity='';
        }
      });
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>