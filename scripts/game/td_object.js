"use strict";

/* /////////////////////////////////////////////////////////////////////////////
 Objects
 register classes with classFactory if they are to be instanced
///////////////////////////////////////////////////////////////////////////// */

// dependencies
import {classFactory, BaseClass} from '../engine/base_class.js';

////////////////////////////////////////////////////////////////////////////////

export class TDObject extends BaseClass {
  doRender = true;
  doProcess = true;
  doSelfDraw = true;
}

export const testObject = classFactory.register(
  class testObject extends TDObject {
  }
);

////////////////////////////////////////////////////////////////////////////////