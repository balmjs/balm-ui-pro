const fs = require('fs');
const config = require('./config');
const tagsData = require('../vetur/tags.json');

async function loadVeturHelperData() {
  let tags = {};
  let attributes = {};

  const currentTagsData = tagsData;
  for await (const tag of Object.keys(currentTagsData)) {
    tags[tag] = currentTagsData[tag];

    try {
      const file = `./config/vetur/attributes/${tag}.json`;
      const data = await fs.readFileSync(file);
      let componentAttributesData = JSON.parse(data);

      let componentAttributes = {};
      for await (const prop of Object.keys(componentAttributesData)) {
        componentAttributes[`${tag}/${prop}`] = componentAttributesData[prop];
      }
      attributes = Object.assign(attributes, componentAttributes);
    } catch (e) {
      console.log(e);
    }
  }

  return {
    tags,
    attributes
  };
}

async function saveVeturHelperData(tags, attributes) {
  try {
    await fs.mkdirSync('vetur');
  } catch (e) {
    // console.log('Cannot create folder ', e);
  }

  if (Object.keys(tags).length) {
    try {
      const tagsData = JSON.stringify(tags, null, 2);
      await fs.writeFileSync(`${config.output.vetur}/tags.json`, tagsData);
      console.log('`tags.json` is ready');

      if (Object.keys(attributes).length) {
        try {
          const attributesData = JSON.stringify(attributes, null, 2);
          await fs.writeFileSync(
            `${config.output.vetur}/attributes.json`,
            attributesData
          );
          console.log('`attributes.json` is ready');
        } catch (e) {
          console.error(e);
        }
      } else {
        console.log('Invalid attributes');
      }
    } catch (e) {
      console.error(e);
    }
  } else {
    console.log('Invalid tags');
  }
}

async function createVeturHelper() {
  const { tags, attributes } = await loadVeturHelperData();

  saveVeturHelperData(tags, attributes);
}

module.exports = createVeturHelper;
