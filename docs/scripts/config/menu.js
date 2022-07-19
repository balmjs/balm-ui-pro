const MATERIAL_COMPONENTS_PRO = [
  {
    name: 'guide',
    children: [
      {
        name: 'intro'
      },
      {
        name: 'quickstart'
      }
    ]
  },
  '-',
  {
    name: 'components',
    children: [
      {
        name: 'form-view'
      }
      // {
      //   name: 'readonly-item'
      // },
      // {
      //   name: 'checkbox-group'
      // },
      // {
      //   name: 'radio-group'
      // },
      // {
      //   name: 'switch-box'
      // },
      // {
      //   name: 'multi-select'
      // }
    ]
  },
  '-',
  {
    name: 'plugins',
    children: [
      {
        name: 'transform'
      },
      {
        name: 'model'
      }
    ]
  },
  '-',
  'footer'
];

let menu = [];
for (let component of MATERIAL_COMPONENTS_PRO) {
  if (component === '-' || component === 'footer') {
    menu.push(component);
  } else {
    menu.push({
      // icon: component.icon,
      name: component.name,
      url: component.link ? component.name : false
    });

    if (component.children) {
      for (let subComponent of component.children) {
        const url = `${component.name}.${subComponent.name}`;

        menu.push({
          isSubmenu: true,
          // icon: subComponent.icon,
          name: subComponent.name,
          url
        });
      }
    }
  }
}

export default menu;
