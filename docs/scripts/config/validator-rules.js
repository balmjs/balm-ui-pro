import { helpers } from 'balm-ui';

export default {
  required: {
    validate(value) {
      return helpers.isEmpty(value);
    },
    message: '%s is required'
  }
};
