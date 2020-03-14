<template>
  <!-- Product Detail Page Start -->
  <div class="main_content">
      <div class="product_detail_top_left">
        <vs-button class="blue_btn" @click="edit=!edit">Edit</vs-button>
        <!-- Product Info -->
        <div class="product_detail_info">
          <div class="product_detail_info_img">
            <!-- Product image -->  
            <img :src="Product_Image">
          </div>
          <div class="product_detail_info_content">
            <div class="product_card_name">
              <!-- Product title -->
              <h5>{{Product_Name}}</h5>
            </div>
            <div class="model">
              <!-- Product model number -->  
              <span>({{Product_Model_No}})</span>
            </div>  
            <div class="product_detail_checkbox">
            <vs-checkbox v-model="checkBox1">Can be Sold</vs-checkbox>
            <vs-checkbox v-model="checkBox2">Can be Purchased</vs-checkbox>
            </div> 
          </div>
        </div>
      </div>
      <div class="product_detail_top_right" >
        <!-- Product Variant -->  
        <div class="product_detail_top_right_box" >
          <div class="product_detail_top_right_box_left">
            <label>2</label>
            <span>Variants</span>
          </div>
          <div class="product_detail_top_right_box_right">
            <img src="../assets/images/variant_icon.png">
          </div>
        </div>
        <!-- Product On hand -->  
        <div class="product_detail_top_right_box">
          <div class="product_detail_top_right_box_left">
            <label>{{Product_On_hand}} Units</label>
            <span>On Hand</span>
          </div>
          <div class="product_detail_top_right_box_right">
            <img src="../assets/images/onhand_icon.png">
          </div>  
        </div>
      <!-- Forecasted -->  
        <div class="product_detail_top_right_box">
          <div class="product_detail_top_right_box_left">
            <label>-1200 Units</label>
            <span>Forecasted</span>
          </div>
          <div class="product_detail_top_right_box_right">
            <img src="../assets/images/forecasted_icon.png">
          </div>  
        </div>
      <!-- BOM -->  
        <div class="product_detail_top_right_box">
          <div class="product_detail_top_right_box_left">
            <label>{{Product_Bom}}</label>
            <span>BOM</span>
          </div>
          <div class="product_detail_top_right_box_right">
            <img src="../assets/images/bom_icon.png">
          </div>  
        </div>
      <!-- Product Used In -->  
        <div class="product_detail_top_right_box">
          <div class="product_detail_top_right_box_left">
            <label>{{Product_Used_In}}</label>
            <span>Used In</span>
          </div>
          <div class="product_detail_top_right_box_right">
            <img src="../assets/images/usedin_icon.png">
          </div>  
        </div>
      <!-- Product Sold -->  
        <div class="product_detail_top_right_box">
          <div class="product_detail_top_right_box_left">
            <label>{{Product_Sold}} Units</label>
            <span>Sold</span>
          </div>
          <div class="product_detail_top_right_box_right">
            <img src="../assets/images/sold_icon.png">
          </div>  
        </div>
      <!-- Product Quality Points -->  
        <div class="product_detail_top_right_box">
          <div class="product_detail_top_right_box_left">
            <label>0</label>
            <span>Quality Points</span>
          </div>
          <div class="product_detail_top_right_box_right">
            <img src="../assets/images/quality_icon.png">
          </div>  
        </div>
      </div>
      <div class="product_detail_bottom_left">
        <!-- Product Detail Tab Start -->
        <div class="product_detail_tab">
          <vs-tabs>
            <!-- General Information Tab-->
            <vs-tab label="General Information">
              <div class="con-tab-ejemplo">
                  <div class="product_tab">
                      <div class="product_tab_top">
                        <ul>                          
                          <li><label>Product Type</label><span>{{Product_Type}}</span></li> <!-- Product Type -->
                          <li><label>Sales Price</label><span>₹{{Product_Sales_Price}}</span></li><!-- Product Price -->
                          <li><label>Product Category</label><span>{{Product_Category}}</span></li><!-- Product Category -->
                          <li>
                              <label>Customer Taxes</label>
                              <span class="red" v-for="c_tax in Product_Customer_Taxes" v-bind:key="c_tax">
                                {{ c_tax }}
                              </span>                            
                          </li><!-- Product Taxes -->
                          <li><label>Barcode</label><span>{{Product_Barcode}}</span></li><!-- Product Barcode -->
                          <li><label>Cost</label><span>₹{{Product_Cost}}</span></li>        <!-- Product Cost -->                  
                        </ul>
                      </div>
                     
                      <div class="product_tab_bottom">
                        <!-- Internal Notes -->
                        <label>Internal Notes</label>
                        <p>{{Product_Description}}</p>
                      </div>
                  </div>
              </div>
            </vs-tab>
            <!-- Variants Tab -->
            <vs-tab label=" Variants">
              <div class="con-tab-ejemplo">
                
              </div>
            </vs-tab>
           <!-- Sales Tab -->
            <vs-tab label="Sales">
              <div class="con-tab-ejemplo">
                
              </div>
            </vs-tab>
            <!-- Inventory Tab -->
            <vs-tab label="Inventory">
              <div class="con-tab-ejemplo">
                
              </div>
            </vs-tab>           
          </vs-tabs>
        </div>
        <!-- Product Detail Tab End -->
      </div>
       <!-- Log Note Start -->
      <div class="product_detail_bottom_right">
        <div class="product_detail_bottom_title">
            <h5>Log Note</h5>
        </div>
        <div class="product_detail_bottom_content">
            <div class="product_detail_bottom_row" v-for="(note, index) in notes"  v-bind:key="index">
                 <div class="product_detail_bottom_img">
                   <img :src="note.img">
                 </div>
                 <div class="product_detail_bottom_info">
                   <h4>{{note.name}}</h4>
                   <span>{{note.date}}</span>
                   <p>{{note.text}}</p>
                 </div>
            </div>
        </div>
      </div>
       <!-- Log Note End -->
        <!-- Edit Sidebar Start -->
  <vs-sidebar position-right  parent="body" default-index="1"  color="primary" class="sidebarx" spacer v-model="edit">
    <form @submit.prevent="updateProduct">
      <div class="product_top_bar">
        <div class="product_top_bar_left">
          <button type="submit" class="blue_btn">Update</button>
          <!-- <vs-button class="blue_btn" type="submit">Save</vs-button> -->
          <vs-button class="white_btn">Cancel</vs-button>
          <span class="succMsgClass" v-if="suc_msg !== null" v-show="sucVisible">{{suc_msg}}</span>
        </div>
        <div class="product_top_bar_right">
        </div>      
      </div>
     <div class="sidebar_box">
       <div class="create_sidebar_top_section">
         <div class="create_sidebar_top_left">
            <input type="file" @change="previewImage" accept="image/*" > 
            <img :src="Product_Image" alt="">
              <!-- <vs-upload action="https://jsonplaceholder.typicode.com/posts/" @change="successUpload" text="Upload Image" accept="image/*" limit="1"/> -->
          </div>
          <div class="create_sidebar_top_right">
              <div class="product_name_field">
                <label>Product Name</label>
                <vs-input class="inputx" placeholder="Enter Text" v-model="pro_name"/>              <!-- Product Name -->
                <span class="errMsgClass" v-if="err_product_name !== null">{{err_product_name}}</span>             
              </div>
              <div class="product_code_field">
                <label>Product Code</label>
                <vs-input class="inputx" placeholder="Enter Text" v-model.number="pro_code"/>              <!-- Product Code -->
                <span class="errMsgClass" v-if="err_product_code !== null">{{err_product_code}}</span> 
              </div>
              <div class="product_checkbox_field">
                <label></label>
                <div class="product_detail_checkbox">
                 <vs-checkbox v-model="pro_sold">Can be Sold</vs-checkbox>                            
                 <vs-checkbox v-model="pro_purchased">Can be Purchased</vs-checkbox>
                </div>
              </div>             
          </div>
       </div>
       <div class="create_sidebar_bottom_section">
          <vs-tabs>
            <!-- General Information Tab-->
            <vs-tab label="General Information">
              <div class="con-tab-ejemplo">
                  <div class="product_tab">
                      <div class="product_form">
                        <div class="row">
                            <div class="col_half">
                              <!-- Product Type -->  
                              <label>Product Type</label>
                              <div class="form_field_content">
                                <multiselect
                                v-model="pro_type"     
                                :options="product_type">
                                </multiselect>                                                              
                              </div>
                              <span class="errMsgClass" v-if="err_product_type_value !== null">{{err_product_type_value}}</span>
                            </div>
                            <div class="col_half">
                              <!-- Product Price -->  
                              <label>Sales Price</label>
                              <div class="form_field_content">
                                <vs-input class="inputx withicon" placeholder="Enter Price" v-model="pro_price" @keypress="isNumber($event)"/>
                                <span class="errMsgClass" v-if="err_sale_price !== null">{{err_sale_price}}</span>
                              </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col_half">
                              <!-- Product Category -->  
                              <label>Product Category</label>
                              <div class="form_field_content">
                                <multiselect
                                v-model="pro_category"     
                                :options="product_category">
                                </multiselect>                                
                              </div>
                              <span class="errMsgClass" v-if="err_product_cat_value !== null">{{err_product_cat_value}}</span>
                            </div>
                            <div class="col_half">
                              <!-- Product taxes -->  
                              <label>Customer Taxes</label>
                              <div class="form_field_content">
                              <multiselect
                               v-model="pro_customer_taxes"
                                :multiple="true"
                                :options="Taxes">
                              </multiselect>
                              </div>
                              <span class="errMsgClass" v-if="err_customer_tax !== null">{{err_customer_tax}}</span>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col_half">
                              <!-- Product Units -->  
                              <label>On Hand</label>
                              <div class="form_field_content">
                                <vs-input class="inputx withtext" placeholder="Enter Text" v-model="pro_on_hand" @keypress="isNumber($event)"/>
                                <span class="errMsgClass" v-if="err_on_hand !== null">{{err_on_hand}}</span>                                                            
                              </div>
                            </div>
                            <div class="col_half">
                              <!-- Product Cost -->  
                              <label>Cost</label>
                              <div class="form_field_content">
                                <vs-input class="inputx withicon" placeholder="Enter Price" v-model="pro_cost" @keypress="isNumber($event)"/>
                                <span class="errMsgClass" v-if="err_cost !== null">{{err_cost}}</span>                                                            
                              </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col_full">
                              <!-- Product barcode -->  
                              <label>Barcode</label>
                              <div class="form_field_content">
                                <vs-textarea v-model="pro_Barcode"/>                                                     
                              </div>
                              <span class="errMsgClass" v-if="err_product_barcode !== null">{{err_product_barcode}}</span>
                            </div>                           
                        </div>

                        <div class="row">
                            <div class="col_full">
                              <!-- Product Internal notes -->  
                              <label>Internal Notes</label>
                              <div class="form_field_content textarea_input">
                                <vs-textarea v-model="pro_description" placeholder="Enter Text"/>                                                     
                              </div>
                              <span class="errMsgClass" v-if="err_internal_notes !== null">{{err_internal_notes}}</span>
                            </div>                           
                        </div>


                      </div>   
                  </div>
              </div>
            </vs-tab>
            <!-- Variants Tab -->
            <vs-tab label=" Variants">
              <div class="con-tab-ejemplo">
                
              </div>
            </vs-tab>
           <!-- Sales Tab -->
            <vs-tab label="Sales">
              <div class="con-tab-ejemplo">
                
              </div>
            </vs-tab>
            <!-- Inventory Tab -->
            <vs-tab label="Inventory">
              <div class="con-tab-ejemplo">
                
              </div>
            </vs-tab>           
          </vs-tabs>
        </div>
     </div>
  </form>
  </vs-sidebar>
    <!-- Edit Sidebar End --> 
  </div>
  <!-- Product Detail Page End -->
