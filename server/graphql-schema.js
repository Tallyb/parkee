'use strict';

var _ = require('lodash');

const mapEnums = (model) =>{
  return _.map(model.definition.properties, (p, key) => {
    return p.enum ? `enum ${key} { ${p.enum.join('\n ')} }` : '';
  });
};

function generateEnums(models) {
  return _.map(models, m => {
    console.log (mapModel(m));
    return mapEnums(m);
  }).join ('\n');
};

const mapModel = (model) => {
  const typesMapping = {
    Number: 'Float',
    String: 'String',
    Boolean: 'Boolean',
    ObjectID: 'ID',
    Date: 'Date',
  };

  let props = _.map (model.definition.properties, (p, key)  =>{
    let req = p.required ? '!' : '';
    let type = p.enum ? key : typesMapping[p.type.name];
    return !p.deprecated ? `${key}: ${type}${req} ` : '';
  });

  return `type ${model.modelName} { ${props.join('\n ')} }`;
};


function generateTypeDefs(models) {
  return _.map(models, m => {
    console.log (mapModel(m));
    return mapModel(m);
  }).join ('\n');
};

function generateQueries(models) {
  return _.map(models, m => {
    return `${m.pluralModelName}: [${m.modelName}]`;
  }).join('\n');
};
module.exports = {
  generateEnums,
  generateQueries,
  generateTypeDefs,
};
