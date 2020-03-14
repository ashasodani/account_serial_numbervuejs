<template>
  <!-- Serial number Detail Page Start -->
  <div class="main_content">
    <div class="product_top_bar">
      <div class="product_top_bar_left"></div>
      <div class="product_top_bar_right">
        <vs-button class="blue_btn" @click="edit = !edit">Edit</vs-button>&nbsp;
        <vs-button color="danger">Delete</vs-button>
      </div>
    </div>
    <div class="grey_section">
      <div class="manufacture_detail_left">
        <div class="manufacture_detail_top">
          <div class="row">
            <div class="col_half">
              <label>Product Name</label>
              <span v-if="serial_detail_show[0].product_name_sh"
                >:-{{ serial_detail_show[0].product_name_sh }}</span
              >
              <span v-else>-</span>
            </div>
            <div class="col_half">
              <label>Product Code</label>
              <span v-if="serial_detail_show[0].Product_model_code"
                >:-{{ serial_detail_show[0].Product_model_code }}</span
              >
              <span v-else>-</span>
            </div>
          </div>
          <div class="row">
            <div class="col_half">
              <label>Serial Numbers Start From</label>
              <span v-if="serial_detail_show[0].Product_serail_start"
                >:-{{ serial_detail_show[0].Product_serail_start }}</span
              >
              <span v-else>-</span>
            </div>
            <div class="col_half">
              <label>Product Variant</label>
              <span v-if="serial_detail_show[0].Product_variant"
                >:-{{ serial_detail_show[0].Product_variant }}</span
              >
              <span v-else>-</span>
            </div>
          </div>
          <div class="row">
            <div class="col_half">
              <label>Description</label>
              <span v-if="serial_detail_show[0].Product_description"
                >:-{{ serial_detail_show[0].Product_description }}</span
              >
              <span v-else>-</span>
            </div>
          </div>
        </div>
        <div class="manufacture_detail_bottom">
          <div class="manufacture_create_title">
            <h4>Generate Serial Numbers</h4>
          </div>
          <div class="row">
            <div class="manufacture_create_content">
              <label>Quantity</label>
              <vs-input
                class="inputx"
                placeholder="Enter Text"
                v-model="generate_quantity_e"
                v-validate="{ required: true, numeric }"
                name="quantity_eror"
                :class="{
                  'is-invalid':
                    vee_validation && errors.has('quantquantity_erority_error')
                }"
              />
              <div
                v-if="vee_validation && errors.has('quantity_eror')"
                class="invalid-feedback"
              >
                {{ errors.first("quantity_eror") }}
              </div>
            </div>
            <div class="col_half">
              <button type="button" class="blue_btn" @click="addQuantity">
                Generate
              </button>
              <vs-button class="white_btn" @click="resetquantity"
                >Cancel</vs-button
              >
            </div>
          </div>
        </div>
        <div class="manufacture_detail_bottom">
          <div class="manufacture_create_title">
            <h4>Serial Numbers</h4>
          </div>
          <div class="manufacture_create_content">
            <vs-table>
              <template slot="thead">
                <vs-th>
                  Created on
                  <!-- Product Serial Number Created on -->
                </vs-th>
                <vs-th>
                  Created By
                  <!-- Product Serial Number Created By -->
                </vs-th>
                <vs-th>
                  Quantity
                  <!-- Product Quantity to generate serial number -->
                </vs-th>
                <vs-th>
                  No. of Serial No.
                  <!-- Product Quantity to generate serial number -->
                </vs-th>
                <vs-th>
                  Serial Numbers
                  <!-- Product Quantity to generate serial number -->
                </vs-th>
                <vs-th>
                  Action
                  <!-- Product Quantity to generate serial number -->
                </vs-th>
              </template>
              <template>
                <vs-tr
                  v-for="d_summary in quantity_summary_d"
                  v-bind:key="d_summary.id"
                >
                  <vs-td>{{ d_summary.careated_on }}</vs-td>
                  <vs-td>-</vs-td>
                  <vs-td>{{ d_summary.generate_quantity }}UNITS</vs-td>
                  <vs-td>{{ d_summary.generate_quantity }}</vs-td>
                  <vs-td
                    v-if="d_summary.serial_no_start != d_summary.serial_no_end"
                    >{{ d_summary.serial_no_start }} to
                    {{ d_summary.serial_no_end }}</vs-td
                  >
                  <vs-td v-else>{{ d_summary.serial_no_start }}</vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </div>
        <div class="manufacture_detail_right">
          <div class="product_detail_bottom_title">
            <h5>Log Note</h5>
          </div>
          <div class="product_detail_bottom_content">
            <div
              class="product_detail_bottom_row"
              v-for="(note, index) in notes"
              v-bind:key="index"
            >
              <div class="product_detail_bottom_img">
                <img :src="note.img" />
              </div>
              <div class="product_detail_bottom_info">
                <h4>{{ note.name }}</h4>
                <span>{{ note.date }}</span>
                <p>{{ note.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      </vs-sidebar>
      <!-- Edit Sidebar End -->
    </div>
  </div>
</template>
<script>
import db from "./firebaseInit";
import moment from "moment";
import { Validator } from "vee-validate";
const validate_msg = {
  custom: {
    quantity_eror: {
      required: "This  Quantity  is required",
      numeric: "Only Numeric value allow"
    }
  }
};

Validator.localize("en", validate_msg);

export default {
  data() {
    return {
      edit: false,
      serial_detail_show: [],
      quantity_summary_d: [],
      generate_quantity_e: null,
      start_range: null,
      end_range: null,
      vee_validation: false,
      numeric: "",
      notes: [
        {
          img:
            "https://firebasestorage.googleapis.com/v0/b/accountingerp.appspot.com/o/test%2Fprofile1.png?alt=media&token=691cbad5-4bbe-48b8-88e3-3bec1c01a7a2",
          name: "Jade Powers",
          date: "Fri, 10 Jan 2020  12:30PM",
          text: "Bills of Materials Created"
        }
      ] // Log Note
    };
  },
  methods: {
    getRealData() {
      /*show dataon detail page without page load start*/
      const product_name_c = this.$route.params.product_ids;
      db.collection("p_quantity_summary")
        .orderBy("created_on", "desc")
        .where("product_name", "==", product_name_c)
        .onSnapshot(querySnapshot => {
          this.quantity_summary_d = [];
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
            this.quantity_summary_d.push(data);
          });
        });
      /*show dataon detail page without page load end*/
    },
    resetquantity() {
      /*Reset quantity field*/
      this.generate_quantity_e = "";
      this.vee_validation = false;
    },
    addQuantity() {
      var th = this;
      var flag = localStorage.setItem("flag", 0);
      var generate_quan = this.generate_quantity_e;
      var custome_ID = this.serial_detail_show[0].id;
      var serial_number_start = this.serial_detail_show[0].Product_serail_start;
      var subcollection = this.serial_detail_show[0].Latest_collection;
      var remain_quantity = generate_quan;
      var product_prefix_g = this.serial_detail_show[0].Product_prefix;
      var totalquantity_count = this.serial_detail_show[0].Total_quantity;
      var end_quantity_range = null;
      var start_quantity_range = null;
      var count = 0;
      var i = 0;
      this.vee_validation = true;
      this.$validator.validate().then(valid => {
        if (valid) {
          /*if validation true start*/
          /*Get last id start*/
          db.collection("serial_no")
            .doc(custome_ID)
            .collection(subcollection)
            .onSnapshot(function(snapshot) {
              var lastid = "0";
              var change_type = "";
              snapshot.docChanges().forEach(function(change) {
                lastid = change.doc.id;
                change_type = change.type;
                count++;
              });
              console.log(count);
              if (lastid != "0") {
                lastid = lastid.replace(/\D/g, "");
                var lastID = parseInt(lastid) + 1;
                lastID = lastID.toString();
              } else {
                lastID = custome_ID;
              }
              /*Get last id end*/

              flag = localStorage.getItem("flag");
              var collec_limit = 5;

              /*Continue insert in to existing product start*/
              if (change_type == "added" && lastID != null) {
                if (flag == 0) {
                  localStorage.setItem("flag", 1);
                  start_quantity_range = lastID;

                  /*Get size of latest collection*/
                  db.collection("serial_no")
                    .doc(custome_ID)
                    .collection(subcollection)
                    .get()
                    .then(function(querySnapshot) {
                      var c_collec_size = querySnapshot.size;

                      /*Loop start*/

                      for (i = c_collec_size; ; i++) {
                        /*when collection not full start*/
                        if (remain_quantity == 0) {
                          break;
                        } else if (c_collec_size < collec_limit) {
                          lastID = product_prefix_g + lastID.toString();
                          /*Insert in collection start*/
                          if (remain_quantity != 0) {
                            db.collection("serial_no")
                              .doc(custome_ID)
                              .collection(subcollection)
                              .doc(lastID)
                              .set({
                                created_by: "asha",
                                created_on: new Date()
                              })
                              .then(function() {
                                th.getRealData();
                              });

                            db.collection("serial_no")
                              .doc(custome_ID)
                              .update({
                                latest_collection: subcollection,
                                totalquantity:
                                  parseInt(totalquantity_count) +
                                  parseInt(generate_quan),
                                updated_on: new Date()
                              });

                            lastID = lastID.replace(/\D/g, "");
                            lastID++;
                            count++;
                            c_collec_size++;
                            remain_quantity--;
                          }
                        } else {
                          /*when collection not full end*/
                          /*After collection  full and insert in to new collection start*/
                          subcollection = th.nextChar(subcollection);
                          c_collec_size = 0;
                          for (i = c_collec_size; i < remain_quantity; i++) {
                            if (
                              c_collec_size < collec_limit &&
                              remain_quantity != 0
                            ) {
                              lastID = product_prefix_g + lastID.toString();

                              db.collection("serial_no")
                                .doc(custome_ID)
                                .collection(subcollection)
                                .doc(lastID)
                                .set({
                                  created_by: "asha",
                                  created_on: new Date()
                                })
                                .then(function() {
                                  th.getRealData();
                                });
                              db.collection("serial_no")
                                .doc(custome_ID)
                                .collection(subcollection)
                                .doc(lastID)
                                .set({
                                  created_by: "asha",
                                  created_on: new Date()
                                })
                                .then(function() {});

                              db.collection("serial_no")
                                .doc(custome_ID)
                                .update({
                                  latest_collection: subcollection,
                                  totalquantity:
                                    parseInt(totalquantity_count) +
                                    parseInt(generate_quan),
                                  updated_on: new Date()
                                });
                              lastID = lastID.replace(/\D/g, "");
                              lastID++;

                              count++;
                              c_collec_size++;
                              remain_quantity--;
                            } else {
                              break;
                            }
                          }
                        }
                        /*After collection  full and insert in to new collection end*/
                      }
                      /*Loop end*/
                      /*Insert in collection end*/
                    });
                }
              } else if (flag == 0) {
                /*Add from starting start*/
                localStorage.setItem("flag", 1);
                remain_quantity = generate_quan;
                var c_collec_size = 0;
                for (i = c_collec_size; i <= generate_quan; i++) {
                  if (c_collec_size < collec_limit) {
                    serial_number_start =product_prefix_g + serial_number_start.toString();
                    if (remain_quantity != 0) {
                      db.collection("serial_no")
                        .doc(custome_ID)
                        .collection(subcollection)
                        .doc(serial_number_start)
                        .set({})
                        .then(function() {
                          th.getRealData();
                        });

                      db.collection("serial_no")
                        .doc(custome_ID)
                        .update({
                          latest_collection: subcollection,
                          totalquantity:
                            parseInt(totalquantity_count) +
                            parseInt(generate_quan),
                          updated_on: new Date()
                        });

                      serial_number_start = serial_number_start.substring(5);
                      serial_number_start++;
                      count++;
                      c_collec_size++;
                      remain_quantity--;
                    }
                  } else {
                    subcollection = th.nextChar(subcollection);
                    c_collec_size = 0;
                    for (i = c_collec_size; i < remain_quantity; i++) {
                       if (remain_quantity == 0) {
                          break;
                        }
                      else if (c_collec_size < collec_limit  ) {
                        serial_number_start =
                          product_prefix_g + serial_number_start.toString();
                        if (remain_quantity != 0) {
                          db.collection("serial_no")
                            .doc(custome_ID)
                            .collection(subcollection)
                            .doc(serial_number_start)
                            .set({})
                            .then(function() {
                              th.getRealData();
                            });

                          db.collection("serial_no")
                            .doc(custome_ID)
                            .update({
                              latest_collection: subcollection,
                              totalquantity:
                                parseInt(totalquantity_count) +
                                parseInt(generate_quan),
                              updated_on: new Date()
                            });

                          serial_number_start = serial_number_start.substring(
                            5
                          );
                          serial_number_start++;
                          c_collec_size++;
                          remain_quantity--;
                        }
                      }
                    }
                  }
                }

                /*Add from starting end*/
                console.log("idsdsn");
                start_quantity_range = serial_number_start.replace(/\D/g, "");
                lastID = lastID.replace(/\D/g, "");
              end_quantity_range = parseInt(lastID) - 1;
              db.collection("p_quantity_summary").add({
                created_on: new Date(),
                product_name: custome_ID,
                generate_quantity: generate_quan,
                serail_no_start: product_prefix_g + end_quantity_range,
                serial_no_end: product_prefix_g + start_quantity_range
              });
              }
              /*Insert in product quantity summary start*/
              console.log(lastID);
              

              /*Insert in product quantity summary end*/
              /*Continue insert in to existing product end*/
            });
        }
        /*if validation true end*/
      });
      th.resetquantity();
    },
    nextChar(c) {
      /*Increment next charcher */
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
    }
  },
  created() {
    const product_name_f = this.$route.params.product_ids;
    const datafetch = db.collection("serial_no").doc(product_name_f);

    datafetch.get().then(() => {
      db.collection("serial_no").onSnapshot(querySnapshot => {
        this.serial_detail_show = [];
        querySnapshot.forEach(doc => {
          const data_real = {
            id: doc.id,
            product_name_sh: doc.id,
            Product_model_code: doc.data().product_model_code,
            Product_serail_start: doc.data().serial_no_start,
            Product_description: doc.data().product_desc,
            Product_variant: doc.data().product_variant,
            Latest_collection: doc.data().latest_collection,
            Product_prefix: doc.data().product_prefix,
            Total_quantity: doc.data().totalquantity
          };
          if (this.$route.params.product_ids == doc.id) {
            this.serial_detail_show.push(data_real);
          }
        });
      });
    });

    /*Show product summary start*/
    let product_name_d = this.$route.params.product_ids;
    db.collection("p_quantity_summary")
      .orderBy("created_on", "desc")
      .where("product_name", "==", product_name_d)
      .onSnapshot(querySnapshot => {
        this.quantity_summary_d = [];
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
            product_name_ds: doc.data().product_name
          };
          this.quantity_summary_d.push(data);
        });
      });
    /*Show product summary end*/
  }
};
</script>
