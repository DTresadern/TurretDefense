"use strict";

/* /////////////////////////////////////////////////////////////////////////////
 Asset Manager
 TODO: if an asset cannot be found, load in a default error image so as not to break the game completely
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
  #assets = new Map();
  #assetsPending = 0;
  #assetsLoaded = 0;
  #assetsFailed = 0;
  #notifyLoadingProgress = null;
  #notifyLoadingFinished = null;
  constructor() {
  }

  buildAsset(assetPath, ext) {
    const assetType = ASSET_TYPES[ext];
    let newAsset = null;

    if(assetType == 'image') {
      newAsset = new Image();
      newAsset.src = assetPath;
      return newAsset;
    }
    console.log(`dont know how to build asset type ${assetType} for ${assetPath}`);
  }

  notify(notificationType, callback) {
    if(notificationType == 'loadingProgress') this.#notifyLoadingProgress = callback;
    if(notificationType == 'loadingFinished') this.#notifyLoadingFinished = callback;
  }

  progressUpdate(success, assetObj, assetRef, assetNum) {
    const totalAssets = this.#assets.size;
    if(success) {
      this.#assetsLoaded += 1;
    } else {
      this.#assetsFailed += 1;
    }
    const completedAssets = this.#assetsLoaded;
    const progressPercentage = (completedAssets/totalAssets)*100;
    this.#assetsPending -= 1;
    console.log(`asset #${assetNum+1} => '${assetRef}' ${success ? 'finished' : 'failed'} loading. status: ${completedAssets}/${totalAssets} (${(progressPercentage).toFixed(2)}%) ${this.#assetsFailed} failures, ${this.#assetsPending} pending.`);

    if(this.#notifyLoadingProgress) this.#notifyLoadingProgress?.call(this);
    if(this.#assetsPending <= 0) this.#notifyLoadingFinished?.call(this)
  }

  load(assetPaths = []) {
    console.log(`requested to load ${assetPaths.length} assets`);
    for(const assetPath of assetPaths) {
      if(PATH_MATCH_REGEX.test(assetPath)) {
        const [assetDir, assetFilename, assetFiletype] = assetPath.match(PATH_MATCH_REGEX).slice(1,4);
        const assetFolderName = DIR_NAME_REGEX.test(assetDir) ? assetDir.match(DIR_NAME_REGEX)[1].toLowerCase() : 'global';

        const assetName = assetFilename.replace(/\W/,'_').toLowerCase();
        const assetRef = `${assetFolderName}.${assetName}`;

        if(!this.#assets.has(assetRef)) {
          const assetObject = this.buildAsset(assetPath, assetFiletype);
          if( assetObject) {
            const currentAsset = this.#assets.size
            this.#assetsPending += 1;
            this.#assets.set(assetRef, assetObject);
            assetObject.onload = (e) => { this.progressUpdate(true, assetObject, assetRef, currentAsset); };
            assetObject.onerror = (e) => { this.progressUpdate(false, assetObject, assetRef, currentAsset); };
            console.log(`added "${assetPath}" as '${assetRef}' num assets = ${this.#assets.size}`);
            // console.log(`currentAsset is ${currentAsset}`);
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

  fetch(assetRef) {
    if(!this.#assets.has(assetRef)) {
      console.log(`invalid asset ${assetRef}`);
      return false;
    }
    console.log(`found asset ${assetRef}`);
    return this.#assets.get(assetRef);
  }

  init(options = {}) {
    this.#notifyLoadingProgress = options?.notify?.progress;
    this.#notifyLoadingFinished = options?.notify?.finished;
  }
}

////////////////////////////////////////////////////////////////////////////////

export default AssetManager;
