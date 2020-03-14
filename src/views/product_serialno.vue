<template>
  <!-- manufacturing Listing Page Start -->
  <div class="main_content">
    <div class="product_top_bar">
      <div class="product_top_bar_left">
        <vs-button class="blue_btn" @click.stop="create=!create">Create</vs-button>
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
                    <vs-table>
                      <template slot="thead">
                        <vs-th>
                          Product Name
                          <!-- Product Name -->
                        </vs-th>
                        <vs-th>
                          No of Serial Numbers
                          <!-- No of Serial Numbers -->
                        </vs-th>
                        <vs-th>
                          Created On
                          <!-- Created On -->
                        </vs-th>
                        <vs-th>
                          Updated On
                          <!-- late Updated On -->
                        </vs-th>
                        <vs-th>
                          Action
                          <!--  Action -->
                        </vs-th>
                      </template>
                       <template>
                        <vs-tr v-bind:key="indextr.id" v-for="indextr in product_serial_display">
                          <router-link
                            class="secondary-content"
                            v-bind:to="{ name: 'product_serialno_detail', params: { product_ids: indextr.id }}">
                            <vs-td :data="indextr.product_code">
                              {{indextr.id}}
                           
                            </vs-td>

                            <vs-td :data="indextr.totalserialno">
                              {{indextr.totalserialno}}
                            
                            </vs-td >

                            <vs-td :data="indextr.careated_on">
                              {{indextr.careated_on}}
                             
                            </vs-td>

                            <vs-td :data="indextr.updated_on">
                            {{indextr.updated_on}}
                            </vs-td>
                             <vs-td>
                            -
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
    >
      <form @submit.prevent="save_product_serail">
        <div class="product_top_bar">
          <div class="product_top_bar_left">
            <h3>Create Lots/Serial Numbers</h3>
            <span class="succMsgClass"></span>
          </div>
          <div class="product_top_bar_right">
            <span class="succMsgClass" v-if="suc_msg !== null" v-show="sucVisible">{{suc_msg}}</span>
            <button class="blue_btn" type="submit">Save</button>
            <vs-button class="white_btn" @click="create=false , resetform()"  type="filled">Cancel</vs-button>
            
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
                   <input type="hidden" v-model="product_prefix_h" />
                    <input type="hidden" v-model="product_last_subcollection" />
                    <input type="hidden" v-model="collection_size_s" />
                    
                 
                   <multiselect v-model="product_name_d" name="product_name_er" :options="product_name_data" @select="selectProduct" placeholder="Select one" label="Product_Name" track-by="Product_Name" v-validate="{ required: true}"
                    :class="{ 'is-invalid': v_validate && errors.has('product_name_er') }"></multiselect>  
                  <div
                    v-if="v_validate && errors.has('product_name_er')"
                    class="invalid-feedback"
                  >{{ errors.first('product_name_er') }}</div>
                </div>
                <div
                  id="already"
                  class="invalid-feedback"
                  v-show="product_exist"
                >Product Already exist</div>
                <!-- <div
                    v-show="product_exist 
                    class="invalid-feedback"
                  >{{ errors.first('product_name_er') }}</div>
                </div>-->
              </div>
              <div class="col_half">
                <!-- Product Price -->

                <label>Product Code</label>
                <div class="form_field_content" v-if="product_model_no_s">{{product_model_no_s}}</div>
                <div class="form_field_content" v-else>-</div>
              </div>
            </div>

            <div class="row">
              <div class="col_half">
                <!-- Quantity -->
                <label>Serial Numbers Start From</label>
                <div class="form_field_content">
                  <vs-input
                    v-model="serialno_start_s"
                    class="inputx withtext"
                    placeholder="Enter Text"
                    name="serial_num_err"
                    v-validate="{ required: true, numeric}"
                    :class="{ 'is-invalid': v_validate && errors.has('serial_num_err') }"
                  />
                  <div
                    v-if="v_validate && errors.has('serial_num_err')"
                    class="invalid-feedback"
                  >{{ errors.first('serial_num_err') }}</div>
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
              </div>
            </div>
            <div class="row">
              <div class="col_full">
                <label>Product Prefix</label>
                <div class="form_field_content">
                  <vs-input
                  @keyup="prefixvalidation($event)"
                    v-model="product_prefix_s"
                    class="inputx withtext"
                    placeholder="Enter Text"
                    name="product_prefix_err"
                    v-validate="{ required: true,max:5,min:5}"
                    :class="{ 'is-invalid': v_validate && errors.has('product_prefix_err') }"
                  />
                  <div
                    v-if="v_validate && errors.has('product_prefix_err')"
                    class="invalid-feedback"
                  >{{ errors.first('product_prefix_err') }}</div>
                  <div
                    id="already"
                    class="invalid-feedback"
                    v-show="product_pre_validate"
                  >Prefix Already Exist</div>
                </div>
              </div>
              <div class="col_full">
                <label>Description</label>
                <div class="form_field_content textarea_input">
                  <vs-textarea placeholder="Enter Text" v-model="product_desc_s" 
                  v-validate="{ required: true, min: 4 }" :class="{ 'is-invalid': v_validate && errors.has('description_err') }" name="description_err"/>
                  <div
                    v-if="v_validate && errors.has('description_err')"
                    class="invalid-feedback"
                  >{{ errors.first('description_err') }}</div>
                </div>
              </div>
            </div>
          </div>
          <!-- bottom div start -->
          <div class="manufacture_create_bottom">
            <div class="manufacture_create_title">
              <h4>Generate Serial Numbers</h4>
            </div>
            <div class="row">
              <div class="col_half">
                <label>Quantity</label>
                <div class="form_field_content">
                  <vs-input
                    v-model="generate_quantity_s"
                    class="inputx withtext"
                    placeholder="Enter Text"
                    
                  />
                 
                </div>
              </div>
            </div>
          </div>
          <!-- bottom div end/ -->
          <!-- bottom second div start -->
          <div class="manufacture_create_bottom">
            <div class="manufacture_create_title">
              <h4>Serial Numbers</h4>
            </div>
            <div class="manufacture_create_content">
              <vs-table>
                <template slot="thead">
                  <vs-th>
                    Created on
                    <!-- Created on  -->
                  </vs-th>
                  <vs-th>
                    Created by
                    <!--   Created by -->
                  </vs-th>
                  <vs-th>
                    Quantity
                    <!-- Quantity -->
                  </vs-th>
                  <vs-th>
                    No.of Serial No.
                    <!-- No.of Serial No. -->
                  </vs-th>
                  <vs-th>
                    Serial Numbers
                    <!--  Serial Numbers -->
                  </vs-th>
                  <vs-th>Action</vs-th>
                </template>
                <template>
                  <vs-tr v-for="q_summary in quantity_summary_c" v-bind:key="q_summary.id">
                    <vs-td>{{q_summary.careated_on}}</vs-td>
                    <vs-td>-</vs-td>
                    <vs-td>{{q_summary.generate_quantity}}UNITS</vs-td>
                    <vs-td>{{q_summary.generate_quantity}}</vs-td>
                    <vs-td v-if="q_summary.serial_no_end!=q_summary.serial_no_start">{{q_summary.serial_no_start}} to {{q_summary.serial_no_end}}</vs-td>
                    <vs-td v-else>{{q_summary.serial_no_start}}</vs-td>
                  </vs-tr>
                </template>
              </vs-table>
            </div>
          </div>
          <!-- bottom second div end/ -->
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
import moment from "moment";
import { Validator } from "vee-validate";
import Swal from 'sweetalert2';

