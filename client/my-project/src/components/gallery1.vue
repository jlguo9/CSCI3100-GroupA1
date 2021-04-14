<template>
  <div class="container-fluid" id="gallery1">
    <h1>Gallery</h1>
    <h2>Canteens in Central Campus</h2>

    <ul class="components">
      <li>
        <router-link to="/gallery1a" tag="li"
          ><a>Basic Medical Sciences Building Snack Bar</a>
        </router-link>
      </li>

      <li>
        <router-link to="/gallery1b" tag="li"
          ><a>Benjamin Franklin Centre Coffee Corner</a>
        </router-link>
      </li>

      <li>
        <router-link to="/gallery1c" tag="li"
          ><a>Benjamin Franklin Centre Staff Canteen</a>
        </router-link>
      </li>

      <li>
        <router-link to="/gallery1d" tag="li"
          ><a>Benjamin Franklin Centre Student Canteen</a>
        </router-link>
      </li>

      <li>
        <router-link to="/gallery1e" tag="li"
          ><a>Benjamin Franklin Centre Vegetarian Food Shop</a>
        </router-link>
      </li>

      <li>
        <router-link to="/gallery1f" tag="li"
          ><a>Lee Shau Kee Building Snack Bar</a>
        </router-link>
      </li>
      <li>
        <router-link to="/gallery1g" tag="li"
          ><a>Women Cooperative Store</a>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: "",
      index: null,
      imageList: []
    };
  }
};
</script>

<style>
#gallery1 ul li a {
  color: blue;
}
/* 未被访问的链接 */
#gallery1 ul li a:link {
  color: blue;
}
/* 已被访问的链接 */
#gallery1 ul li a:visited {
  color: purple;
}

/* 将鼠标悬停在链接上 */
#gallery1 ul li a:hover {
  color: red;
}

/* 被选择的链接 */
#gallery1 ul li a:active {
  color: red;
}
</style>
