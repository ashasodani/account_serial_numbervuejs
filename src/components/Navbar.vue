<template>
<!-- header start here -->
<div class="header_top">
<div class="header_top_left">
    <a href="/">
    <!-- header logo -->
    <img src="../assets/images/alian_logo.png">
    </a>
    <div class="header_app_menu">
        <!-- header main menu -->
       <vs-dropdown  vs-trigger-click>
        <a class="flex items-center" href.prevent>
            <img src="../assets/images/dashboard_icon.png">
        </a>
        
        <vs-dropdown-menu class="app_menu" >
            <div class="app_menu_border">
                <div class="app_menu_left">
                    <h4>History</h4>                    
                </div>
                <div class="app_menu_right">
                    <div class="main_search">
           
      
                    </div>
                    <div class="sorting_group">
                        <div class="main_menu_title">
                            <img src="../assets/images/salesicon.svg"> <h3>Sales</h3>
                        </div>                        
                        <div class="crm_menu">
                            <h4>CRM</h4>
                            <div class="inner_menu">
                            <h5>Sales</h5>
                            <ul>
                            <li v-for="(link, index) in links"  v-bind:key="index" v-show="link.parent === 'sales'">
                                <a :href="link.link">{{ link.title }}</a>
                            </li>                           
                            </ul>
                            </div>
                            <div class="inner_menu">
                            <h5>Reporting</h5>
                            <ul>
                            <li v-for="(link, index) in links"  v-bind:key="index" v-show="link.parent === 'sales_reporting'"><a  :href="link.link">{{ link.title }}</a></li>
                            </ul>
                            </div>
                        </div>
                    </div>
                    <div class="sorting_link">
                        <div id="string">
                            <ul>
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </vs-dropdown-menu>
        </vs-dropdown>
    </div>
    <!-- Navigation start here -->
    <div class="header_main_navigation">
        <div class="header_main_navigation_menu">
            <vs-dropdown vs-trigger-click>
                <a class="flex items-center" href.prevent>
                    Operations
                    <i class="material-icons">expand_more</i>
                </a>
                <vs-dropdown-menu class="support_menu">
                    <div class="support_menu_border">
                    <vs-dropdown-item v-for="(Operation, index) in Operations" :to="Operation.link" v-bind:key="index"  > {{ Operation.title }} </vs-dropdown-item>         
                    </div>
                </vs-dropdown-menu>
             </vs-dropdown>
        </div>
        <div class="header_main_navigation_menu">
            <vs-dropdown vs-trigger-click>
                <a class="flex items-center" href.prevent>
                    Master Data
                    <i class="material-icons">expand_more</i>
                </a>
                <vs-dropdown-menu class="support_menu">
                    <div class="support_menu_border">
                    <vs-dropdown-item v-for="(master, index) in Master_Data" :to="master.link" v-bind:key="index"  > {{ master.title }} </vs-dropdown-item>         
                    </div>
                </vs-dropdown-menu>
             </vs-dropdown>
        </div>
        <div class="header_main_navigation_menu">
            <vs-dropdown vs-trigger-click>
                <a class="flex items-center" href.prevent>
                    Reporting
                    <i class="material-icons">expand_more</i>
                </a>
                <vs-dropdown-menu class="support_menu">
                    <div class="support_menu_border">
                    <vs-dropdown-item v-for="(Report, index) in Reporting" :to="Report.link" v-bind:key="index"  > {{ Report.title }} </vs-dropdown-item>         
                    </div>
                </vs-dropdown-menu>
             </vs-dropdown>
        </div>
        <div class="header_main_navigation_menu">
            <vs-dropdown vs-trigger-click>
                <a class="flex items-center" href.prevent>
                    Configuration
                    <i class="material-icons">expand_more</i>
                </a>
                <vs-dropdown-menu class="support_menu">
                    <div class="support_menu_border">
                    <vs-dropdown-item v-for="(Configure, index) in Configuration" :to="Configure.link" v-bind:key="index"  > {{ Configure.title }} </vs-dropdown-item>         
                    </div>
                </vs-dropdown-menu>
             </vs-dropdown>
        </div>
    </div>
    <!-- Navigation end here -->
