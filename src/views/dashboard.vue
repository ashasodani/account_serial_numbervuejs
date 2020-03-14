<template>
  <!-- Product Listing Page Start -->
  <div class="main_content">
    <div class="product_top_bar">
      <div class="product_top_bar_left">
        <vs-button class="blue_btn" @click="create=!create">Create</vs-button>
        <vs-button class="white_btn">Import</vs-button>
      </div>
      <div class="product_top_bar_right">
      </div>
    </div>
    <div class="grey_section">
    <div class="product_card" v-for="product in products"  v-bind:key="product.id">
      <router-link class="secondary-content" v-bind:to="{ name: 'product_detail', params: { product_id: product.id }}">
       <div class="product_card_img">
        <!-- Product image -->  
        <img :src="product.Product_Image">
      </div>
      <div class="product_card_content">
          <div class="model">
            <!-- Product model number -->  
            <span>({{product.Product_Model_No}})</span>
          </div>
          <div class="product_card_name">
            <!-- Product title -->
            <h5>{{product.Product_Name}}</h5>
          </div>
          <div class="product_card_bottom">
            <ul>
              <!-- Product price-->
              <li><span>Price :</span> ₹{{product.Product_Sales_Price}}</li>
              <!-- Product variants -->
              <li v-if="product.variants" ><span>{{product.variants}} Variants</span></li>
            </ul>
            <div class="product_card_unit">
               <!-- Product On Hand units -->
              <span>On Hand :</span> {{product.Product_On_hand}} Units
            </div>
          </div>          
      </div>
      </router-link>
    </div>
  </div>
  <!-- Create Sidebar Start -->  
  <vs-sidebar position-right  parent="body" default-index="1"  color="primary" class="sidebarx" spacer v-model="create">
    <form @submit.prevent="saveProduct">
    <div class="product_top_bar">
      <div class="product_top_bar_left">
        <button type="submit" class="blue_btn">Submit</button>
        <!-- <vs-button class="blue_btn" type="submit">Save</vs-button> -->
        <vs-button class="white_btn" @click.stop="active=true"  type="filled">Cancel</vs-button>
        <span class="succMsgClass" v-if="suc_msg !== null" v-show="sucVisible">{{suc_msg}}</span>
      </div>
      <div class="product_top_bar_right">
      </div>      
    </div>    
     <div class="sidebar_box">
        <div class="create_sidebar_top_section">
          
          <div class="create_sidebar_top_left">
            <input type="file" @change="successUpload" accept="image/*" > 
              <vs-upload action="https://jsonplaceholder.typicode.com/posts/" @change="successUpload" text="Upload Image" accept="image/*" limit="1"/>
          </div>
          <div class="create_sidebar_top_right">
              <!-- Product Name -->
              <div class="product_name_field">
                <label>Product Name</label>                
                <vs-input class="inputx" placeholder="Enter Text" v-model="product_name"/>
                <span class="errMsgClass" v-if="err_product_name !== null">{{err_product_name}}</span>                
              </div>
              <!-- Product Code --> 
              <div class="product_code_field">
                <label>Product Code</label>
                <vs-input class="inputx" placeholder="Enter Text" v-model.number="product_code"/>
                <span class="errMsgClass" v-if="err_product_code !== null">{{err_product_code}}</span>                  
              </div>
              <div class="product_checkbox_field">
                <label></label>
                <div class="product_detail_checkbox">
                 <vs-checkbox v-model="checkBox1">Can be Sold</vs-checkbox>                            
                 <vs-checkbox v-model="checkBox2">Can be Purchased</vs-checkbox>
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
                                v-model="product_type_value"     
                                :options="product_type">
                                </multiselect>                                                              
                              </div>
                              <span class="errMsgClass" v-if="err_product_type_value !== null">{{err_product_type_value}}</span>
                            </div>
                            <div class="col_half">
                              <!-- Product Price -->  
                              <label>Sales Price</label>
                              <div class="form_field_content">
                                <vs-input class="inputx withicon" placeholder="Enter Price" v-model="price" @keypress="isNumber($event)"/>
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
                                v-model="product_cat_value"     
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
                                v-model="tax_value"
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
                                <vs-input class="inputx withtext" placeholder="Enter Text" v-model="on_hand" @keypress="isNumber($event)"/>
                                <span class="errMsgClass" v-if="err_on_hand !== null">{{err_on_hand}}</span>                                                            
                              </div>
                            </div>
                            <div class="col_half">
                              <!-- Product Cost -->  
                              <label>Cost</label>
                              <div class="form_field_content">
                                <vs-input class="inputx withicon" placeholder="Enter Price" v-model="cost" @keypress="isNumber($event)"/>  
                                <span class="errMsgClass" v-if="err_cost !== null">{{err_cost}}</span>                                                          
                              </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col_full">
                              <!-- Product barcode -->  
                              <label>Barcode</label>
                              <div class="form_field_content">
                                <vs-textarea v-model="Product_Barcode" />                                                     
                              </div>
                              <span class="errMsgClass" v-if="err_product_barcode !== null">{{err_product_barcode}}</span>     
                            </div>                           
                        </div>

                        <div class="row">
                            <div class="col_full">
                              <!-- Product Internal notes -->  
                              <label>Internal Notes</label>
                              <div class="form_field_content textarea_input">
                                <vs-textarea v-model="productDescription" placeholder="Enter Text"/>                                                     
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
    <!-- Create Sidebar End -->  
  </div>
  
  <!-- Product Listing Page End -->
