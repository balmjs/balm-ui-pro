class Transform {
  in(data) {}

  out(formData) {}
}

function install(Vue, options = {}) {
  Vue.prototype.$transform = transform;
}

const $transform = {
  install
};

export default $transform;
