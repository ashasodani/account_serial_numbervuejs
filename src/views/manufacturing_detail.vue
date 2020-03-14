<template>
  <!-- Manucture Detail Page Start -->
  <div class="main_content">
    <div class="product_top_bar">
      <div class="product_top_bar_left"></div>
      <div class="product_top_bar_right">
        <vs-button class="blue_btn" @click="edit=!edit">Edit</vs-button>&nbsp;
        <vs-button  color="danger" @click="deletebomdata(product_detail_show_1[0].id)">Delete</vs-button>
      </div>
    </div>
    <div class="grey_section">
      <div class="manufacture_detail_left">
        <div class="manufacture_detail_top">
          <div class="row">
            <div class="col_half">
              <label>Product Name</label>
              <span
                v-if="product_detail_show_1[0].Bom_Product_Name"
              >:-{{product_detail_show_1[0].Bom_Product_Name}}</span>
            </div>
            <div class="col_half">
              <label>Sales Price</label>
              <span
                v-if="product_detail_show_1[0].Bom_Product_Price"
              >:-₹{{product_detail_show_1[0].Bom_Product_Price}}</span>
              <span v-else>:- -</span>
            </div>
          </div>
          <div class="row">
            <div class="col_half">
              <label>Product Code</label>
              <span
                v-if="product_detail_show_1[0].Bom_Product_Code"
              >:-{{product_detail_show_1[0].Bom_Product_Code}}</span>
              <span v-else>-</span>
            </div>
            <div class="col_half">
              <label>Quantity</label>
              <span
                v-if="product_detail_show_1[0].Bom_Quantity"
              >:-{{product_detail_show_1[0].Bom_Quantity}}Units</span>
              <span v-else>:- -</span>
            </div>
          </div>
          <div class="row">
            <div class="col_half">
              <label>Product Variant</label>
              <span
                v-if="product_detail_show_1[0].Bom_Product_Variant"
              >:-{{product_detail_show_1[0].Bom_Product_Variant}}</span>
              <span v-else>:- -</span>
            </div>
            <div class="col_half">
              <label>Bom Type</label>
              <span v-if="product_detail_show_1[0].Bom_Type">:-{{product_detail_show_1[0].Bom_Type}}</span>
              <span v-else>:- -</span>
            </div>
          </div>
        </div>
        <div class="manufacture_detail_bottom">
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
              </template>

              <template>
                <vs-tr
                  v-bind:key="components.Component_Key"
                  v-for="components in product_detail_show_1[0].Bom_Component_Product"
                >
                  <vs-td>{{components.Component_Name}}</vs-td>
                  <vs-td>{{components.Component_Code}}</vs-td>
                  <vs-td>{{components.Component_Quantity}} Units</vs-td>
                  <vs-td>{{components.Component_Price}}</vs-td>
                </vs-tr>
              </template>

              <template>
                <vs-tr>
                  <vs-td></vs-td>
                  <vs-td></vs-td>
                  <vs-td>
                    <span>Total BOM Cost</span>
                  </vs-td>
                  <vs-td>{{ total }}</vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </div>
      </div>
      <div class="manufacture_detail_right">
        <div class="product_detail_bottom_title">
          <h5>Log Note</h5>
        </div>
        <div class="product_detail_bottom_content">
          <div class="product_detail_bottom_row" v-for="(note, index) in notes" v-bind:key="index">
            <div class="product_detail_bottom_img">
              <img :src="note.img" />
            </div>
            <div class="product_detail_bottom_info">
              <h4>{{note.name}}</h4>
              <span>{{note.date}}</span>
              <p>{{note.text}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Log Note End -->

    <!-- Edit Sidebar Start -->
    <vs-sidebar
      position-right
      parent="body"
      default-index="1"
      color="primary"
      class="sidebarx"
      spacer
      v-model="edit"
    >
      <form @submit.prevent="updateProduct_data">
        <div class="product_top_bar">
          <div class="product_top_bar_left">
            <h3>Edit {{this.product_detail_show_1[0].Bom_Product_Name}}</h3>
          </div>
          <div class="product_top_bar_right">
            <span class="succMsgClass" v-if="suc_msg !== null" v-show="sucVisible">{{suc_msg}}</span>
            <button class="blue_btn" type="submit">Update</button>
            <vs-button class="white_btn">Cancel</vs-button>
          </div>
        </div>
        <div class="sidebar_box">
          <div class="manufacture_create_top">
            <div class="row">
              <div class="col_half">
                <!-- Product Name -->
                <label>Product Name</label>
                  <input type="hidden" v-model="product_edit_show.Bom_Product_Key" />
                <div class="form_field_content">
                  <select @change="selectProduct($event)" ref="product_edit_show.Bom_Product_Name" name="product_name_up"  v-validate="{ required: true}"
                    :class="{ 'is-invalid': submitted && errors.has('product_name_up') }">
                    <option
                      v-for="proList in product_name_data_e"
                      :key="proList.id"
                      :value="proList.id"
                      :selected="proList.id == product_edit_show.Bom_Product_Key ? 'selected' : ''"
                    >{{proList.Product_Name_up}}</option>
                  </select>
                   <div
                    v-if="submitted && errors.has('product_name_up')"
                    class="invalid-feedback"
                  >{{ errors.first('product_name_up') }}</div>
                </div>
              </div>
              <div class="col_half">
                <!-- Product Price -->
                <label>Sales Price</label>
                <div
                  class="form_field_content"
                  v-if="product_edit_show.Bom_Product_Price"
                >₹ {{product_edit_show.Bom_Product_Price}}</div>

                <div class="form_field_content" v-else>₹ -</div>
              </div>
            </div>

            <div class="row">
              <div class="col_half">
                <!-- Product Code-->
                <label>Product Code</label>
                <div
                  class="form_field_content"
                  v-if="product_edit_show.Bom_Product_Code"
                >{{product_edit_show.Bom_Product_Code}}</div>
                <div class="form_field_content" v-else>-</div>
              </div>
              <div class="col_half">
                <!-- Quantity -->
                <label>Quantity</label>
                <div class="form_field_content">
                  <vs-input
                    class="inputx withtext"
                    placeholder="Enter Text"
                    name="quantity_up"
                    v-model="product_edit_show.Bom_Quantity"
                    v-validate="{ required: true, numeric}"
                    :class="{ 'is-invalid': submitted && errors.has('quantity_up') }"
                  />
                  <div
                    v-if="submitted && errors.has('quantity_up')"
                    class="invalid-feedback"
                  >{{ errors.first('quantity_up') }}</div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col_half">
                <!-- Product Variant -->
                <label>Product Variant</label>
                <div class="form_field_content">
                  <multiselect
                    ref="product_edit_show.Bom_Product_Variant"
                    v-model="product_edit_show.Bom_Product_Variant"
                    :options="product_variant"
                  ></multiselect>
                </div>
              </div>
              <div class="col_half">
                <!-- Bom Type -->
                <label>Bom Type</label>
                <div class="form_field_content">
                  <vs-radio
                    v-model="radio"
                    vs-name="bom"
                    vs-value="manufacture"
                    :checked="product_edit_show.Bom_Type == 'manufacture'"
                  >Manufacture</vs-radio>
                  <vs-radio
                    v-model="radio"
                    vs-name="bom"
                    vs-value="kit"
                    :checked="product_edit_show.Bom_Type == 'kit'"
                  >Kit</vs-radio>
                </div>
              </div>
            </div>
          </div>
          <!-- component add start asha-->
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
                  <vs-th>ACTIONS</vs-th>
                </template>

                <template>
                  <vs-tr :key="product_bom" v-for="(product_bom, index) in product_edit_show.Bom_Component_Product" :indx="index">
                    <vs-td>
                      <div class="form_field_content">
                        <select  :id="index" ref="product_bom.Component_Name" @change="selectComponent_e($event)">
                          <option
                            v-for="comProList in product_name_data_e"
                            v-bind:value="comProList.id"
                            v-bind:key="comProList.id"
                            :selected="comProList.id == product_bom.Component_Key ? 'selected' : ''"
                          >{{comProList.Product_Name_up}}</option>
                        </select>
                      </div>
                    </vs-td>
                    <vs-td>
                      <vs-input
                        v-model="product_bom.Component_Code"
                        v-bind:value="product_bom.Component_Code"
                        disabled
                      />
                    </vs-td>
                    <vs-td>
                      <vs-input
                        class="inputx withtext"
                        placeholder="Enter Text"
                        v-model="product_bom.Component_Quantity"
                        :name="'component_quantity_up'+index" data-vv-as="quanity"
                        v-validate="{ required: true, numeric}"
                        :class="{ 'is-invalid': submitted && errors.has('component_quantity_up'+index) }"
                      />
                        <div
                        v-if="submitted && errors.has('component_quantity_up'+index)"
                        class="invalid-feedback"
                      >{{ errors.first('component_quantity_up'+index) }}</div>
                    </vs-td>
                    <vs-td>
                      <vs-input
                        v-model="product_bom.Component_Price"
                        v-bind:value="product_bom.Component_Price"
                        disabled
                      />
                    </vs-td>
                    <vs-td>
                     <a href="javascript:void(0);" @click="removeRow_up(index)">Remove</a>
                    </vs-td>
                  </vs-tr>
                </template>

                <template>
                  <vs-tr>
                    <vs-td>
                      <a href="javascript:void(0);" class="add_component"   @click="addRow()">Add a Component</a>
                    </vs-td>
                    <vs-td></vs-td>
                    <vs-td>
                      <span class="right_text">Total BOM Cost</span>
                    </vs-td>
                    <vs-td>{{total_bom_cost}}</vs-td>
                    <vs-td></vs-td>
                  </vs-tr>
                </template>
              </vs-table>
            </div>
          </div>
          <!-- component add end-->
        </div>
      </form>
    </vs-sidebar>
    <!-- Edit Sidebar End -->
  </div>
  <!-- Manucture Detail Page End -->
</template>

<script>
import db from "./firebaseInit";
import Multiselect from "vue-multiselect";
import { Validator } from 'vee-validate';
import Swal from 'sweetalert2';
import router from '../router'

const dict = {
  custom: {
    product_name_up: {
      required: 'This product name field is required'
    }, 
    quantity_up:{
      required: 'This bom quantity field is required',
      numeric: 'Only Numeric value allow'
    },
    component_quantity_up:{
      required: 'This field is required',
      numeric: 'Only Numeric value allow'
    }   
  }
};

Validator.localize('en', dict);
export default {
  components: { Multiselect },

  name: "manufacturing_detail",
  data() {
    return {
      suc_msg:'',
      numeric:'',
      sucVisible:true,
      submitted: false,
      product_name_data_e: [],
      product_name_d: "",
      product_code_d: "",
      product_variant_d: "",
      sales_price_d: "",
      product_quantity_d: "",
      product_bom_type: "",
      product_detail_show_1:[],
      product_edit_show: [],
      product_id_e: "",
      Product_Name_e: "",
      product_model_no_e: "",
      product_sales_price_e: "",
      rows:[{
          component_name_value:'',
          component_name:[],
          component_Model_No:'',
          component_quantity:'',
          component_Sales_Price:'',
          component_Model_No_d:'',
          component_Sales_Price_d:''
        }],   
      edit: false,
      component_update:[],
      notes: [
        {
          img:
            "https://firebasestorage.googleapis.com/v0/b/accountingerp.appspot.com/o/test%2Fprofile1.png?alt=media&token=691cbad5-4bbe-48b8-88e3-3bec1c01a7a2",
          name: "Jade Powers",
          date: "Fri, 10 Jan 2020  12:30PM",
          text: "Bills of Materials Created"
        }
      ], // Log Note

      //sidebar
      product_name_value: "", //  Product Name
      
      product_variant_value: "", //  Product Variant
      product_variant: ["White", "Black"],

      quantity: "", // Quantity

      radio: "manufacture" // Radio
    };
  },
  created() {
    
    /*realtime update*/
    const datafetch_1= db.collection("bill_of_material").doc(this.$route.params.bom_id);
    datafetch_1.get().then(() => {
       db.collection('bill_of_material').onSnapshot((querySnapshot)=>{
         this.product_detail_show_1=[];
           querySnapshot.forEach((doc)=>{ 
             const data_real = {
                    'id': doc.id,
                    'Bom_Component_Product': doc.data().Bom_Component_Product,
                    'Bom_Product_Code': doc.data().Bom_Product_Code,
                    'Bom_Product_Key':doc.data().Bom_Product_Key,
                    'Bom_Product_Name':doc.data().Bom_Product_Name,
                    'Bom_Product_Price':doc.data().Bom_Product_Price,
                    'Bom_Product_Variant':doc.data().Bom_Product_Variant,
                    'Bom_Quantity':doc.data().Bom_Quantity,
                    'Bom_Type':doc.data().Bom_Type,

                }
                
                 if(this.$route.params.bom_id==doc.id){
                  this.product_detail_show_1.push(data_real);
                 }
               
                });
              
       });
        });
     
    /*realtime update*/

    db.collection("product")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const products = {
            id: doc.id,
            Product_Name_up: doc.data().Product_Name
          };
          this.product_name_data_e.push(products);
        });
      });
     

    const editrecord = db.collection("bill_of_material").doc(this.$route.params.bom_id);
      editrecord.get().then(doc => {
      if (doc.exists) {
        
        this.product_edit_show = doc.data();
        this.key = doc.id;
      } else {
        alert("No such document!");
      }
    });
     
  },
  computed: {
    total: function() {
     
      return this.product_detail_show_1[0].Bom_Component_Product.reduce(
        (acc, val) => {
          return acc + parseFloat(val.Component_Price);
        },
        0
      );
    },
    total_bom_cost: function(){
       return this.product_detail_show_1[0].Bom_Component_Product.reduce(
        (acc, val) => {
          return acc + parseFloat(val.Component_Price);
        },
        0
      );
    }

  },
  methods: {
     updateProduct_data(){
    
      this.submitted = true;
      this.$validator.validate().then(valid => {
        if (valid) {          
        this.component_update=[];
       let componennt_length=this.product_edit_show.Bom_Component_Product.length;
        var i= 0;
         for (i = 0; i < componennt_length; i++) {            
          const component_update_data = {
          Component_Name:this.product_edit_show.Bom_Component_Product[i].component_pro_name_d,
          Component_Key :this.product_edit_show.Bom_Component_Product[i].component_name_id,
          Component_Code : this.product_edit_show.Bom_Component_Product[i].component_Model_No_d,     
          Component_Price : this.product_edit_show.Bom_Component_Product[i].component_Sales_Price_d,
          Component_Quantity :  this.product_edit_show.Bom_Component_Product[i].component_quantity,        
        }
        this.component_update.push(component_update_data)
      }
       const updatedata_bom =  db.collection('bill_of_material').doc(this.$route.params.bom_id);
                            updatedata_bom.set(this.product_edit_show).then(()=>{
                               
                        })
                        .catch((error) => {
                        alert("Error adding document: ", error);
                      }); 
     }
      });
              this.suc_msg = 'Data updated successfully';
              setTimeout(() => this.sucVisible = false, 3000);
    },
    addRow: function(){
      
      this.product_edit_show.Bom_Component_Product.push({
          Component_Key:'',
          Component_Name:'',
          Component_Code:'',
          Component_Price:'',
          Component_Quantity:''});
     
    },
    selectProduct(event) {
       
      var keyvalue = event.target.value;
      db.collection("product")
        .doc(keyvalue)
        .get()
        .then(doc => {
          this.product_id_e = doc.id;
          this.product_edit_show.Bom_Product_Key = keyvalue;
          this.product_edit_show.Bom_Product_Name = doc.data().Product_Name;
          this.product_edit_show.Bom_Product_Code = doc.data().Product_Model_No;
          this.product_edit_show.Bom_Product_Price = doc.data().Product_Sales_Price;
        });
    },
    selectComponent_e(event) {
    
      var component_value = event.target.value;
      var indexID = event.target.id;
      db.collection("product")
        .doc(component_value)
        .get()
        .then(doc => {
          this.product_edit_show.Bom_Component_Product[indexID]["Component_Key"] = doc.id;
          this.product_edit_show.Bom_Component_Product[indexID]["Component_Name"] = doc.data().Product_Name;
          this.product_edit_show.Bom_Component_Product[indexID]["Component_Code"] = doc.data().Product_Model_No;
          this.product_edit_show.Bom_Component_Product[indexID]["Component_Price"] = doc.data().Product_Sales_Price;
          this.product_edit_show.Bom_Component_Product[indexID]["Component_Quantity"] = doc.data().quantity;
        });
    },
    removeRow_up(index){
        
          this.product_edit_show.Bom_Component_Product.splice(index, 1);
          return false;
    },
    deletebomdata(id){
       const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
  
       /*sweet alert*/
                Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                   db.collection('bill_of_material').doc(id).delete().then(() => {
                   
                       router.push({
                        path: '/manufacturing'
                        })
                })
                Toast.fire({
                    type: 'success',
                    title: 'Deleted  successfully'
                })
                
                }
            })
            /*sweet alert*/
     
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>