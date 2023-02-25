import animate from './animate'

const directives = {
  animate
}

export default {
  install(app) {
    Object.keys(directives).forEach((key) => {
      app.directive(key, directives[key])
    });
  }
}
