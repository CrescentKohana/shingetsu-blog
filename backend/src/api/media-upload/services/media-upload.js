'use strict';

/**
 * media-upload service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::media-upload.media-upload');
