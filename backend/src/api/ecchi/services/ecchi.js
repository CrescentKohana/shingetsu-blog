'use strict';

/**
 * ecchi service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::ecchi.ecchi');
