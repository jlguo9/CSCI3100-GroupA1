<template>
  <nav id="sidebar">
    <div class="sidebar-header">
      <h3 id="title">Foodification</h3>
      <strong>F</strong>
    </div>

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
        </ul>

        <router-link to="/forum" tag="li"
          ><a><i class="fas fa-comments"></i> Forum</a>
        </router-link>

        <router-link to="/faq" tag="li"
          ><a><i class="fas fa-question"></i> FAQ</a>
        </router-link>

        <router-link to="/contact" tag="li"
          ><a><i class="fas fa-paper-plane"></i> Contact</a>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {}
</script>

<style></style>
