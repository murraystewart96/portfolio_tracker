<!-- <template lang="html">
  <div class="">


  <carousel :autoplay="true">
  <slide>
    Slide 1 Content
  </slide>
  <slide>
    Slide 2 Content
  </slide>
  </carousel>
  </div>
</template>

<script>

  import { Carousel, Slide } from 'vue-carousel';

export default {
name: 'carousel',
  components: {
    Carousel,
    Slide
  },
  methods: {
    slider(){
    const buildSlideMarkup = (count) => {
	let slideMarkup = '';
  for (var i = 1; i <= count; i++) {
  	slideMarkup += '<slide><span class="label">' + i + '</span></slide>'
  }
  return slideMarkup;
};
  }
};
</script>

<style lang="css" scoped>
</style> -->