</template>

<script>
  import db from './firebaseInit'
  import Multiselect from 'vue-multiselect'
  import firebase from 'firebase'

  export default {    
    components: { Multiselect },
    data () {
      return {  
        errors: [],
        products: [],
        loading: true,
        create:false,
        product_name: '',
        product_code: '',
        checkBox1:true, 
        checkBox2:true, 
        product_type_value:'',                                
        product_type:['Consumable', 'Service' ,'Storable'],
        price: '',     
        product_cat_value:'',                                 
        product_category:['All', 'All / Expenses'],
        tax_value: '',                                       
        Taxes: ['GST 5%', 'GST 9%', 'GST 12%'],
        on_hand: '',                 
        cost: '',                  
        productDescription:'',                  
        imageData: null,  
        urlDwn: '',
        Product_Barcode: '',        
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
      }
    },  
    methods:{
      watcher(){
       
         db.collection('product').onSnapshot((querySnapshot)=>{
           this.products=[];
            querySnapshot.forEach((doc)=>{
              const data = {
                  'id': doc.id,
                  'Product_Name': doc.data().Product_Name,
                  'Product_Model_No': doc.data().Product_Model_No,
                  'Product_Barcode': doc.data().Product_Barcode,  
                  'Product_Sales_Price': doc.data().Product_Sales_Price,
                  'Product_Image': doc.data().Product_Image,
                  'Product_Cost': doc.data().Product_Cost,
                  'Product_HSN_SAC_Code': doc.data().Product_HSN_SAC_Code,
                  'Product_HSN_SAC_Description': doc.data().Product_HSN_SAC_Description,
                  'Product_Customer_Taxes' : doc.data().Product_Customer_Taxes,
                  'Product_Type': doc.data().Product_Type,
                  'Product_Category': doc.data().Product_Category,
                  'Product_Can_Be_Sold': doc.data().Product_Can_Be_Sold,
                  'Product_Can_Be_Purchased': doc.data().Product_Can_Be_Purchased,
                  'Product_Description': doc.data().Product_Description,
                  'Product_On_hand' : doc.data().Product_On_hand
                }
                this.products.push(data)

            });

         });
         

      },
    successUpload(event){
      this.imageData = event.target.files[0];
      //this.imageData = event.target;
      this.$vs.notify({color:'success',title:'Upload Success',text:'Image Upload Successfully'})
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
    //save all data into firebase
    saveProduct(e) {      
      if(this.product_name === ''){
        this.err_product_name ='This field is required';
        this.chError = 1;
      }else{
        this.err_product_name = null;       
      }

      if(this.product_code === ''){
        this.err_product_code ='This field is required';
        this.chError = 1;
      }
      else{
        this.err_product_code = null;        
      }

      if(this.product_type_value === ''){
        this.err_product_type_value ='This field is required';
        this.chError = 1;
      }
      else{
        this.err_product_type_value = null;        
      }

      if(this.price === ''){
        this.err_sale_price ='This field is required'; 
        this.chError = 1;
      }
      else{
        this.err_sale_price = null;        
      }

      if(this.product_cat_value === ''){
        this.err_product_cat_value ='This field is required'; 
        this.chError = 1;
      }
      else{
        this.err_product_cat_value = null;       
      }

      if(this.tax_value === ''){
        this.err_customer_tax ='This field is required';
        this.chError = 1;
      }
      else{
        this.err_customer_tax = null;        
      }      
      
      if(this.on_hand === ''){
        this.err_on_hand ='This field is required';
        this.chError = 1;
      }
      else{
        this.err_on_hand = null;        
      }

      if(this.cost === ''){
        this.err_cost ='This field is required';
        this.chError = 1;
      }
      else{
        this.err_cost = null;        
      }  

      if(this.Product_Barcode === ''){
        this.err_product_barcode ='This field is required';
        this.chError = 1;
      }
      else{
        this.err_product_barcode = null;       
      }

      if(this.productDescription === ''){
        this.err_internal_notes ='This field is required';
        this.chError = 1;
      }
      else{
        this.err_internal_notes = null;       
      }
      
      if( this.chError === 1){
        return false;
      }
      else
      {
        if(this.imageData == null){ 
            db.collection('product').add({
              Product_Name:this.product_name,
              Product_Model_No:this.product_code,             
              Product_Can_Be_Sold:this.checkBox1,
              Product_Can_Be_Purchased:this.checkBox2,
              Product_Type:this.product_type_value,
              Product_Category: this.product_cat_value,
              Product_On_hand: this.on_hand,
              Product_Description: this.productDescription,
              Product_Sales_Price: this.price,
              Product_Customer_Taxes: this.tax_value,
              Product_Cost: this.cost,
              Product_Barcode: this.Product_Barcode,
              Product_Image: 'https://firebasestorage.googleapis.com/v0/b/accountingerp.appspot.com/o/images_icon.png?alt=media&token=45ba389b-620a-44bf-9437-f8cf6135de9d'
            })
            this.suc_msg = 'Data added successfully';
            setTimeout(() => this.sucVisible = false, 3000);
        }
        else
        {
            var str = (Math.random().toString(36).substring(2, 8) + Math.random().toString(36).substring(2, 8)).toUpperCase();
            var url = this.imageData.name;
            var filename = url.substring(url.lastIndexOf('.')+1);
            var pro_name = this.product_code;
            var original = pro_name+"_"+str+"."+filename;            
            const storageRef=firebase.storage().ref("product_thumbnails/"+original).put(this.imageData);
            storageRef.on(`state_changed`, 
            ()=>{this.uploadValue=100;
              storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                db.collection('product').add({
                  Product_Name:this.product_name,
                  Product_Model_No:this.product_code,
                  Product_Image: url,
                  Product_Can_Be_Sold:this.checkBox1,
                  Product_Can_Be_Purchased:this.checkBox2,
                  Product_Type:this.product_type_value,
                  Product_Category: this.product_cat_value,
                  Product_On_hand: this.on_hand,
                  Product_Description: this.productDescription,
                  Product_Sales_Price: this.price,
                  Product_Customer_Taxes: this.tax_value,
                  Product_Cost: this.cost,
                  Product_Barcode: this.Product_Barcode
                })
              });
            });
            this.suc_msg = 'Data added successfully';
            setTimeout(() => this.sucVisible = false, 3000);
        }  
        e.target.reset();     
      }
    }
  },
  created () {
      //store product data into array from firebase
      db.collection('product').orderBy('Product_Name').get().then(() => {
        this.watcher();        
      });   
    }
   }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>