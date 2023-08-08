"use strict";

/* /////////////////////////////////////////////////////////////////////////////
 Asset Manager
///////////////////////////////////////////////////////////////////////////// */

// dependencies

////////////////////////////////////////////////////////////////////////////////

const PATH_MATCH_REGEX = /^(.*[\\\/]?.*[\\\/])?(.*)(\.\w+)$/;
const DIR_NAME_REGEX = /(\w+)[\\\/]$/;

const ASSET_TYPES = {
  '.png': 'image',
  '.jpg': 'image',
  '.jpeg': 'image'
};

class AssetManager {
  #assets = new Set();
  #assetsPending = 0;
  #assetsPendingLoaded = 0;
  #assetsPendingFailed = 0;
  #notifyLoad = null;
  constructor() {
    console.log(`asset manager instanced`);
  }

  buildAsset(assetPath, ext) {
    const assetType = ASSET_TYPES[ext];
    let newAsset = null;

    if(assetType == 'image') {
      console.log(`building ${assetType} asset for ${assetPath}`);
      newAsset = new Image();
      newAsset.src = assetPath;
      return newAsset;
    }
    console.log(`dont know how to build asset type ${assetType} for ${assetPath}`);
  }

  load(assetPaths = []) {
    console.log(`requested to load ${assetPaths.length} assets. `, assetPaths);
    for(const assetPath of assetPaths) {
      if(PATH_MATCH_REGEX.test(assetPath)) {
        const [assetDir, assetFilename, assetFiletype] = assetPath.match(PATH_MATCH_REGEX).slice(1,4);
        const assetFolderName = DIR_NAME_REGEX.test(assetDir) ? assetDir.match(DIR_NAME_REGEX)[1].toLowerCase() : 'global';

        const assetName = assetFilename.replace(/\W/,'_').toLowerCase();
        const assetRef = `${assetFolderName}.${assetName}`;

        if(!this.#assets.has(assetRef)) {
          const assetObject = this.buildAsset(assetPath, assetFiletype);
          if( assetObject) {
            console.log(`added "${assetPath}" as: ${assetRef}`);
          } else {
            console.log(`failed to build asset object for "${assetPath}"`);
          }
        } else {
          console.log(`skipping "${assetPath}" (already loaded)`);
        }

      } else {
        console.log(`skipping "${assetPath}" (invalid)`);
      }
    }
  }

  fetch() {

  }

  init(options) {

  }
}

////////////////////////////////////////////////////////////////////////////////

export default AssetManager;
