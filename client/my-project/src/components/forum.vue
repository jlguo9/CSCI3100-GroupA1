<template>
  <div id="forum">
    <div class="container mt-5">
      <div class="d-flex justify-content-center row">
        <div class="col-md-8">
          <div class="d-flex flex-column comment-section" id="myGroup">
            <div class="bg-white p-2">
              <div class="d-flex flex-row user-info">
                <img
                  class="rounded-circle"
                  src="https://i.imgur.com/RpzrMR2.jpg"
                  width="50px"
                  height="50px"
                />
                <div class="d-flex flex-column justify-content-start ml-2">
                  <span class="d-block font-weight-bold name"
                    >Marry Andrews</span
                  ><span class="date text-black-50">Jan 2020</span>
                </div>
              </div>
              <div class="mt-2">
                <p class="comment-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
            <!-- this is the like icon  -->
            <div class="bg-white p-2">
              <div class="d-flex flex-row fs-12">
                <div class="like p-2 cursor">
                  <i class="far fa-thumbs-up"></i><span class="ml-1">Like</span>
                </div>
                     <!-- this is the comment icon  -->
                <div
                  class="like p-2 cursor "
                  data-toggle="collapse"
                  aria-expanded="true"
                  aria-controls="collapse-1"
                  href="#collapse-1"
                >
                  <i class="far fa-comment-dots"></i
                  ><span class="ml-1">Comment</span>
                </div>
                 <!-- this is the share icon  -->
                <div
                  class="like p-2 cursor action-collapse"
                  data-toggle="collapse"
                  aria-expanded="true"
                  aria-controls="collapse-2"
                  href="#collapse-2"
                >
                  <i class="fa fa-share"></i><span class="ml-1">Share</span>
                </div>
              </div>
            </div>
            <!-- this is the comment section -->
            <div
              id="collapse-1"
              class="bg-light p-2 collapse"
              data-parent="#myGroup"
            >
              <div class="d-flex flex-row align-items-start">
                <img
                  class="rounded-circle"
                  src="https://i.imgur.com/RpzrMR2.jpg"
                  width="40"
                /><textarea
                  class="form-control ml-1 shadow-none textarea"
                ></textarea>
              </div>
              <div class="mt-2 text-right">
                <button
                  class="btn btn-primary btn-sm shadow-none"
                  type="button"
                >
                  Post comment</button
                ><button
                  class="btn btn-outline-primary btn-sm ml-1 shadow-none"
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </div>
             <!-- this is the transfer section -->
            <div
              id="collapse-2"
              class="bg-light p-2 collapse"
              data-parent="#myGroup"
            >
              <div class="d-flex flex-row align-items-start">
                <i class="fab fa-facebook border p-3 rounded mr-1"></i
                ><i class="fab fa-twitter border p-3 rounded mr-1"></i
                ><i class="fab fa-linkedin border p-3 rounded mr-1"></i
                ><i class="fab fa-instagram border p-3 rounded mr-1"></i
                ><i class="fab fa-dribbble border p-3 rounded mr-1"></i>
                <i class="fab fa-pinterest border p-3 rounded mr-1"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {};
</script>

<style></style>
