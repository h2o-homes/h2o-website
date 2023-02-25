export default {
  mounted: function (el, binding) {
    binding.addClass = () => {
      const {top} = el.getBoundingClientRect()
      const h = document.documentElement.clientHeight || document.body.clientHeight
      if (top < h) {
        if (el.className.indexOf(binding.value) == -1) {
          el.className = binding.value + ' ' + el.className
        }
        if (binding.addClass) {
          window.removeEventListener('scroll', binding.addClass)
        }
      }
    }
    window.addEventListener('scroll', binding.addClass, true)
    binding.addClass()
  },
  unmounted: function (el, binding) {
    if (binding.addClass) {
      window.removeEventListener('scroll', binding.addClass)
    }
  }
}