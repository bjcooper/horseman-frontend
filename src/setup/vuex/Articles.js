import { RestVuex } from "@bit/wiznerd.horseman.rest-vuex";

export class HorsemanArticles extends RestVuex {
  /**
   * A flag to use for debugging purpose. Set this to false to disable.
   */
  static _debug = false;

  /**
   * The API endpoint to use.
   */
  static endpoint = "articles";

  /**
   * The label to use for storage events.
   */
  static storeName = "articles";
}