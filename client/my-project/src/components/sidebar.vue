// MODULE NAME: SIDEBAR
// PROGRAMMER: SICONG YAO 1155107856
// VERSION: 2.0 (APRIL 25, 2021)
//
// MODULE INVOCATION:
//   <SIDEBAR> </SIDEBAR>
//
// PURPOSE: SEPERATE THE SIDEBAR FROM OTHER MODULES, USE IT MORE EASILY
//
// STRUCTURE: 
//   DIV SIDEBAR-HEADER
//   UL LIST COMPONENTS (LI + ROUTER LINK)

<template>
  <nav id="sidebar">
    <!-- THIS DIV IS THE SIDEBAR-HEADER -->
    <div class="sidebar-header">
      <h3 id="title">Foodification</h3>
      <strong>F</strong>
    </div>
    <!-- THIS UL LISTS ALL COMPONENTS WITH ROUTER -->
    <ul class="list-unstyled components">
      <li>
        <router-link to="/" tag="li"
          ><a><i class="fas fa-home"></i> Home</a>
        </router-link>

        <router-link to="/canteenMenu" tag="li"
          ><a><i class="fas fa-compass"></i> Menu</a>
        </router-link>

        <router-link to="/cart" tag="li"
          ><a><i class="fas fa-cart-plus"></i> Cart</a>
        </router-link>

        <router-link to="/record" tag="li"
          ><a><i class="fas fa-book-open"></i> Record</a>
        </router-link>

        <a
          href="#gallerySubmenu"
          data-toggle="collapse"
          aria-expanded="false"
          class="dropdown-toggle"
        >
          <i class="fas fa-image"></i>
          Gallery
        </a>
        <ul class="collapse list-unstyled" id="gallerySubmenu">
          <router-link to="/gallery1" tag="li"
            ><a>Central Campus</a>
          </router-link>
          <router-link to="/gallery2" tag="li"
            ><a>Chung Chi College</a>
          </router-link>
          <router-link to="/gallery3" tag="li"
            ><a>S.H. HO College</a>
          </router-link>
          <router-link to="/gallery4" tag="li"
            ><a>Morningside College</a>
          </router-link>
          <router-link to="/gallery5" tag="li"
            ><a>United College</a>
          </router-link>
          <router-link to="/gallery6" tag="li"
            ><a>New Asia College</a>
          </router-link>
          <router-link to="/gallery7" tag="li"
            ><a>Lee Woo Sing College</a>
          </router-link>
          <router-link to="/gallery8" tag="li"
            ><a>Wu Yee Sun College</a>
          </router-link>
          <router-link to="/gallery9" tag="li"
            ><a>Shaw College</a>
          </router-link>
          <router-link to="/gallery10" tag="li"
            ><a>CW Chu College</a>
          </router-link>
          <router-link to="/gallery11" tag="li"><a>Others</a> </router-link>
          <router-link to="/gallery12" tag="li"><a>Upload</a> </router-link>
        </ul>

        <router-link to="/forum" tag="li"
          ><a><i class="fas fa-comments"></i> Forum</a>
        </router-link>
      </li>

      <li>
        <a
          href="https://www.cuhk.edu.hk/english/campus/accommodation.html#canteen.info"
          ><i class="fas fa-info-circle"></i> Info</a
        >
      </li>
      <li>
        <a href="https://github.com/jlguo9/CSCI3100-GroupA1/blob/main/README.md"
          ><i class="fas fa-question-circle"></i> FAQ</a
        >
      </li>
      <li>
        <a
          href="mailto:1155107856@link.cuhk.edu.hk?subject = Feedback&body = Message"
          ><i class="fas fa-paper-plane"></i> Contact</a
        >
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style></style>