</div>
<div class="header_top_right">
    <div class="header_top_right_double_drop_down ">
        <span>Company</span>
        <select v-model="company" class="form-control" id="company">
            <option v-for="(company, index) in compaines" :value="company.value"
                    v-bind:key="index">{{ company.text }}
            </option>
        </select>
        <i class="material-icons">expand_more</i>
    </div>
    <div class="header_top_right_double_drop_down ">
        <span>Branch</span>
        <select v-model="branch" class="form-control" id="branch" >
            <option v-for="(branch, index) in branches" :value="branch.value"
                    v-bind:key="index">{{ branch.text }}
            </option>
        </select>
        <i class="material-icons">expand_more</i>
    </div>
    <div class="header_top_right_support_drop_down ">       
       <vs-dropdown vs-trigger-click>
        <a class="flex items-center" href.prevent>
            Support
            <i class="material-icons">expand_more</i>
        </a>
        <vs-dropdown-menu class="support_menu">
            <div class="support_menu_border">
            <vs-dropdown-item v-for="(support, index) in supports" :to="support.link" v-bind:key="index"  > {{ support.title }} </vs-dropdown-item>         
            </div>
        </vs-dropdown-menu>
        </vs-dropdown>
        
    </div>
    <div class="header_top_right_notification ">    
        
    </div>
    <div class="header_top_right_profile ">    
     
    </div>
</div>

</div>
<!-- header end here -->
</template>


<script>



export default {
  name: "headermain",
    components: {
            
    },
   data() {
        return {
            company: 0, 
            branch: 0, 
            // compaines data
            compaines: [
                { text: 'Exxon Mobil Corp', value: 0 },
                { text: 'Exxon Mobil Corp1', value: 2 },
                { text: 'Exxon Mobil Corp2', value: 3 },
            ],  
            // branches data
            branches: [
                { text: 'US — Houston campus', value: 0 },
                { text: 'In — Gujarat campus', value: 2 },
                { text: 'EUS — Houston campus', value: 3 },
            ], 
            // Operations data
            Operations: [
                { title: 'Operations1', link: '/' },
                { title: 'Operations2', link: '/' },
                { title: 'Operations3', link: '/' },
            ],
            // Master Data 
            Master_Data: [
                { title: 'Master Data', link: '/' },
                { title: 'Master Data', link: '/' },
                { title: 'Master Data', link: '/' },
            ],
            // Reporting data
            Reporting: [
                { title: 'Reporting', link: '/' },
                { title: 'Reporting', link: '/' },
                { title: 'Reporting', link: '/' },
            ],
            // Configuration data
            Configuration: [
                { title: 'Configuration', link: '/' },
                { title: 'Configuration', link: '/' },
                { title: 'Configuration', link: '/' },
            ],
            // supports data
            supports: [
                { title: 'Support', link: '/' },
                { title: 'Support1', link: '/' },
                { title: 'Support2', link: '/' },
            ],
            // links data
            links: [
                { title: 'My Pipeline', link: '/my_pipeline', parent: 'sales', key: "['alt', 'a']" },
                { title: 'My Quotations', link: '/my_quotation', parent: 'sales', key: "['alt', 'b']" },
                { title: 'Team Pipelines', link: '/team', parent: 'sales', key: "['alt', 'c']" },
                { title: 'Customers', link: '/customers', parent: 'sales', key: "['alt', 'd']" },
                { title: 'Pipeline', link: '/pipeline', parent: 'sales_reporting', key: "['alt', 'e']" },
                { title: 'Activities', link: '/activities', parent: 'sales_reporting', key: "['alt', 'f']" },                              
            ],            
        }
    },
    props: {
            classes: {
                type: String,
            },
            
    }
}

</script>