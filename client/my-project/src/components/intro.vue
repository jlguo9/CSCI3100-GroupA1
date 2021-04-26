// MODULE NAME: INTRO
// PROGRAMMER: SICONG YAO 1155107856
// VERSION: 2.0 (APRIL 25, 2021)
//
// MODULE INVOCATION:
//   <SIDEBAR> </SIDEBAR>
//
// PURPOSE: SEPERATE THE SIDEBAR FROM OTHER MODULES, USE IT MORE EASILY
//          SHOWS THE PHOTO CAROUSEL AND THE TEXT FOR THE HOME PAGE  
//
// STRUCTURE: 
//   (H1) INTRO-HEADER
//   (OL, DIV*N, A) LIST OF PHOTO CAROUSEL, INCLUDING PHOTO AND  BUTTON TO GO TO NEXT OR LAST PICTURE
//   (P*N) MAIN TEXT

<template>
  <div id="intro" class="container-fluid">
    <!-- THIS IS THE INTRO-HEADER -->
    <h1>Welcome to Foodification!</h1>
    <!-- THIS IS THE PHOTO CAROUSEL -->
    <div
      id="carouselExampleIndicators"
      class="carousel slide "
      data-ride="carousel"
    >
      <ol class="carousel-indicators">
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to="0"
          class="active"
        ></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active img-responsive">
          <img
            class="d-block w-100"
            src="../assets/images/rails.jpg"
            alt="First slide"
          />
        </div>
        <div class="carousel-item">
          <img
            class="d-block w-100"
            src="../assets/images/park.jpg"
            alt="Second slide"
          />
        </div>
        <div class="carousel-item">
          <img
            class="d-block w-100"
            src="../assets/images/traffic.jpg"
            alt="Third slide"
          />
        </div>
        <div class="carousel-item">
          <img
            class="d-block w-100"
            src="../assets/images/coast.jpg"
            alt="Fourth slide"
          />
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
    <!-- THIS IS THE MAIN TEXT -->
    <h2>Overview</h2>

    <p>
      Canteens on the campus of The Chinese University of Hong Kong (CUHK) are
      popular dining choices for students, faculties as well as staff from CUHK.
      Nowadays, it is very inconvenient that visitors of canteens cannot get
      aware of the current menu of a certain canteen unless visiting there by
      themselves. Our project, “Foodification”, is an integrated platform
      providing daily menus of every canteen on campus, as well as providing
      spaces for visitors to share their comments on each dish. Besides, the
      shopping cart function and accounting function are also integrated into
      this platform for users.
    </p>

    <div class="line"></div>

    <h2>Background</h2>
    <p>
      Because of the tight schedule for students, faculties as well as staff,
      CUHK canteens are the most popular choice for them to have meals on the
      campus. Up to now, CUHK has 38 canteens while almost every CUHK canteen
      offers more than twenty different dishes per day with its menu changing
      over time. Different dishes, to be more specific, with different flavors
      as well as different prices, will make diners have a hard time making
      their decisions for meals. Even after being informed of what dish is
      prepared for that day, diners may still arrive at the canteen with the
      desired dish sold out, which may easily bring them a waste of energy and
      harmful frustration. However, although nowadays there are platforms for
      course evaluation, for example RegCourse, as well as for sharing secrets,
      for example CU Secret, targeted at CUHK students, we cannot find such an
      integrated platform for dining at CUHK canteens that can combine menu
      sharing and dish review. Therefore, we aim to create an
      information-sharing platform that can share dining information through the
      network. On this website, managers of each canteen can update the canteens
      updated menu and status. Meanwhile, diners can share their opinion on
      different dishes to interest or disinterest other diners. In this way,
      diners can be informed of what is on the menu remotely and make choices
      for their meals easier. And we hope that this platform can bring higher
      efficiency to diners and improve their dining quality.
    </p>

    <div class="line"></div>

    <h2>Team Member (in Alphabetical Order)</h2>
    <h5>
<ul style="line-height:150%">
    <li >GUO Jialiang 1155124399</li>
    <li>HU Fangxin 1155107872</li>
    <li>LI Keqi 1155107825</li>
    <li>LI Zechen 1155124542</li>
    <li>YAO Sicong 1155107856</li>
    </ul>
    </h5>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