const validate_msg = {
  custom: {
    product_name_er: {
      required: "This product name is required",
    },

    serial_num_err: {
      required: "This  Serial Number  is required",
      numeric: "Only Numeric value allow"
    },
    product_prefix_err: {
      required: "This  Product Prefix  is required",
      alpha: "Only  Charcter Allow",
      max: "Maximum  Five Charcter Allow",
      min: "Minimum  Five Charcter Allow"
    },
    description_err:{
      required: "This  Product Description  is required",
      min: "Minimum four Charcter Allowed"
    }
  }
};

Validator.localize("en", validate_msg);

export default {
  components: { Multiselect },
  data() {
    return {
      v_validate: false,
      product_name_data: [],
      product_variant: ["White", "Black"],
      create: false,
      product_variant_value: "",
      product_name_d: null,
      product_name_value: "",
      product_model_no_s: null,
      serialno_start_s: null,
      serial_quantity_s: null,
      last_doc_id: null,
      generate_quantity_s: null,
      start_q_range: null,
      end_q_range: null,
      product_prefix_s: null,
      quantity_summary_c: [],
      collectionsize: null,
      numeric: "",
      alpha: "",
      prefix_id: "",
      product_prefix_db: "",
      product_pre_validate: false,
      product_exist: false,
      product_prefix_h:null,
      product_last_subcollection:null,
      collection_size_s:null,
      prefix_array:[],
      product_variant_s:null,
      product_desc_s:null,
      checkBox1:null,
      product_serial_display:[],
      suc_msg: null,
      sucVisible: true,
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


       db.collection("serial_no")
      .get()
      .then(() => {
        this.watcher_display();
      });
  },
  methods: {
    watcher_display(){
        debugger // eslint-disable-line
        this.product_serial_display=[];
          db.collection("serial_no").onSnapshot((querySnapshot)=>{
               this.product_serial_display=[];
             
                querySnapshot.forEach((doc)=>{
                    
                     const data = {
                    'id': doc.id,
                    'totalserialno': doc.data().totalquantity,
                    'careated_on': moment(
                        doc.data().created_on.seconds * 1000,
                        "x"
                      ).format("DD MMM,YYYY"),
                    'updated_on':moment(
                        doc.data().updated_on.seconds * 1000,
                        "x"
                      ).format("DD MMM,YYYY"),
                    }
                this.product_serial_display.push(data)
               
                });
          });
              
    
         
    },
    watcher_real() {
      let product_name_c = this.Product_Name;
      db.collection("p_quantity_summary")
        .where("product_name", "==", product_name_c)
        .onSnapshot(querySnapshot => {
          this.quantity_summary_c = [];
          querySnapshot.forEach(doc => {
            const data = {
              id: doc.id,
              careated_on: moment(
                doc.data().created_on.seconds * 1000,
                "x"
              ).format("DD MMM,YYYY"),
              generate_quantity: doc.data().generate_quantity,
              serial_no_start: doc.data().serail_no_start,
              serial_no_end: doc.data().serial_no_end,
              product_name: doc.data().product_name
            };
            this.quantity_summary_c.push(data);
          });
        });
    },
    resetform(){
            this.serialno_start_s='';
            this.product_name_d='';
            this.product_model_no_s='';
            this.product_variant_value='';
            this.product_prefix_s='';
            this.product_desc_s='';
            this.generate_quantity_s='';
            this.v_validate=false;

    },
    selectProduct({id,Product_Name}) {
       var keyvalue = id; 
      
      var custome_product=Product_Name;
      db.collection("product")
        .doc(keyvalue)
        .get()
        .then(doc => {
          this.product_name_value = doc.id;
          this.Product_Name = doc.data().Product_Name;
          this.product_model_no_s = doc.data().Product_Model_No;
        });
         db.collection("serial_no")
        .doc(custome_product)
        .get()
        .then(doc => {
           if (doc.exists) {
          this.product_prefix_h = doc.data().product_prefix;
          this.product_last_subcollection = doc.data().latest_collection;
          this.product_exist=true;
           }
           else{
            this.product_prefix_h = null;
            this.product_last_subcollection = 'AA';
            this.product_exist=false;
           }
           console.log(this.product_last_subcollection);
          
            
        });

         
    },
    prefixvalidation(event){
    
      var isthere=false;
      this.product_pre_validate = false;
          var value=event.target.value;
          console.log(value);
          db.collection("serial_no").get()
        .then(querySnapshot => {
    querySnapshot.forEach(doc => {
       
                     const data = {
                    'id': doc.id,
                    'prefixes': doc.data().product_prefix,
                }
                this.prefix_array.push(data)
    });
                for(var i=0; i < this.prefix_array.length; i++){
                    if( this.prefix_array[i].prefixes == value){
                      isthere=true;
                  }
                }
                if(isthere==true){
                    this.product_pre_validate = true;
                }
                else{
                  this.product_pre_validate = false;
                }
  });
    },
    nextChar(c) {
      // return String.fromCharCode(c.charCodeAt(0) + 1);
      var u = c.toUpperCase();
      if (this.same(u, "Z")) {
        var txt = "";
        var i = u.length;
        while (i--) {
          txt += "A";
        }
        return txt + "A";
      } else {
        var p = "";
        var q = "";
        if (u.length > 1) {
          p = u.substring(0, u.length - 1);
          q = String.fromCharCode(p.slice(-1).charCodeAt(0));
        }
        var l = u.slice(-1).charCodeAt(0);
        var z = this.nextLetter(l);
        if (z === "A") {
          return (
            p.slice(0, -1) + this.nextLetter(q.slice(-1).charCodeAt(0)) + z
          );
        } else {
          return p + z;
        }
      }
    },
    nextLetter(l) {
      if (l < 90) {
        return String.fromCharCode(l + 1);
      } else {
        return "A";
      }
    },

    same(str, char) {
      var i = str.length;
      while (i--) {
        if (str[i] !== char) {
          return false;
        }
      }
      return true;
    },
    
    setSerialData(custome_ID,subcollection,product_prefix,generate_quantity,start_q_range,product_desc,product_model_code,product_variant){
      
      
       db.collection('serial_no').doc(custome_ID).set({
            latest_collection:subcollection,
            product_prefix:product_prefix,
            totalquantity:generate_quantity,
            created_on: new Date(),
            updated_on: new Date(),
            serial_no_start:start_q_range,
            product_desc:product_desc,
            product_model_code:product_model_code,
            product_variant:product_variant
      })

    },
    // insertInNewCollection(subcollection,collec_limit,c_collec_size,remain_quantity,custome_serialno,product_prefix,custome_ID,generate_quantity,product_desc,product_model_code,product_variant,start_q_range){
     
    //   debugger // eslint-disable-line
      

    // },
    save_product_serail() {
      debugger; // eslint-disable-line
      var t = this;
      
      var flag = localStorage.setItem("flag", 0);
      let generate_quantity = this.generate_quantity_s;
      let custome_ID = this.Product_Name;
      let serial_number = this.serialno_start_s;
      let product_prefix = this.product_prefix_s;
      var product_desc= this.product_desc_s;
      var product_model_code=this.product_model_no_s;
      var product_variant=this.product_variant_value;
      const Toast = Swal.mixin({
  toast: true,
  position: 'top-begin',
  showConfirmButton: false,
  timer: 3000
});
console.log(Toast);
      
    
      //var collection_size_get=this.collection_size_s;
      let custome_serialno = serial_number;
      
      var i = 0;
       var subcollection=this.product_last_subcollection;
      this.v_validate = true;
      this.$validator.validate().then(valid => {
        if (valid) {
          if(this.product_exist==false && this.product_pre_validate==false && generate_quantity!=null){
          
        
          db.collection("serial_no").doc(custome_ID).collection(subcollection).onSnapshot(function(snapshot) {
              var lastid = "0";
              var change_type = "";
              snapshot.docChanges().forEach(function(change) {
                lastid = change.doc.id;
                change_type = change.type;
                
              });

              if (lastid != "0") {
                lastid = lastid.substring(5);
                var lastID = parseInt(lastid) + 1;
                lastID = lastID.toString();
              } else {
                lastID = custome_ID;
              }
              flag = localStorage.getItem("flag");
              /*For existing product entry start*/
              var remain_quantity = generate_quantity;
              var collec_limit = 5;
              if (change_type == "added") {
                if (lastID != null) {
                  if (flag == 0) {
                    console.log("edit");
                  }
                }
              } 
              else if (flag == 0) {
                /*For existing product entry end*/
                /*For new product entry start*/
                subcollection="AA";
                localStorage.setItem("flag", 1);
                t.start_q_range = custome_serialno;
                remain_quantity = generate_quantity;
                collec_limit = 5;
                /*Multiple quantity same time  start*/
                    var c_collec_size=0;
                    for (i = c_collec_size; i <= generate_quantity; i++) {
                      if (c_collec_size < collec_limit ) {
                        custome_serialno =product_prefix + custome_serialno.toString();
                        if (remain_quantity != 0) {
                          db.collection("serial_no").doc(custome_ID).collection(subcollection).doc(custome_serialno).set({})
                            .then(function() {
                              t.watcher_real();
                             
                                t.suc_msg = 'Data added successfully';
                              setTimeout(() => t.sucVisible = false, 3000);
                              
                              setTimeout(() => t.create = false, 1000);
                            });
                            t.setSerialData(custome_ID,subcollection,product_prefix,generate_quantity,t.start_q_range,product_desc,product_model_code,product_variant);

                          custome_serialno = custome_serialno.substring(5);
                          t.end_q_range=custome_serialno;
                          custome_serialno++;
                          
                          c_collec_size++;
                          remain_quantity--;
                        }
                      } 
                      else {
                       
                      //t.insertInNewCollection(subcollection,collec_limit,c_collec_size,remain_quantity,custome_serialno,product_prefix,custome_ID,generate_quantity,product_desc,product_model_code,product_variant,t.start_q_range);
                     
                      subcollection = t.nextChar(subcollection);
                        c_collec_size = 0;
                        for (i = c_collec_size; i <= remain_quantity; i++) {
                          if (c_collec_size < collec_limit) {
                            custome_serialno =product_prefix + custome_serialno.toString();
                            if (remain_quantity != 0) {
                              db.collection("serial_no").doc(custome_ID).collection(subcollection).doc(custome_serialno)
                                .set({})
                                .then(function() {
                                  t.watcher_real();
                                  
                                  t.suc_msg = 'Data added successfully';
                                  setTimeout(() => t.sucVisible = false, 3000);
                                  setTimeout(() => t.create = false, 1000);
           
                                });
                                   /*insert product prefix*/
                                   t.setSerialData(custome_ID,subcollection,product_prefix,generate_quantity,t.start_q_range,product_desc,product_model_code,product_variant);
                                   
                              custome_serialno = custome_serialno.substring(5);
                              t.end_q_range=custome_serialno;
                              custome_serialno++;
                              
                              c_collec_size++;
                              remain_quantity--;
                              
                            }
                          }
                        }
                      //this.end_q_range = product_prefix+(parseInt(this.end_q_range)+1).toString();
                      }
                      
                      
                    }
                    
                //custome_serialno=custome_serialno.substring(5);
              
                
                //this.end_q_range=custome_serialno;

                db.collection("p_quantity_summary").add({
                  created_on: new Date(),
                  product_name: custome_ID,
                  generate_quantity: generate_quantity,
                  serail_no_start: product_prefix + t.start_q_range,
                  serial_no_end:  product_prefix + t.end_q_range
                  });
              
                
              }
              /*For new product entry end*/
               
              
            });
            /*for new quantity summary collection start*/

               
            
              
               
                /*for new quantity summary collection end*/
            //form reset//
            t.resetform();
            
            
          }
          else{
           console.log("in2");
           
           setTimeout(() => this.create = false, 5000);
           generate_quantity=0;
          this.setSerialData(custome_ID,subcollection,product_prefix,generate_quantity,custome_serialno,product_desc,product_model_code,product_variant);
          }
        } else {
          console.log("in");
          
        }
      });
      
        
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>