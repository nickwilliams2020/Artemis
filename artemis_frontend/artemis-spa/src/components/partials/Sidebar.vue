<template>
    <div>
        <vs-sidebar 
        :reduce="reduce" 
        reduce-not-rebound
        :parent="parent" 
        :hidden-background="true" 
        default-index="0"  
        color="success" 
        class="sidebarx" 
        spacer 
        v-model="show">

        <div class="header-sidebar" slot="header">
            <vs-avatar  size="70px" :src="user.avatar" />
        </div>
        <vs-sidebar-group open title="Artemis">
            <vs-sidebar-item index="1" icon="menu" @click="reduce=!reduce">
                Toggle Sidebar
            </vs-sidebar-item>
            <!-- <vs-divider icon="public" position="left">
                User
            </vs-divider> -->
            <!-- <vs-sidebar-item index="5" icon="verified_user">
            Configurations
            </vs-sidebar-item> 
            <vs-sidebar-group title="Actions">
                <vs-sidebar-item index="2.1" icon="store">
                    Store
                </vs-sidebar-item>
                <vs-sidebar-item index="2.2" icon="nature_people">
                    Nature
                </vs-sidebar-item>
                <vs-sidebar-item index="2.3" icon="style">
                    Style
                </vs-sidebar-item>
            </vs-sidebar-group> -->
            <div class="nav" v-for="(item, index) in sidebarItems.navigation" :key="index">
                <vs-sidebar-item :index="String(index)" :icon="item.icon" :to="item.link">  {{item.title}}   </vs-sidebar-item>
            </div>
        </vs-sidebar-group>


        <!-- <vs-divider icon="person" position="left">
            User
        </vs-divider>
        TODO: Create user profile page
        <vs-sidebar-item index="6" icon="account_box">
            Profile
        </vs-sidebar-item> -->

        <div class="footer-sidebar" slot="footer">
            <vs-sidebar-item icon="reply" color="danger" type="border" @click="logout">Sign Out</vs-sidebar-item>
            <!-- TODO: Create page for settings -->
        </div>

        </vs-sidebar>
    </div>
      
</template>

<script>

export default {
  name: 'Sidebar',
  props: {
      parent: {
          type: String,
          default: null
      },
      show: {
          type: Boolean,
          default: false
      },
      user: {
          type: Object,
          default: null
      }
  },
  data () {
    return {
        active:true,
        notExpand: false,
        reduce: true,
        sidebarItems: {
            navigation: [
                {   
                    title: "Home",
                    icon: "home",
                    link: "/"
                },
                {   
                    title: "Create Post",
                    icon: "add_comment",
                    link: "/posts"
                },
                {   
                    title: "Todo",
                    icon: "assignment",
                    link: "/todo"
                }
            ]
        }
        
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
      .then(() => this.$router.push('/login'))
    }
  }
    
}
</script>

<style lang="scss">

#main-section {
  float:right
}

.sidebar-section {
  overflow: hidden;
}

.header-sidebar{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  h4 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    button{
      margin-left: 10px;
    }
  }
}
.footer-sidebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  button {
      border: 0px solid rgba(0,0,0,0) !important;
      border-left: 1px solid rgba(0,0,0,.07) !important;
      border-radius: 0px !important;
  }
}
</style>