</template>

<script>
  import db from './firebaseInit'
  import Multiselect from 'vue-multiselect'
  import firebase from 'firebase'

  export default {    
    components: { Multiselect },
    name: 'product_detail',  
    data () {
      return { 
        ptoduct_t_id:null,
        product_data_arr:[],
        edit:false,
        pro_name : '',
        pro_code: '',
        pro_sold: true,
        pro_purchased: true,   
        pro_type: '',                               
        product_type:['Consumable', 'Service' ,'Storable'],
        pro_price: '',       
        pro_category:'',                                 
        product_category:['All', 'All / Expenses'],
        pro_customer_taxes: '',                                        
        Taxes: ['GST 5%', 'GST 9%', 'GST 12%'],
        pro_on_hand: '',               
        pro_cost: '',                   
        pro_description:'',
        textarea: '',                  
        imageData: null,  
        picture: null,
        product_id: null,
        Product_Name: null,
        Product_Model_No: null,
        Product_Sales_Price: null,
        Product_Cost: null,
        Product_Barcode: null,
        pro_Barcode: null,
        Product_HSN_SAC_Code: null,
        Product_HSN_SAC_Description: null,
        Product_Customer_Taxes: null,
        Product_Type: null,
        Product_Category: null,
        Product_Can_Be_Sold: null,
        Product_Can_Be_Purchased : null,
        Product_Description: null,
        Product_Image: null,
        Product_On_hand: null,
        Product_Used_In: null,
        Product_Bom: null,
        Product_Sold: null,

        checkBox1:true, 
        checkBox2:true,
        //For Validation Error Message
        chError: 0,       
        err_product_name: null,
        err_product_code: null,
        err_product_type_value: null,
        err_sale_price: null,
        err_product_cat_value: null,
        err_customer_tax: null,
        err_on_hand: null,
        err_cost: null,
        err_product_barcode: null,
        err_internal_notes: null,
        suc_msg: null,
        sucVisible: true,   
        // products: { 
        //   img: 'https://firebasestorage.googleapis.com/v0/b/accountingerp.appspot.com/o/product_img.png?alt=media&token=41993f73-e97b-499b-99fb-3b4b360ed0e3', 
        //   title: '2.1A Lightning (iPhone) Diamond Data Cable', 
        //   model: 'AN-03',
        //   price: 399, 
        //   variants: 2, 
        //   Units: 1500.00,
        //   type: 'Consumable',
        //   category: 'Saleable',
        //   taxes: 'GST 5%',
        //   barcode: 5316849421756,
        //   cost: 299,
        //}
         // Product Details 
          Internal_Notes: { text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."}, // Internal Notes         
          notes: [
              { img: 'https://firebasestorage.googleapis.com/v0/b/accountingerp.appspot.com/o/test%2Fprofile1.png?alt=media&token=691cbad5-4bbe-48b8-88e3-3bec1c01a7a2', name: 'Jade Powers', date: 'Fri, 10 Jan 2020  12:30PM', text: '2.1A Lightning (iPhone) Diamond Data Cable Product Created'   },
              { img: 'https://firebasestorage.googleapis.com/v0/b/accountingerp.appspot.com/o/test%2Fprofile2.png?alt=media&token=9f40abe2-c048-4aff-9d5c-2b231876bd6c', name: 'Aja W. Gouge', date: 'Mon, 13 Jan 2020   10:23AM', text: 'Product Type: Storable Product -> Consumable'   },
              { img: 'https://firebasestorage.googleapis.com/v0/b/accountingerp.appspot.com/o/test%2Fprofile2.png?alt=media&token=9f40abe2-c048-4aff-9d5c-2b231876bd6c', name: 'Aja W. Gouge', date: 'Fri, 31 Jan 2020   10:23AM', text: 'Sales Price: ₹499 -> ₹399'   },
              ],   // Log Note
      }
      },
      created() {
        
        this.ptoduct_t_id=this.$route.params.product_id;
      db.collection('product').doc(this.$route.params.product_id).get().then(() => {
        //product_data_arr
      // if (doc.exists) {
      //   this.Product_Name = doc.data().Product_Name;
      //   this.Product_Model_No = doc.data().Product_Model_No;
      //   this.Product_Sales_Price = doc.data().Product_Sales_Price;
      //   this.Product_Image = doc.data().Product_Image;
      //   this.Product_Cost = doc.data().Product_Cost;
      //   this.Product_Barcode = doc.data().Product_Barcode;
      //   this.Product_HSN_SAC_Code = doc.data().Product_HSN_SAC_Code;
      //   this.Product_HSN_SAC_Description = doc.data().Product_HSN_SAC_Description;
      //   this.Product_Customer_Taxes = doc.data().Product_Customer_Taxes;
      //   this.Product_Type = doc.data().Product_Type;
      //   this.Product_Category = doc.data().Product_Category;
      //   this.Product_Can_Be_Sold = doc.data().Product_Can_Be_Sold;
      //   this.Product_Can_Be_Purchased = doc.data().Product_Can_Be_Purchased;
      //   this.Product_Description = doc.data().Product_Description;
      //   this.Product_On_hand = doc.data().Product_On_hand;
      //   this.Product_Used_In = doc.data().Product_Used_In;
      //   this.Product_Bom = doc.data().Product_Bom;
      //   this.Product_Sold = doc.data().Product_Sold;        
      // } else {
      //   alert("No such document!");
      // }
      /**/
      db.collection('product').onSnapshot((querySnapshot)=>{
        
           this.product_data_arr=[];
            querySnapshot.forEach((doc)=>{
              const data = {
                  'id': doc.id,
                  'Product_Name' : doc.data().Product_Name,
                  'Product_Model_No' : doc.data().Product_Model_No,
                  'Product_Sales_Price' : doc.data().Product_Sales_Price,
                  'Product_Image' : doc.data().Product_Image,
                  'Product_Cost' : doc.data().Product_Cost,
                  'Product_Barcode' :doc.data().Product_Barcode,
                  'Product_HSN_SAC_Code' : doc.data().Product_HSN_SAC_Code,
                  'Product_HSN_SAC_Description' : doc.data().Product_HSN_SAC_Description,
                  'Product_Customer_Taxes' : doc.data().Product_Customer_Taxes,
                  'Product_Type' : doc.data().Product_Type,
                  'Product_Category' : doc.data().Product_Category,
                  'Product_Can_Be_Sold' :doc.data().Product_Can_Be_Sold,
                  'Product_Can_Be_Purchased' : doc.data().Product_Can_Be_Purchased,
                  'Product_Description' : doc.data().Product_Description,
                  'Product_On_hand' : doc.data().Product_On_hand,
                  'Product_Used_In' : doc.data().Product_Used_In,
                  'Product_Bom' : doc.data().Product_Bom,
                  'Product_Sold' : doc.data().Product_Sold,
                }
               
                if(this.ptoduct_t_id==doc.id){
                  this.product_data_arr.push(data);
                  
                }
                
            });            
              this.Product_Name =this.product_data_arr[0].Product_Name;
              this.Product_Model_No = this.product_data_arr[0].Product_Model_No;
              this.Product_Sales_Price =this.product_data_arr[0].Product_Sales_Price;
              this.Product_Image = this.product_data_arr[0].Product_Image;
              this.Product_Cost = this.product_data_arr[0].Product_Cost;
              this.Product_Barcode = this.product_data_arr[0].Product_Barcode;
              //this.Product_HSN_SAC_Code = this.product_data_arr[0].Product_HSN_SAC_Code ;
              //this.Product_HSN_SAC_Description =this.product_data_arr[0].Product_HSN_SAC_Description;
              this.Product_Customer_Taxes = this.product_data_arr[0].Product_Customer_Taxes;
              this.Product_Type = this.product_data_arr[0].Product_Type;
              this.Product_Category = this.product_data_arr[0].Product_Category;
              this.Product_Can_Be_Sold = this.product_data_arr[0].Product_Can_Be_Sold;              
              if(this.Product_Can_Be_Sold === true){                  
                  this.checkBox1 = true;
              }else{                 
                  this.checkBox1 = false;
              }
              this.Product_Can_Be_Purchased = this.product_data_arr[0].Product_Can_Be_Purchased;
              if(this.Product_Can_Be_Purchased === true){                  
                  this.checkBox2 = true;
              }else{                 
                  this.checkBox2 = false;
              }
              this.Product_Description = this.product_data_arr[0].Product_Description;
              this.Product_On_hand =this.product_data_arr[0].Product_On_hand;
              //this.Product_Used_In =this.product_data_arr[0].Product_Used_In;
              //this.Product_Bom = this.product_data_arr[0].Product_Bom;
              //this.Product_Sold = this.product_data_arr[0].Product_Sold;
             
            });
            
    
       
      /**/
    });
    //Display Model Form Data
    db.collection('product').doc(this.$route.params.product_id).get().then((docData) => {
      this.pro_name = docData.data().Product_Name;
      this.pro_code = docData.data().Product_Model_No;
      this.pro_sold = docData.data().Product_Can_Be_Sold;
      this.pro_purchased = docData.data().Product_Can_Be_Purchased;
      this.pro_type = docData.data().Product_Type;
      this.pro_category = docData.data().Product_Category;
      this.pro_on_hand = docData.data().Product_On_hand;
      this.pro_price = docData.data().Product_Sales_Price;
      this.pro_customer_taxes = docData.data().Product_Customer_Taxes;
      this.pro_cost = docData.data().Product_Cost;
      this.pro_description = docData.data().Product_Description;
      this.pro_Image = docData.data().Product_Image;
      this.pro_Barcode = docData.data().Product_Barcode;
    })
  },
  methods: {
    realtimeupdate(){
      
    },
    previewImage(event) {
      this.imageData = event.target.files[0];
    },
    isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    },   
    //update data into firestore
    updateProduct() { 
      debugger // eslint-disable-line
      if(this.pro_name === ''){
        this.err_product_name ='This field is required';
        this.chError = 1;
      }else{
        this.err_product_name = null;       
      }

      if(this.pro_code === ''){
        this.err_product_code ='This field is required';
        this.chError = 1;
      }else{
        this.err_product_code = null;       
      } 

      if(this.pro_type === null){
        this.err_product_type_value ='This field is required';
        this.chError = 1;
      }
      else{
        this.err_product_type_value = null;        
      }

      if(this.pro_price === ''){
        this.err_sale_price ='This field is required'; 
        this.chError = 1;
      }
      else{
        this.err_sale_price = null;        
      }

      if(this.pro_category === null){
        this.err_product_cat_value ='This field is required'; 
        this.chError = 1;
      }
      else{
        this.err_product_cat_value = null;       
      }

      if(this.pro_customer_taxes === null){
        this.err_customer_tax ='This field is required';
        this.chError = 1;
      }
      else{
        this.err_customer_tax = null;        
      }      
      
      if(this.pro_on_hand === ''){
        this.err_on_hand ='This field is required';
        this.chError = 1;
      }
      else{
        this.err_on_hand = null;        
      }

      if(this.pro_cost === ''){
        this.err_cost ='This field is required';
        this.chError = 1;
      }
      else{
        this.err_cost = null;        
      }  

      if(this.pro_Barcode === ''){
        this.err_product_barcode ='This field is required';
        this.chError = 1;
      }
      else{
        this.err_product_barcode = null;       
      }

      if(this.pro_description === ''){
        this.err_internal_notes ='This field is required';
        this.chError = 1;
      }
      else{
        this.err_internal_notes = null;       
      }

      if(this.chError === 1){
        return false;
      }
      else
      {
          if(this.imageData == null){        
              db.collection('product').doc(this.$route.params.product_id).get().then((doc) => {
                  doc.ref.set({
                  Product_Image: this.Product_Image,
                  Product_Name: this.pro_name,
                  Product_Model_No: this.pro_code,
                  Product_Type: this.pro_type,
                  Product_Category: this.pro_category,
                  Product_On_hand: this.pro_on_hand,
                  Product_Description: this.pro_description,
                  Product_Sales_Price: this.pro_price,
                  Product_Cost: this.pro_cost,
                  Product_Customer_Taxes: this.pro_customer_taxes,
                  Product_Barcode: this.pro_Barcode,
                  Product_Can_Be_Sold: this.pro_sold,
                  Product_Can_Be_Purchased: this.pro_purchased
                })
              })
              this.suc_msg = 'Data updated successfully';
              setTimeout(() => this.sucVisible = false, 3000);
          }
          // update image into firestore storage
          else{
            var url = this.imageData.name;
            var str = (Math.random().toString(36).substring(2, 8+ Math.random().toString(36).substring(2, 8)).toUpperCase());

            var filename = url.substring(url.lastIndexOf('.')+1);
            var pro_name = this.Product_Model_No;
            var original = pro_name + "_" + str + "." + filename;
            let storageRef = firebase
              .storage()
              .ref("product_thumbnails/" + original)
              .put(this.imageData);
            storageRef.on(`state_changed`, () => {
              this.uploadValue = 100;
              storageRef.snapshot.ref.getDownloadURL().then(d_url => {           
                db.collection("product")
                  .doc(this.$route.params.product_id)
                  .get()
                  .then(doc => {
                    doc.ref.set({
                      Product_Image: d_url,
                      Product_Name: this.pro_name,
                      Product_Model_No: this.pro_code,
                      Product_Type: this.pro_type,
                      Product_Category: this.pro_category,
                      Product_On_hand: this.pro_on_hand,
                      Product_Description: this.pro_description,
                      Product_Sales_Price: this.pro_price,
                      Product_Cost: this.pro_cost,
                      Product_Customer_Taxes: this.pro_customer_taxes,
                      Product_Barcode: this.pro_Barcode,
                      Product_Can_Be_Sold: this.pro_sold,
                      Product_Can_Be_Purchased: this.pro_purchased
                    })
                  });
              });
            });
            this.suc_msg = 'Data updated successfully';
            setTimeout(() => this.sucVisible = false, 3000);
          }
      }
    }
  }
  
  }
</script>
