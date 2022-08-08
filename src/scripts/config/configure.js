import merge from 'deepmerge';
import getType from '../utils/typeof';

const setPropsDefaultValue = ({ componentProps, propName, props }) => {
  let newValue = props[propName];

  switch (getType(newValue)) {
    case 'array':
      componentProps[propName].default = () => newValue;
      break;
    case 'object':
      const defaultValue = componentProps[propName].default;
      componentProps[propName].default = () => merge(defaultValue, newValue);
      break;
    default:
      componentProps[propName].default = newValue;
  }
};

const setPropsInMixins = ({ componentMixins, propName, props }) => {
  if (componentMixins.length) {
    let i = componentMixins.length;

    while (i--) {
      if (
        componentMixins[i].props &&
        componentMixins[i].props[propName] !== undefined
      ) {
        setPropsDefaultValue({
          componentProps: componentMixins[i].props,
          propName,
          props
        });
        break;
      }
    }
  }
};

const configure = (Component, props) => {
  for (const propName of Object.keys(props)) {
    if (Component.props) {
      if (Component.props[propName] === undefined) {
        // Overwrite props in mixins
        setPropsInMixins({
          componentMixins: Component.mixins,
          propName,
          props
        });
      } else {
        // Overwrite props in component
        setPropsDefaultValue({
          componentProps: Component.props,
          propName,
          props
        });
      }
    } else {
      // Overwrite props in mixins
      setPropsInMixins({
        componentMixins: Component.mixins,
        propName,
        props
      });
    }
  }
};

export default configure;
