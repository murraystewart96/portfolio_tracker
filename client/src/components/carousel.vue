<template>
  <div class='carousel-view'>
    <transition-group
      class='carousel'
      tag="div">
      <div
        v-for="slide in slides"
        class='slide'
        :key="slide.id">
        <h4> {{ slide.title }} </h4>
      </div>
    </transition-group>
    <div class='carousel-controls'>
      <button class='carousel-controls__button' @click="previous">prev</button>
      <button class='carousel-controls__button' @click="next">next</button>
    </div>
  </div>
</template>

<script>



export default {
  data () {
      return {
        slides: [
          {
            title: 'Apple News',
            id: 1
          },
          {
            title: 'Amazon News',
            id: 2
          },
          {
            title: 'NVIDIA News',
            id: 3
          },
          {
            title: 'Activison News',
            id: 4
          },
          {
            title: 'Google News',
            id: 5
          }
        ]
      }
    },
    methods: {
    next () {
      const first = this.slides.shift()
      this.slides = this.slides.concat(first)
    },
    previous () {
      const last = this.slides.pop()
      this.slides = [last].concat(this.slides)
    }
}
}
</script>

<style lang="css" scoped>

.carousel-view {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.carousel {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  width: 24em;
  min-height: 3em;
}
.slide {
  flex: 0 0 5em;
  height: 0.75em;
  margin: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.1em ;
  border-radius: 60%;
  transition: transform 0.3s ease-in-out;
}
.slide:first-of-type {
  opacity: 0;
}
.slide:last-of-type {
  opacity: 0;
}



</style>
